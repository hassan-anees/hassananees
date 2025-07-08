---
author: Hassan Anees
title: Entra ID Group Management with PowerShell
description: "Some useful PowerShell commands for Entra group management. "
pubDate: 2025-07-08
draft: true
---
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

### Lets expand..

The information above is limited. We do not see additional information such as the source of the group or if that group has a role assigned to it. This is important when being within a hybrid as some groups may have on-prem contingencies.

Let's first get the source of the group

```powershell
# File name: Grab the user and their associated groups along with the group source
$groups = Get-AzureADUserMembership -ObjectId "user@domain.com" -All $true | Where-Object {$_.ObjectType -eq "Group"}

$groups | ForEach-Object {
    $groupDetails = Get-AzureADGroup -ObjectId $_.ObjectId
    [PSCustomObject]@{
        DisplayName = $groupDetails.DisplayName
        ObjectId    = $groupDetails.ObjectId
        Source      = if ($groupDetails.OnPremisesSecurityIdentifier) { "Windows Server AD (Synced)" } else { "Azure AD (Cloud-only)" }
    }
} | Export-Csv -Path "C:\Temp\test\groupsfile.csv" -NoTypeInformation
```

Now we have a base to work with. Let's now see if these groups have an associated role assignment within Azure or EntraID

```
work in progress...
```