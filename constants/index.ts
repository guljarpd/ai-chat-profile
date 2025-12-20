/**
 * ================================
 * Global Application Constants
 * ================================
 */

/* --------------------------------
* App Config
* -------------------------------- */
export const APP_NAME = "AI Chat";
export const DEFAULT_LANGUAGE = "en";
export const EXPIRES_IN="1h";
export const SALT_ROUNDS=10;

/* --------------------------------
 * Profile / Memory Triggers
 * -------------------------------- */
export const PROFILE_TRIGGERS = [
    "who am i",
    "tell me about myself",
    "what do you know about me",
    "describe me",
] as const;

/* --------------------------------
* Chat / UI Constants
* -------------------------------- */



/* --------------------------------
* Helpers
* -------------------------------- */
export function isProfileTrigger(text: string): boolean {
    const normalized = text.toLowerCase().trim();
    return PROFILE_TRIGGERS.some(trigger =>
        normalized.includes(trigger)
    );
}
