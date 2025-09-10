import React from "react";
import { PromptCardProps } from "@/types";
import { PromptCardGrid } from "./components/PromptCardGrid";
import { PromptCardList } from "./components/PromptCardList";

const PromptCardGridWithKey = React.forwardRef<HTMLDivElement, PromptCardProps>((props, ref) => {
  return <PromptCardGrid key={`grid-${props.prompt.id}`} {...props} />;
});
PromptCardGridWithKey.displayName = "PromptCardGridWithKey";

const PromptCardListWithKey = React.forwardRef<HTMLDivElement, PromptCardProps>((props, ref) => {
  return <PromptCardList key={`list-${props.prompt.id}`} {...props} />;
});
PromptCardListWithKey.displayName = "PromptCardListWithKey";

// Main PromptCard Component
const PromptCard: React.FC<PromptCardProps> = ({ prompt, viewMode, layoutDensity, onEdit, onDelete, onCopy, onToggleFavorite }) => {
  if (viewMode === "list") {
    return (
      <PromptCardListWithKey
        prompt={prompt}
        viewMode={viewMode}
        layoutDensity={layoutDensity}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <PromptCardGridWithKey
      prompt={prompt}
      viewMode={viewMode}
      layoutDensity={layoutDensity}
      onEdit={onEdit}
      onDelete={onDelete}
      onCopy={onCopy}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

PromptCard.displayName = "PromptCard";

export default PromptCard;
