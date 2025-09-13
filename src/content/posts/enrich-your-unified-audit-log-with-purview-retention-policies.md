---
author: Hassan Anees
title: "Enrich Unified Audit Log with Purview Retention Policies "
description: Most organizations have a gap in the quality of logs coming into
  their tenant. This quick walkthrough will ensure critical logs like
  MailItemsAccessed are included in Unified Audit Log.
pubDate: 2025-09-13
draft: true
---
Logs like MailItemsAccessed is a must when investigating a compromised user. In the event of a breach, your security team needs all the insight they can get to validate any impact on business critical data. Unfortunately, your environment may be missing such logs since not all event logging is enabled by default if users are being licensed via inheritance. Hence, there might be a gap in your Unified Audit Logs. I'll show you a simple Purview configuration so your compliance and security teams won't waste a second scrambling for missing puzzle pieces.

If you want to skip the "Why" you can jump to the Getting Started section.

### Unified Audit What? Mail Items Who?

For those stepping into the Microsoft ecosystem, Unified Audit Log (UAL) is a collection of records of both user and administrative actions done across the Microsoft 365 suite. You would get logs from the following sources:

*   Exchange
    
*   SharePoint
    
*   OneDrive
    
*   Teams
    

You can find these logs in following locations:

| Source | Table / Tool |
| --- | --- |
| Purview | Audit (_Tool)_ |
| PowerShell | Microsoft Extractor Suite (_Tool)_ |
| Microsoft Sentinel | OfficeActivity (_Table)_ |
| Defender XDR for Cloud Apps | CloudAppEvents _(Table)_ |

UAL provides context on activities done within the M365 suite and allows teams to correlate those actions with security incidents. Attacks like Business Email Compromise (BEC) are common across industries making information coming from UAL become invaluable when investigating compromised email accounts. One useful log to help email compromise investigation is the MailItemsAccessed log which shows sync and bind activity for a users mailbox. Synbc

This is where the MailItemsAccessed

, making it madiitory to have .

demonstrate the value of having

Business Email Compromise (BEC) attacks common attack your teams may encounter are Business Email Compromise.

You can now imagine why having comprehensive Unified Audit Logging can be so critical to judge business information.

Now that we know where the

Logs like MailItemsAccessed are critical to help nail down the severity of security incidents in the event of a breach. Your security compliance or incident response team can attest to the importance of these logs when dealing with incidents like Business Email Compromise. Unfortunately, the team may also be missisng

Logs that provide insight into a compromised user's Office activity like Outlook is critical to understand the impact of and incident in the event of a breach. One useful log is the MailItemsAccessed which shows sync and bind activity for a users mailbox. Unfortunately, most tenants may not be ingesting these logs even with correct licensing Microsoft's Premium Audit feature enabled.

Logs like MailItemsAccessed is a must when investigating a compromised user. In the event of a breach, your security team needs all the insight they can get to validate any impact on business critical data.

's Office activity like Outlook is critical to understand the impact of and incident in the event of a breach. One useful log is the MailItemsAccessed which shows sync and bind activity for a users mailbox. Unfortunately, most tenants may not be ingesting these logs even with correct licensing Microsoft's Premium Audit feature enabled.

I'll show you how to fill in the gaps in Unified Audit Log by configuring Purview retention policies.

I'll show you how to fill in the gaps in Unified Audit Log so your incident response or security and compliance team isn't scrambling for missing puzzle pieces in attacks like Business Email Compromise.

am going share how Your security and compliance or incident response teams.

Your security compliance or incident response team can attest to the importance of these logs when dealing with incidents like Business Email Compromise. Unfortunately, the team may also be missisng

can help differentiate between.

Your security compliance or incident response team can surely attest to that.

I did not realize how silly Microsoft's default setting one. I'll show you the main configuration you need so your security team is not scrambling last security a needed.

I went from being a bad writer to a good writer after taking a one-day course in “business writing.” I couldn’t believe how simple it was. I’ll tell you the main tricks here so you don’t have to waste a day in class."

Most security teams are missing key event information like MailItemsAccessed logs within Unified Audit Log (UAL). MailItemsAccessed logs

Oddly enough,

By default, licensing via inheritance does not enable Microsoft’s “Premium Auditing” (MailItemsAccessed) on a mailbox, regardless of licensing level.  

This will be a short walkthrough tha

Most organizations have a gap in the quality of logs coming into their tenant. This quick walkthrough will ensure critical logs like MailItemsAccessed are included in Unified Audit Logs.