import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Set initial state using matchMedia
    setIsMobile(mql.matches);

    // Add event listener with fallback for older Safari
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
    } else if (mql.addListener) {
      // Fallback for older Safari
      mql.addListener(onChange);
    }

    return () => {
      // Remove event listener with fallback for older Safari
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange);
      } else if (mql.removeListener) {
        // Fallback for older Safari
        mql.removeListener(onChange);
      }
    };
  }, []);

  return !!isMobile;
}
