var ComplianceUtils = Class.create();
ComplianceUtils.prototype = {
    initialize: function () { },

    /**
     * Calculates the correction deadline based on HUD NSPIRE severity standards.
     * 
     * @param {string} severity - The severity level of the deficiency.
     * @return {GlideDateTime} The calculated deadline.
     * 
     * Why: This logic is moved into one central script so the rules stay in one place.
     * It can be used by different parts of the system, like forms or dashboards,
     * to make sure the math is always consistent.
     */
    calculateDeadline: function (severity) {
        if (!severity) return null;

        var gdt = new GlideDateTime();

        // HUD NSPIRE Standards
        if (severity == 'life_threatening') {
            gdt.addSeconds(86400); // 24 hours
        } else if (severity == 'severe' || severity == 'moderate') {
            gdt.addDaysLocalTime(30); // 30 days
        }

        return gdt;
    },

    type: 'ComplianceUtils'
};
