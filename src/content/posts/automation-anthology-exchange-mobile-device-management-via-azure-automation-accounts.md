---
author: Hassan Anees
title: "Atomic Automations: Exchange Mobile Device Management via Azure
  Automation Accounts"
description: Mobile device management
pubDate: 2025-08-17
draft: true
---
Most people find managing mobile devices tedious on the Exchange Online platform when dealing multiple users. Plenty of time is spent during on-boarding, off-boarding and even incident response procedures. This article is geared towards demonstrating how you can alleviate this pain point with automation accounts.

Note that this applies to the to the day-to-day administrative tasks as well as time-sensitive incident response related actions.

**Scenario:** Let's go with the scenario that we would like to block access.

**What the Manual Process Looks Like**

1.  Go to Exchange Online: [admin.exchange.microsoft.com](http://admin.exchange.microsoft.com)
    
2.  Select "Mailboxes"
    
3.  Search and select specific user
    
4.  Select "Manage mobile devices"
    
5.  Click "Block access"
    

![Exchange Online Mobile Device Management](../../assets/technology/automation-account-exchange/opening-mobile-device-exchange-online.png)

Doing the above is fine for single instances, but this becomes unfeasible in an enterprise environment where there big batches of new and departing users on a recurring basis or circumstances calls for time-sensitive actions.

### Introducing Azure Automation Accounts

.... details for the automation account

*   Need to create managed system assigned identity
    
*   Permissions needed on YOU to make the account: Automation Contributor (Azure Based Permissions)
    
*   Permissions needed for the automation account in general (Exchange Admin Role on the account)