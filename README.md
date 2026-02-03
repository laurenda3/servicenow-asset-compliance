# Technical Brief: Asset & NSPIRE Compliance Scoped App

## The Problem
In industrial operations, "compliance" is often a reactive firefighting exercise. Property managers were previously tracking thousands of high-value assets (HVAC, appliances) and HUD NSPIRE safety deficiencies across multi-unit portfolios using disconnected spreadsheets. This created a critical single point of failure: a lack of real-time visibility into correction deadlines, leading to failed inspections, regulatory fines, and degraded housing quality.

## The Solution
I built a **Scoped Application** on the **ServiceNow Zurich release** to serve as the main place where all information for equipment and safety rules is kept. My objective was to move from manual tracking to an automated system that handles correction deadlines based on safety standards.

---

## Technical Architecture

### Data Model & CSDM Alignment
I built a 5-table setup that focuses on keeping all the records connected properly:
*   **Asset Foundation:** I chose to extend the `cmdb_ci` table for the **Units** table. This allowed me to use the built-in ways ServiceNow connects different types of equipment, making sure the data is ready for advanced reporting later.
*   **Organization:** I separated **Appliance Models** (the type of item) from the **Appliances** (the specific item). This prevents duplicate data and makes sure serial numbers and maintenance history stay with the right equipment.
*   **Compliance Layer:** The **NSPIRE Inspections** and **Deficiency Items** tables use strict parent-child relationships to maintain a clean audit trail for every violation discovered during an audit.

### Server-Side Logic (Script Includes)
The "intelligence" of the application resides in a **Global-Scope Script Include** that is triggered by a Before Business Rule.
*   **How I built it:** I moved the scoring and date rules into one central script to keep the rules in one place. This way, the same math can be used by different parts of the system without having to rewrite it.
*   **The Logic:** Using the `GlideDateTime` API, the script (ComplianceUtils) evaluates the deficiency severity and adds the appropriate interval (24 hours vs. 30 days) based on HUD standards.

### Automation (Flow Designer)
I designed a remediation workflow that triggers upon the logging of a high-severity deficiency. This replaces manual follow-ups by:
1.  Automatically routing a Work Order to the appropriate maintenance group.
2.  Updating the unit status to 'Non-Compliant' to flag the property in executive dashboards.
3.  Firing a notification to the Property Manager 48 hours before the HUD deadline expires.

---

## Key Features
*   **Automated Correction Engine:** Eliminates human error in date math; correction deadlines are strictly enforced via server-side scripts.
*   **360-Degree Asset Visibility:** A single unit view showing all installed appliances, their maintenance history, and current compliance standing.
*   **Regulatory Audit Trail:** Every status change and remediation step is timestamped, providing a defensible record for HUD inspectors.

## How to Review
To evaluate the technical implementation of this project, please review these key areas:
*   **Organized Code:** `scripts/ComplianceUtils.js` - Review how I moved the compliance math into one central script.
*   **Automatic Rules:** Check the Business Rule that calls the script to make sure the same rules are used every time.
*   **Data Accuracy:** Check the `u_unit` table setup in the screenshots below to see how I connected the equipment records properly.

---

## Screenshots

### Unit Table Schema
![Unit Table](assets/01_unit_table_structure.png)  
*Custom table configuration with unique index on unit number for data integrity*

### Property Portfolio Dashboard
![Units List](assets/02_units_list_view.png)  
*Multi-unit property portfolio with real-time NSPIRE compliance status tracking*

### Unit Record with Asset Relationships
![Unit Form](assets/03_unit_form_with_relationships.png)  
*Complete unit profile showing installed appliances and inspection history via related lists*

### Asset Inventory
![Appliances List](assets/04_appliances_list_view.png)  
*Physical asset tracking with serial numbers, warranty dates, and current locations*

### Asset Lifecycle Detail
![Appliance Form](assets/05_appliance_detail_form.png)  
*Complete asset record from purchase through disposal including maintenance history*

### Annual Compliance Tracking
![NSPIRE Inspections](assets/06_nspire_inspections_list.png)  
*Annual inspection audit trail with pass/fail results and score trending*

---

## Technologies Used
- ServiceNow Scoped Application (Zurich Release)
- Data Modeling (CMDB Extension)

---
**Developed by Laurenda Landry**  
*10 years experience in Industrial Operations & Compliance*
