VESSEL & CREW INSPECTION — iPhone PWA FIXED28

Replace the files in the existing GitHub Pages repository with:
- index.html
- manifest.json
- sw.js

Keep the existing icons/ folder if it is already in the repository.

FIXED28 change:
- One Finding / Comment per inspection item.
- Each item can have multiple Recommendations.
- Every Recommendation has its own:
  Reference
  Recommendation Status
  Recommended Corrective Action
  Completion / Verification Remarks
- Existing FIXED15 data is migrated automatically: the existing Finding text is preserved as one Finding, and the existing recommendation fields become Recommendation 1.
- JSON export/import preserves the new recommendation structure.
- Review and PDF output show all recommendations separately under the relevant Finding.

The service-worker cache name is changed to fixed19 so the new application shell replaces the FIXED15 cache.


FIXED28 change: removed the Location field from photo editing and from photo captions in the report. Existing Location data in imported JSON is retained for compatibility but is no longer displayed.


FIXED28 change:
- Added separate item-level ACTIVE / N/A control, independent from the inspection result status.
- An item marked N/A is excluded from progress assessment, Review, photographs in the final report, and the final PDF/print report.
- Existing item data is preserved when an item is deactivated and is restored when the item is set back to ACTIVE.
- Section completion indicators ignore deactivated items.
- Item-level N/A state is preserved in JSON export/import.
- Item 1.5 renamed to: MLC Compliance – Rest & Work Hours, Salary Calculations, Allotments and Evidence of Crew Salary Payments.


FIXED28 print/PDF fixes:
- Final Findings & Recommendations are paginated as compact multi-row tables instead of forcing one recommendation row onto a separate page.
- Photo sheets no longer force an additional page break inside an A4 report page.
- Photo sheet dimensions/positions are constrained to the printable report body to prevent overflow and blank pages.


FIXED24 PRINT LAYOUT UPDATE
- Print pages use a 296 mm A4 content box and a bounded CSS grid track to avoid Safari/WebKit rounding overflow that can create blank pages.
- Photo sheets fit inside the printable body area.
- Final recommendation status column is wider and keeps RECOMMENDATION on one line.
- Service worker cache key updated so installed PWA can fetch the new app shell.

FIXED25 print follow-up (19 Oct 2026):
- Final Findings & Recommendations Status cells now wrap long values instead of overflowing into Completion / Verification.
- Recommendation pagination threshold increased to reduce under-filled final-findings pages while keeping rows together.
- Empty Conclusion heading is hidden on the summary page when no conclusion text has been entered.
- Service worker cache key updated to fixed25-tablewrap.
Note: Validate the resulting PDF in Safari on the target device; this environment cannot run the Safari print pipeline.


FIXED28 change:
- Retains FIXED26 recommendation status normalization: OPEN, CLOSED, CLOSED DURING INSPECTION.
- Restores the prior final-findings pagination threshold (42 row-height units) from FIXED26 instead of the changed 60-unit threshold in FIXED27.
- Updates the service-worker cache name so the new offline app shell can replace the previous cache.
