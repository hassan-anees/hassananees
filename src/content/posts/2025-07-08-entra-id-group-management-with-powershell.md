---
author: Hassan Anees
title: Entra ID Group Management with PowerShell
description: "Some useful PowerShell commands for Entra group management. "
pubDate: 2025-07-08
draft: true
---
### Grab all groups for a single user

Make sure you grab the object ID for the user you are interested in.

```powershell
# File name: extract-groups-for-user.ps1

#Getting information for a single user
Get-AzureADUserMembership -ObjectId xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx-All $true | Select ObjectType, DisplayName, ObjectId
```

This will list out a good chunk of information

![PowerShell output listing the groups of a user](../../assets/technology/extract-groups-of-user-powershell.png)

However, its easier to deal with this information within excel.

```powershell
#Adding an Export-Csv pipe command to extract the groups
Get-AzureADUserMembership -ObjectId xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx-All $true | Select ObjectType, DisplayName, ObjectId | Export-Csv -Path "C:\Temp\test\groupsfile.csv" -NoTypeInformation  
```