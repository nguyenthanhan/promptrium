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

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const reset = () => {
    clear();
    setCopied(false);
  };

  const copy = async (text: string): Promise<boolean> => {
    try {
      // Clear any existing timeout first
      clear();
      
      // Immediately set to false to ensure clean state
      setCopied(false);
      
      // Use global clipboard manager to handle conflicts
      const success = await clipboardManager.copy(text);
      
      if (success) {
        setCopied(true);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, resetDelay);
      } else {
        // Ensure we're not stuck in copied state on failure
        setCopied(false);
      }
      
      return success;
    } catch (error) {
      // Handle any unexpected errors
      console.warn('useClipboard error:', error);
      setCopied(false);
      return false;
    }
  };

  // Register global reset callback and cleanup timeout on unmount
  useEffect(() => {
    // Register callback to reset this component's state when any copy starts
    cleanupRef.current = clipboardManager.onNewOperation(() => {
      clear();
      setCopied(false);
    });
    
    return () => {
      clear();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return { copied, copy, reset };
}
