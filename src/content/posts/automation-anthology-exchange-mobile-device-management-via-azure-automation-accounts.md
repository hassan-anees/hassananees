---
author: Hassan Anees
title: "Atomic Automations: Exchange Mobile Device Management with Azure
  Automation Accounts"
description: I'm going to walk you through how you can use Azure Automation
  Accounts to tap into Exchange Online. This will help everything from
  day-to-day tasks to more sensitive IR related procedures.
pubDate: 2025-08-17
draft: true
---
Most people find managing mobile devices tedious on the Exchange Online platform when dealing multiple users. Plenty of time is spent during on-boarding, off-boarding and incident response procedures.

This article is geared towards demonstrating how you can alleviate this pain point with Automation Accounts within Azure. I'm going to walk you through how you can use Azure Automation Accounts to tap into Exchange Online. You'll learn how to:

*   Create an Azure Automation Account
    
*   Create a managed identity
    
*   Create a Azure Automation Runbook
    
*   Assign roles to managed identities
    
*   Authenticate to Exchange Online with managed Identities
    
*   Manage mobile devices with PowerShell
    

**What this article is _NOT_**

This article is not meant to be a "best-practices" guide on managing Exchange, Managed Identities, or Azure resources. It is meant to demonstrate how you can connect the dots.

With that out of the way, let's have some fun.

**The Scenario:** For this demo let's assume that we need to automate a device clean up process which will involve removing account only data and deleting the device.

### Prerequisites

You will need the _Automation Contributor_ role to create [Automation Accounts](https://learn.microsoft.com/en-us/azure/automation/overview) (an [Azure built-in role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)). You will also need the _Privileged Role Administrator_ role (an [Entra built-in role](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)) to add permissions to your managed identity.

**The not so fun manual process...**

Before jumping into the automation, let's see how the manual process looks like. We will automate the workflow below.

1.  Go to Exchange Online: [admin.exchange.microsoft.com](http://admin.exchange.microsoft.com)
    
2.  Select "Mailboxes"
    
3.  Search and select specific user
    
4.  Select "Manage mobile devices"
    
5.  Click "Account Only Remote Wipe Device" followed by "Delete Device"
    

![Exchange Online Mobile Device Management](../../assets/technology/automation-account-exchange/opening-mobile-device-exchange-online.png)

Doing the above is fine for single instances, but this becomes unfeasible in an enterprise environment where there big batches of new and departing users on a recurring basis or circumstances calls for time-sensitive actions.

### Introducing Azure Automation Accounts

While I said this is not an Azure Automation tutorial, I will give a brief primer. You can think of Automation Accounts as scheduled  
Automation Accounts can be quite a handy  
.... details for the automation account

This was meant to be a very brief overview on how you can leverage automation accounts. This is not meant to be a tutorial on managing Exchange, Managed Identities, or