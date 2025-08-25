---
author: Hassan Anees
title: Tap into Exchange Online with Azure Automation Accounts
description: I'm going to walk you through how you can use Azure Automation
  accounts to tap into Exchange Online. This will help everything from
  day-to-day tasks to more sensitive IR related procedures.
pubDate: 2025-08-17
draft: true
---
Most people find Exchange Online management a bit tedious when dealing multiple users. Plenty of time is spent in either on-boarding, off-boarding or incident response procedures.

This article will demonstrate how you can alleviate these pain points with Automation accounts. For those coming from AWS, the equivalent would be Systems Manager. For those starting fresh, think of Automation accounts as cloud-hosted scripts that handle automating a specific task.

I'm going to walk you through how you can use Azure Automation accounts to tap into Exchange Online. You'll learn how to:

1.  Create a Azure Automation account and managed identity
    
2.  Assign permissions to managed identities
    
3.  Create a Runbook that authenticates to and manages Exchange Online with managed Identities
    

You can skip to the [Getting Started](#getting-started) section if you already know the basic requirements.

**What this article is _NOT_**

This article is not meant to be a "best-practices" guide on managing Exchange Online, Managed Identities, or Azure resources. It is meant to demonstrate how you can connect the dots.

With that out of the way, let's have some fun.

**The Scenario:** For this demo, we will wipe company data from a mobile device listed in Exchange Online in a safe and reliable way with an Automation account.

### Prerequisites

You will need the _Automation Contributor_ role (an [Azure built-in role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)) to create [Automation accounts](https://learn.microsoft.com/en-us/azure/automation/overview). Make sure you have this role under the correct Azure resource where your Automation account will live. You will also need the _Privileged Role Administrator_ role (an [Entra built-in role](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)) to add permissions to your [managed identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview). Both roles can be permanently assigned or elevated to by using [Privileged Identity Management (PIM)](https://hassananees.com/posts/simplifying-access-control-with-privileged-identity-management-pim-in-entra-id/). You will also require:

*   An Azure Subscription
    
*   A resource group under that Subscription (this is where the Automation account will live)
    
*   Office 365 Exchange Online resource within Entra ID. Below is a snippet of PowerShell that checks if the resource exists. If nothing shows up, then you will have to set this up. Utilize this [resource](https://learn.microsoft.com/en-us/powershell/exchange/connect-exo-powershell-managed-identity?view=exchange-ps#what-to-do-if-the-office-365-exchange-online-resource-is-not-available-in-microsoft-entra-id) to do so
    

```powershell
# check-exchange-online-resource.ps1
Connect-MgGraph
Get-MgServicePrincipal -Filter "AppId eq '00000002-0000-0ff1-ce00-000000000000'"
```

### The Baseline Manual Process

For some reference, below is the manual workflow that will be automated.

1.  Go to Exchange Online: [admin.exchange.microsoft.com](http://admin.exchange.microsoft.com)
    
2.  Select "Mailboxes"
    
3.  Search and select specific user
    
4.  Select "Manage mobile devices"
    
5.  Click "Account Only Remote Wipe Device"
    

![Exchange Online Mobile Device Management](../../assets/technology/automation-account-exchange/opening-mobile-device-exchange-online.png)

Doing the above is fine for single instances, but this becomes unfeasible in an enterprise environment where there big batches of new and departing users on a recurring basis or circumstances calls for time-sensitive actions.

### Getting Started

Let's create the Automation account called "Automation-Account-Workshop". We will also be creating a managed identity in this step.

1.  Elevate to the Automation Contributor role with [PIM](https://hassananees.com/posts/simplifying-access-control-with-privileged-identity-management-pim-in-entra-id/) _(if applicable, otherwise skip)_
    
2.  Head on over to [portal.azure.com](http://portal.azure.com)
    
3.  Search for **Automation account**
    
4.  Click on **Create**
    
5.  Enter Automation account details (Name, Subscription, Resource group, Region)
    
6.  Under the _Advanced_ tab, ensure that **System-assigned** identity is enabled
    
7.  For the _Networking_ tab, select **public access** (utilizing **private access** requires you to set up a **private endpoint** and **vnets** which = $$$ and complexity. This is a POC)
    
8.  Review and click **Create**
    

![Creating an Automation account within Azure](../../assets/technology/automation-account-exchange/creating-automation-account-workshop.png)

Now that we have created the Automation account we can finish setting up the managed identity piece by granting it the necessary permissions.

### Granting Permissions to the Managed Identity

We need to assign both permissions and an Entra role to the managed identity. Remember, a **permission** is granular, usually a single action whereas a **role** is a collection of permissions. At a high-level, the managed identity will be able to do the following:

1.  Reach out to Exchange Online (managed identity is assigned a **permission**)
    
2.  Perform tasks within Exchange Online (managed identity is assigned a **role**)
    

We'll start with the first part of assigning the managed identity the permission needed to reach out to Exchange Online.

1.  Elevate to the Privileged Role Administrator role with [PIM](https://hassananees.com/posts/simplifying-access-control-with-privileged-identity-management-pim-in-entra-id/) _(if applicable, otherwise skip)_
    
2.  Navigate to Automation account [portal.azure.com](http://portal.azure.com) > **Automation accounts >** Search and click **Automation-Account-Workshop**
    
3.  Navigate to **Account Settings** > **Identity** > Copy the **Object** **(principal) Id**. We will use this later in our script to assign permissions
    

![](../../assets/technology/automation-account-exchange/copying-managed-identity.png)

4.  Execute the script below to assign the **Exchange.ManageAsApp** API permission to the managed identity which allows it call Exchange Online.
    
    > Note that we are replacing MI\_ID variable with the value obtained from the last step. For more information on this step, use this [reference](https://learn.microsoft.com/en-us/powershell/exchange/connect-exo-powershell-managed-identity?view=exchange-ps#step-4-grant-the-exchangemanageasapp-api-permission-for-the-managed-identity-to-call-exchange-online)
    

```powershell
# assigning-permissions-to-managed-identity.ps1
# Connecting to assign permissions via Microsoft Graph
Connect-MgGraph -Scopes AppRoleAssignment.ReadWrite.All,Application.Read.All

$MI_ID = "<object-id-obtained-in-previous-step>"

# The id (GUID) for the Exchange.ManageAsApp API permission. This is the same for all organizations
$AppRoleID = "dc50a0fb-09a3-484d-be87-e023b12c6440"

# This value is different for all organizations
$ResourceID = (Get-MgServicePrincipal -Filter "AppId eq '00000002-0000-0ff1-ce00-000000000000'").Id

# Here you are assigning the permissions
New-MgServicePrincipalAppRoleAssignment -ServicePrincipalId $MI_ID -PrincipalId $MI_ID -AppRoleId $AppRoleID -ResourceId $ResourceID
```

After the successful execution of the script, our managed identity has the authorization to reach out to Exchange Online. If the prior step did not work, double check the prerequisites and utilize this [reference](https://learn.microsoft.com/en-us/powershell/exchange/connect-exo-powershell-managed-identity?view=exchange-ps#step-4-grant-the-exchangemanageasapp-api-permission-for-the-managed-identity-to-call-exchange-online).

We'll now move on to the second part of assigning the managed identity the role needed to execute actions within Exchange Online. For the purpose of simplicity, we will go more broader than necessary by assigning a privileged role like Exchange Administrator. You you can go much more granular if you know exactly what types of actions you want and

Now that we have created the Automation account we can finish setting up the managed identity piece by granting it the necessary Entra roles. For the purpose of this demo, we will go broader than necessary by assigning the managed identity.

1.  Open the stuff
    
2.  Elevate with [PIM](https://hassananees.com/posts/simplifying-access-control-with-privileged-identity-management-pim-in-entra-id/) to the Entra built-in role Privileged Role Administrator _(if applicable, otherwise skip)_
    

For this demo, we are going to be a bit more by downloaded the necessary dependencies needed to access Exchange Online.

Now that we have created the Automation account, we can create the associated runbook (a fancy name for a cloud-hosted script) that will.