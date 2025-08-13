import { useState, useRef, useEffect } from "react";
import { copyToClipboard } from "@/utils/helpers";

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export function useClipboard(resetDelay: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      // Clear any existing timeout before setting a new one
      clear();
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    }
    return success;
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return clear;
  }, []);

  return { copied, copy, reset };
}
