import { useState } from 'react';
import { copyToClipboard } from '../utils/helpers';

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export function useClipboard(resetDelay: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string): Promise<boolean> => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    }
    return success;
  };

  const reset = () => setCopied(false);

  return { copied, copy, reset };
}
