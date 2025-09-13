---
author: Hassan Anees
title: "Enrich Unified Audit Log with Purview Retention Policies "
description: Most organizations have a gap in the quality of logs coming into
  their tenant. This quick walkthrough will ensure critical logs like
  MailItemsAccessed are included in Unified Audit Log.
pubDate: 2025-09-13
draft: true
---
Your environment may be missing key audit events within Unified Audit Log (UAL) that is needed for a thorough investigation. Audit events like MailItemsAccessed is a must when investigating a compromised user. In the event of a breach, your security team needs all the insight they can get to validate any impact on business critical data. I'll show you a simple Purview configuration so your compliance and security teams won't waste a second scrambling for missing puzzle pieces.

Logs like MailItemsAccessed is a must when investigating a compromised user. In the event of a breach, your security team needs all the insight they can get to validate any impact on business critical data. Unfortunately, your environment may be missing such logs since not all event logging in Unified Audit Log (UAL) is enabled by default if users are being licensed via inheritance. I'll show you a simple Purview configuration so your compliance and security teams won't waste a second scrambling for missing puzzle pieces.

You can jump to [Getting Started](#getting-started) section for the solution. Otherwise, continue on for background on UAL, the MailItemsAccessed audit log, and why you may be missing key information within UAL.

### Unified Audit What? Mail Items Who?

Unified Audit Log (UAL) is a collection of records of both user and administrative actions done across the Microsoft 365 suite. UAL contains audit events from the following M365 services:

*   Exchange
    
*   SharePoint
    
*   OneDrive
    
*   Teams
    

Let's dig deeper. You can find UAL in following locations:

| Source | Tool / Table |
| --- | --- |
| Purview | Audit (_Tool)_ |
| PowerShell | Microsoft Extractor Suite ([_Tool_](https://github.com/invictus-ir/Microsoft-Extractor-Suite)_)_ |
| Microsoft Sentinel | OfficeActivity (_Table)_ |
| Defender XDR for Cloud Apps | CloudAppEvents _(Table)_ |

UAL provides context on activities done within the M365 suite and allows teams to correlate those actions with security incidents. Attacks like Business Email Compromise (BEC) are common across industries making information coming from UAL become invaluable when investigating compromised email accounts.

One useful audit event to help email compromise investigation is the MailItemsAccessed event which shows sync and bind activity for a users mailbox.

Unfortunately, your environment may be missing such logs since not all event logging in Unified Audit Log (UAL) is enabled by default if users are being licensed via inheritance.

### Getting Started

Prereq:

*   A Global Administrator role is required to assign the Organization Management role to an admin to deploy the policy (this role is required to deploy an audit retention policy) otherwise you will get the following error
    

![](../../assets/technology/purview-retention-ual/error-creating-policy.png)

Check within Purview

![](../../assets/technology/purview-retention-ual/mailitemsaccessed-purview-audit-tool.png)

Creating the audit retention policy

![](../../assets/technology/purview-retention-ual/audit-retention-policy.png)

References

*    [Manage audit log retention policies | Microsoft Learn](https://learn.microsoft.com/en-us/purview/audit-log-retention-policies) 
    

*   [https://nathanmcnulty.com/blog/2025/04/comprehensive-guide-to-configuring-advanced-auditing/](https://nathanmcnulty.com/blog/2025/04/comprehensive-guide-to-configuring-advanced-auditing/)