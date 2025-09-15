---
author: Hassan Anees
title: "Enrich Unified Audit Log with Purview Retention Policies "
description: Most organizations have a gap in the quality of logs coming into
  their tenant. This quick walkthrough will ensure critical logs like
  MailItemsAccessed are included in the Unified Audit Log.
pubDate: 2025-09-13
draft: false
---
Your Azure environment might be missing key audit events within the Unified Audit Log (UAL) that are needed for forensic investigations. Audit events like MailItemsAccessed is a must when investigating a compromised user. This happens since not all events are enabled or retained by default. I'll show you a simple Purview configuration so your security and compliance teams won't waste a second scrambling for missing puzzle pieces.

You can jump to the [Getting Started](#getting-started) section for the solution. Otherwise, continue on for background on the UAL, audit events, and retention policies.

### Unified Audit What? Mail Items Who?

The **Unified Audit Log** is a collection of records of both user and administrative actions done across the Microsoft 365 (M365) suite. The collection holds audit events from the following M365 services:

*   Exchange
    
*   SharePoint
    
*   OneDrive
    
*   Teams
    

These logs are especially useful in forensic investigations when security teams need to correlate activities within the M365 suite to assess impact on business critical data. Attacks like Business Email Compromise (BEC) are common across industries making information coming from the UAL invaluable when investigating compromised accounts.

You can access the UAL in following methods:

| Source | Tool / Table |
| --- | --- |
| Purview | Audit (_Tool)_ |
| PowerShell | Microsoft Extractor Suite ([_Tool_](https://github.com/invictus-ir/Microsoft-Extractor-Suite)_)_ |
| Microsoft Sentinel | OfficeActivity (_Table)_ |
| Defender XDR for Cloud Apps | CloudAppEvents _(Table)_ |

One useful audit event to help email compromise investigations is the **MailItemsAccessed** event which shows sync and bind activity for a users mailbox. Sync operations are generated whenever a mail client application downloads mail items. Bind operations record individual access to an email message. If you want more detail, Microsoft has some good [documentation](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts) on this.

Unfortunately, if users are being licensed (E3/E5) via inheritance then your environment is likely missing these logs. You can quickly check if you have these logs coming in by running the following query within Sentinel.

```kql
OfficeActivity
| where Operation contains "MailItemsAccessed"
```

If they are missing then we can remediate this by enabling an audit retention policy within Microsoft Purview.

### Audit Retention Policy with Purview

An audit retention policy is part of Microsoft Purview Audit. If you've used Purview before, you understand that its capabilities is split between three areas:

1.  Data Security
    
2.  Data Governance and Discovery
    
3.  Compliance and Risk Management
    

The Purview Audit tool lands in the third category for compliance. [Audit retention policies](https://learn.microsoft.com/en-us/purview/audit-log-retention-policies) let you specify how long to retain audit logs for within your organization. These policies are flexible as you can specify retention on all activities in one or more Microsoft services. You can retain data all the way to 10 years, but of course, you should align with the standard in your industry.

### Prerequisites

You will need the following to get rolling:

1.  The _Organization Management_ role (a Purview Portal role) to create [**Audit Retention policies**](https://learn.microsoft.com/en-us/purview/audit-log-retention-policies).
    
2.  End users with an E3 or E5 license to see audit events like MailItemsAccessed
    

To assign the role, do the following:

1.  Head over to [purview.microsoft.com](http://purview.microsoft.com)
    
2.  Click on **Settings** on the left
    
3.  Select **Roles and scopes** > **Role groups**
    
4.  Click **Organization Management** > **Edit** > **Choose users** > **Save**
    

> Note that if you have trouble viewing the Role and scopes section within Purview, you likely require an admin with the Global Administrator role to assign you the proper permissions

### Getting Started

With all the fluff out of the way, let's start creating our audit retention policy.

1.  Head over to [purview.microsoft.com](http://purview.microsoft.com)
    
2.  Select **Solutions** > **Explore all**
    
3.  Search for **Audit**
    
4.  Click **Policies**
    
5.  Select **Create audit retention policy**
    
6.  Fill out **Policy name** and **Description**
    
7.  Leave the value for **Users** and **Record Type** empty to target all users and records
    
8.  Set **Duration** to what is necessary for your organization (this may increase ingestion costs based on the duration)
    
9.  Click **Save** and leave the policy to marinate over night
    

![Creating an audit retention policy within Purview Audit](../../assets/technology/purview-retention-ual/create-audit-retention.png)

### Querying Audit Events

In the morning we can check within Purview Audit whether we are getting audit event logs such as MailItemsAccessed.

1.  Select **Search** within Purview Audit blade
    
2.  Provide a **time range**
    
3.  Type **MailItemsAccessed** under operation names
    
4.  Click **Search**
    
5.  Click on the result below to show all the audit logs
    

> **Note** that this may take anywhere from a couple seconds to minutes depending on how much data is available in your tenant

![Searching for audit events within Purview Audit](../../assets/technology/purview-retention-ual/mailitemsaccessed-purview-audit-tool.png)

You could also check within Sentinel as well by re-running the query below.

```kql
OfficeActivity
| where Operation contains "MailItemsAccessed"
```

If you would like to go further in-depth with audit retention with PowerShell, Nathan McNulty has a great [article](https://nathanmcnulty.com/blog/2025/04/comprehensive-guide-to-configuring-advanced-auditing/) that outlines how. And if you would like deeper insight on the Unified Audit Log, I highly recommend Bert-Jan Pals [walkthrough](https://www.youtube.com/watch?v=CLYvovdlThk). If you have any questions, I’d love to hear from you. Hope this helped.