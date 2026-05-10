const REQUEST_LIMIT_DEFAULT = 10;
const REQUEST_LIMIT_TIME_ZONE = "Europe/Berlin";
const REQUEST_LIMIT_BASE_URL =
   "https://join-278b5-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Returns the request limit base URL.
 * @returns {string} The request limit base URL.
 */
function getRequestLimitBaseUrl() {
   const configuredBaseUrl = window.JOIN_CONFIG && window.JOIN_CONFIG.BASE_URL;
   return configuredBaseUrl || REQUEST_LIMIT_BASE_URL;
}

/**
 * Returns today's day key in Europe/Berlin.
 * @returns {string} The day key in YYYY-MM-DD format.
 */
function getBerlinDayKey() {
   const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: REQUEST_LIMIT_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   }).formatToParts(new Date());
   const year = parts.find((part) => part.type === "year")?.value;
   const month = parts.find((part) => part.type === "month")?.value;
   const day = parts.find((part) => part.type === "day")?.value;
   return `${year}-${month}-${day}`;
}

/**
 * Returns the request limit URL for one day.
 *
 * @param {string} dayKey - The day key.
 * @returns {string} The full request limit URL.
 */
function getRequestLimitDayUrl(dayKey) {
   return `${getRequestLimitBaseUrl()}requestLimits/global/${encodeURIComponent(dayKey)}.json`;
}

/**
 * Builds the default request limit payload for one day.
 *
 * @param {string} dayKey - The day key.
 * @returns {object} The request limit payload object.
 */
function buildDailyRequestLimitPayload(dayKey) {
   return {
      count: 0,
      limit: REQUEST_LIMIT_DEFAULT,
      dayKey,
      createdAt: Date.now(),
      updatedAt: Date.now(),
   };
}

/**
 * Ensures the daily request limit entry exists in Firebase.
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
async function ensureDailyRequestLimitEntry() {
   const dayKey = getBerlinDayKey();
   const dayUrl = getRequestLimitDayUrl(dayKey);
   const readResponse = await fetch(dayUrl);
   if (!readResponse.ok) throw new Error(`Failed loading request limit: HTTP ${readResponse.status}`);
   const existingDayEntry = await readResponse.json();
   if (existingDayEntry) return;
   const payload = buildDailyRequestLimitPayload(dayKey);
   const writeResponse = await fetch(dayUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
   });
}

/**
 * Initializes the daily request limit prefetch on page load.
 * @returns {void} Nothing.
 */
function initDailyRequestLimitPrefetch() {
   ensureDailyRequestLimitEntry().catch((error) => {
      console.error("Daily request limit initialization failed:", error);
   });
}

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", initDailyRequestLimitPrefetch);
} else {
   initDailyRequestLimitPrefetch();
}
