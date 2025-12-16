# Asset & NSPIRE Compliance Application

Designed and delivered a custom compliance and asset management application to track property assets and enforce HUD NSPIRE regulatory standards. Automated compliance deadline tracking based on deficiency severity, maintained asset lifecycle records, and provided real-time visibility into inspection status across multi-unit properties.

**Business Value:** Enforces compliance deadlines, tracks asset lifecycle from purchase to disposal, prevents inspection failures through proactive deficiency management, and provides complete audit trail for regulatory reporting.

---

## Business Problem

**Before:**
- No centralized asset tracking - appliances appeared and disappeared without inventory records
- NSPIRE inspection violations discovered reactively during annual audits
- Manual compliance tracking using spreadsheets led to missed deadlines
- No data-driven equipment replacement planning
- Regulatory exposure due to lack of deficiency oversight

---

## Solution Delivered

**Custom Compliance Application:**
- Created 5-table relational data model:
  - Units table (property configuration items)
  - Appliance models (equipment catalog)
  - Appliances (physical asset tracking with serial numbers)
  - NSPIRE inspections (annual compliance audits)
  - Deficiency items (violations with severity classification)
- Implemented Business Rule automation:
  - Auto-calculate correction deadlines based on severity (Life-Threatening = 24hrs, Severe/Moderate = 30 days)
  - Update unit compliance status on inspection completion
  - Generate email alerts for critical deficiencies
- Built Flow Designer workflow for deficiency remediation with automatic work order creation
- Configured asset lifecycle tracking (In Stock → Installed → In Repair → Disposed)

---

## Business Value

**What the System Does:**
- **Enforces compliance deadlines** through severity-based auto-calculation (regulatory requirement adherence)
- **Tracks complete asset lifecycle** from purchase through disposal with warranty monitoring
- **Prevents inspection failures** by providing real-time visibility into open deficiencies
- **Enables proactive planning** through data-driven equipment replacement tracking
- **Provides regulatory audit trail** with complete deficiency history and resolution timestamps

---

## Technical Highlights

**ServiceNow Features Used:**
- **Custom Data Model:** 5 relational tables with reference fields and parent-child relationships
- **Business Rules:** Server-side JavaScript for deadline calculation and status updates
- **Flow Designer:** Multi-step deficiency remediation workflow
- **GlideDateTime API:** Deadline calculation logic (addSeconds, addDaysLocalTime)
- **Email Notifications:** Critical deficiency alerts to maintenance supervisors
- **Data Integrity:** Unique indexes, required field validation, referential integrity

**Code Example - Deadline Calculation:**
```javascript
// Auto-calculate correction deadline based on HUD NSPIRE severity standards
if (current.severity == 'life_threatening') {
    current.correction_deadline.setDisplayValue(gs.nowDateTime());
    current.correction_deadline.addSeconds(86400); // 24 hours
} else if (current.severity == 'severe' || current.severity == 'moderate') {
    current.correction_deadline.setDisplayValue(gs.nowDateTime());
    current.correction_deadline.addDaysLocalTime(30); // 30 days
}
```

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

### Automated Deadline Calculation
![Deficiency with Severity](assets/07_deficiency_with_severity.png)  
*Server-side JavaScript automatically calculates correction deadline based on severity classification*

---

## Setup Notes

**Environment:** ServiceNow Personal Developer Instance (Zurich Release)

**Prerequisites:**
- Custom application scope created
- Email configuration enabled (for alert notifications)
- Flow Designer access

**Key Tables:**
- `u_unit` (extends Configuration Item)
- `u_appliance_model` (equipment catalog)
- `u_appliance` (extends Asset)
- `u_nspire_inspection` (compliance audits)
- `u_deficiency_item` (violations)

---

## Technologies

- ServiceNow Platform (Zurich Release)
- Custom Scoped Application
- Business Rules (Server-side JavaScript)
- Flow Designer
- GlideRecord API
- GlideDateTime API
- Email Notifications

---

## Related Projects

Integrates with [Procurement Workflow Application](../project2_procurement_workflow) to prevent duplicate appliance purchases through inventory lookup.

---

**Built on ServiceNow Platform (Zurich Release)**
