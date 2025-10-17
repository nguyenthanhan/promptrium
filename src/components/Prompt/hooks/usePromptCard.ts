import { useClipboard } from "@/hooks/useClipboard";
import { Prompt } from "@/types";

interface UsePromptCardProps {
  prompt: Prompt;
  onCopy: (prompt: Prompt) => void;
}

export const usePromptCard = ({ prompt, onCopy }: UsePromptCardProps) => {
  const { copy, copied } = useClipboard();

  const handleCopy = async () => {
    // Prevent copying if already copied
    if (copied) {
      return;
    }

    const success = await copy(prompt.content);
    if (success) {
      onCopy(prompt);
    }
  };

  return {
    copied,
    handleCopy,
  };
};
