---
author: Hassan Anees
title: "Automation Anthology: Tap into Exchange Online with Azure Automation Accounts"
description: I'm going to walk you through how you can use Azure Automation
  Accounts to tap into Exchange Online. This will help everything from
  day-to-day tasks to more sensitive IR related procedures.
pubDate: 2025-08-17
draft: true
---
Most people find Exchange Online management a bit tedious when dealing multiple users. Plenty of time is spent in either on-boarding, off-boarding or incident response procedures.

This article will demonstrate how you can alleviate these pain points with Automation Accounts. For those coming from AWS, the equivalent would be Systems Manager. For those starting fresh, think of Automation Accounts as cloud-hosted scripts that handle automating a specific task.

I'm going to walk you through how you can use Azure Automation Accounts to tap into Exchange Online. You'll learn how to:

1.  Create an Azure Automation Account
    
2.  Create a managed identity
    
3.  Create a Runbook
    
4.  Assign roles to managed identities
    
5.  Authenticate to Exchange Online with managed Identities
    
6.  Manage Exchange Online with PowerShell
    

**What this article is _NOT_**

This article is not meant to be a "best-practices" guide on managing Exchange Online, Managed Identities, or Azure resources. It is meant to demonstrate how you can connect the dots.

With that out of the way, let's have some fun.

**The Scenario:** For this demo, we will wipe company data from a mobile device listed in Exchange Online in a safe and reliable way.

### Prerequisites

You will need the _Automation Contributor_ role (an [Azure built-in role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)) to create [Automation Accounts](https://learn.microsoft.com/en-us/azure/automation/overview). You will also need the _Privileged Role Administrator_ role (an [Entra built-in role](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)) to add permissions to your [managed identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview). You will also require:

*   An Azure Subscription
    
*   A resource group under that Subscription
    

**The not so fun manual process...**

Before jumping into the automation, let's see how the manual process looks like. We will automate the workflow below.

1.  Go to Exchange Online: [admin.exchange.microsoft.com](http://admin.exchange.microsoft.com)
    
2.  Select "Mailboxes"
    
3.  Search and select specific user
    
4.  Select "Manage mobile devices"
    
5.  Click "Account Only Remote Wipe Device"
    

![Exchange Online Mobile Device Management](../../assets/technology/automation-account-exchange/opening-mobile-device-exchange-online.png)

Doing the above is fine for single instances, but this becomes unfeasible in an enterprise environment where there big batches of new and departing users on a recurring basis or circumstances calls for time-sensitive actions.

### Automation Kick-Off: Creating the Automation Account

If you are leveraging [Privileged Identity Management (PIM)](https://hassananees.com/posts/simplifying-access-control-with-privileged-identity-management-pim-in-entra-id/) for access management, now is the time to elevate to Automation Contributor.

1.  Head on over to [portal.azure.com](http://portal.azure.com)
    
2.  Search for **Automation Account**
    
3.  Click on **Create**
    
4.  Enter Automation Account details (Name, Subscription, Resource group, Region)
    
5.  Under the _Advanced_ tab, ensure that **System-assigned** identity is enabled
    
6.  For the _Networking_ tab, select **public access** (utilizing **private access** requires you to set up a **private endpoint** and **vnets** which = $$$ and complexity. This is a POC)
    
7.  Review and click **Create**
    

![](../../assets/technology/automation-account-exchange/creating-automation-account.png)