"use client";

import { useState, useRef, useEffect } from "react";
import { clipboardManager } from "@/utils/clipboardManager";

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export function useClipboard(resetDelay: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const mountedRef = useRef<boolean>(false);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const safeSetCopied = (value: boolean) => {
    if (mountedRef.current) {
      setCopied(value);
    }
  };

  const reset = () => {
    clear();
    safeSetCopied(false);
  };

  const copy = async (text: string): Promise<boolean> => {
    try {
      // Clear any existing timeout first
      clear();

      // Immediately set to false to ensure clean state
      safeSetCopied(false);

      // Use global clipboard manager to handle conflicts
      const success = await clipboardManager.copy(text);

      if (success) {
        safeSetCopied(true);
        timeoutRef.current = setTimeout(() => {
          safeSetCopied(false);
        }, resetDelay);
      } else {
        // Ensure we're not stuck in copied state on failure
        safeSetCopied(false);
      }

      return success;
    } catch (error) {
      // Handle any unexpected errors
      console.warn("useClipboard error:", error);
      safeSetCopied(false);
      return false;
    }
  };

  // Register global reset callback and cleanup timeout on unmount
  useEffect(() => {
    // Set mounted flag to true
    mountedRef.current = true;

    // Register callback to reset this component's state when any copy starts
    cleanupRef.current = clipboardManager.onNewOperation(() => {
      clear();
      safeSetCopied(false);
    });

    return () => {
      // Set mounted flag to false to prevent state updates
      mountedRef.current = false;
      clear();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return { copied, copy, reset };
}
