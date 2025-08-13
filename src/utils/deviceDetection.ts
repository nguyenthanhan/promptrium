// Module-level constant for mobile user agent detection
const MOBILE_UA_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Hardened, explicit UA-based mobile detection helper
 *
 * Detection priority:
 * 1. Server-side safety check (returns false)
 * 2. Modern navigator.userAgentData.mobile (if available)
 * 3. Fallback to regex testing against navigator.userAgent
 *
 * @returns boolean - true if mobile device detected via UA, false otherwise
 */
export const isMobileUA = (): boolean => {
  // Guard for server-side rendering
  if (typeof window === "undefined") return false;

  // Primary: Use modern navigator.userAgentData.mobile if available
  // Type assertion for newer API that may not be in current DOM types
  const userAgentData = (
    navigator as Navigator & { userAgentData?: { mobile?: boolean } }
  ).userAgentData;
  if (userAgentData?.mobile !== undefined) {
    return userAgentData.mobile;
  }

  // Fallback: Test against mobile user agent regex
  return MOBILE_UA_REGEX.test(navigator.userAgent);
};
