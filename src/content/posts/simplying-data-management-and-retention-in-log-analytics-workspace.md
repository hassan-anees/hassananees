---
author: Hassan Anees
title: Simplying Data Management and Retention in Log Analytics Workspace
description: "This walkthrough shows how your organization can save thousands in
  monthly Azure costing by adjusting log retention within the Log Analytics
  workspace. "
pubDate: 2025-09-21
draft: true
---
Organizations with a cloud footprint need logs to provide useful security insights. However, the costs of ingesting and retaining these logs might make you want to pull your hair out. I'll show how you can adjust log retention within Azure so you can better sleep at night.

For the purpose of this walk-through, we will focus on adjusting log retention in the Log Analytics workspace. Here's the gist of what you can expect in this write-up:

1.  Extract the most log hungry tables
    
2.  Adjust retention for a single table (manually)
    
3.  Adjust retention for multiple tables (via script)
    
4.  Query archived data with **search jobs**
    
5.  Query archived data with **log restore**
    

Before we actually adjust any policies we need to understand the types of logs held within the Log Analytics workspace. There are three main types of logs:

1.  **Analytical** or **Interactive Logs**: These are your typical logs that readily available (hot storage) for any hunting queries, analytic rules, and workbooks.
    
2.  **Basic** _aka_ **Auxiliary logs**:
    
3.  **Archive**: