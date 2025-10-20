import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Prompt } from "@/types";

interface PromptCardFavoriteProps {
  prompt: Prompt;
  onToggleFavorite: (prompt: Prompt) => void;
}

export const PromptCardFavorite: React.FC<PromptCardFavoriteProps> = ({
  prompt,
  onToggleFavorite,
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="default"
      onClick={() => onToggleFavorite(prompt)}
      className={`flex-shrink-0 p-2 hover:bg-gray-hover transition-colors duration-200 ${
        prompt.is_favorite
          ? "text-destructive hover:text-error-hover"
          : "hover:text-destructive"
      }`}
      aria-label={
        prompt.is_favorite ? "Remove from favorites" : "Add to favorites"
      }
      aria-pressed={prompt.is_favorite}
    >
      <Heart
        className={`w-6 h-6 ${prompt.is_favorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};
