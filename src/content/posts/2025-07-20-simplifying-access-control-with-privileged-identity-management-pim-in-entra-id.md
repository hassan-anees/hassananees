---
author: Hassan Anees
title: Simplifying Access Control with Privileged Identity Management (PIM) in
  Entra ID
description: Exploring Identity and Access Management within Microsoft with
  Privileged Identity Management (PIM)
pubDate: 2025-07-20
draft: true
---
Privileged Identity Management (PIM) is a cool feature. I've been working on implementing it across our organization for several months. In short, it's a technology that allows administrators to elevate just-in-time to privileged roles.

# High-Level

Here's the overall gist to get things going. For a more detailed guide skip \[the beginning\](# The Beginning)

1.  Create Entra role assignable groups
    
2.  Assign role(s) to the security group
    
3.  Add Members to this group
    
4.  Activate the role in the PIM management blade (Entra ID > PIM > My roles > Entra > _Admin role_ > Activate)
    
5.  Rinse and repeat
    

# The Beginning

You need the following Entra ID role to start leveraging PIM.

*   Privileged Role Administrator

This will allow you to do the following

*   Create Entra