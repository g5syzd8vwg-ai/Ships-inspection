VESSEL & CREW INSPECTION — iPhone PWA FIXED14

Purpose
-------
Offline-first PWA for use onboard a vessel on iPhone/iPad. Based on FIXED13. Existing inspection functions, checklist, photo capture/storage, JSON import/export and PDF/print logic are retained.

IMPORTANT: FIRST INSTALLATION
-----------------------------
A real iPhone PWA service worker requires HTTPS. Do NOT open index.html directly from the Files app or with file://.

1. Upload the contents of this folder to an HTTPS web location.
2. Open the HTTPS address in Safari while online.
3. Allow the page to load completely and wait until the top status says:
   ONLINE — offline mode ready
4. Use Safari Share -> Add to Home Screen.
5. Launch the new Home Screen app once while online.
6. After that, the inspection app shell is cached and can be used without Internet connectivity.

ONBOARD USE
-----------
- Start the inspection while online, then the app can be used offline.
- Inspection text and photographs are stored locally in IndexedDB.
- JSON Export creates a local backup file.
- JSON Import restores an inspection and its photographs.
- Camera capture works through the iPhone file/camera interface.
- The status badge shows whether the app is offline and whether the offline cache is ready.

LIMITATION
----------
The browser cannot install or activate a Service Worker from a file:// URL. HTTPS is therefore required for the initial PWA installation. Once installed and cached, Internet access is not required for normal inspection work.

FILES
-----
index.html      Application
manifest.json   PWA manifest
sw.js           Offline service worker
icons/          Home Screen icons
