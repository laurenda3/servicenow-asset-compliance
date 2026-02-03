/**
 * @BusinessRule: Calculate Correction Deadline
 * @Table: u_deficiency_item
 * @When: Before Insert/Update
 * 
 * Why: We use a 'Before' rule here to set the value before the database commit. 
 * This ensures the data is accurate for UI displays and prevents the need for 
 * a second 'update()' call (saving database overhead and preventing recursion).
 */
(function executeRule(current, previous /*null when async*/) {

    if (!current.severity) return;

    var gdt = new GlideDateTime();

    // HUD NSPIRE Standards: 
    // Life-Threatening = 24 hours
    // Severe/Moderate = 30 days

    if (current.severity == 'life_threatening') {
        gdt.addSeconds(86400); // 24 hours
    } else if (current.severity == 'severe' || current.severity == 'moderate') {
        gdt.addDaysLocalTime(30);
    }

    current.correction_deadline = gdt;

})(current, previous);
