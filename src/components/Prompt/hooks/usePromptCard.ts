import { useClipboard } from "@/hooks/useClipboard";
import { Prompt, LayoutDensity } from "@/types";

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

  const getPadding = (layoutDensity?: LayoutDensity) => {
    switch (layoutDensity) {
      case "compact":
        return "p-4";
      case "comfortable":
        return "p-6";
      case "expanded":
        return "p-8";
      default:
        return "p-6";
    }
  };

  const getSpacing = (layoutDensity?: LayoutDensity) => {
    switch (layoutDensity) {
      case "compact":
        return "mb-3";
      case "comfortable":
        return "mb-4";
      case "expanded":
        return "mb-6";
      default:
        return "mb-4";
    }
  };

  return {
    copied,
    handleCopy,
    getPadding,
    getSpacing,
  };
};
