VESSEL & CREW INSPECTION — iPhone PWA FIXED16

Replace the files in the existing GitHub Pages repository with:
- index.html
- manifest.json
- sw.js

Keep the existing icons/ folder if it is already in the repository.

FIXED16 change:
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

The service-worker cache name is changed to fixed16 so the new application shell replaces the FIXED15 cache.
