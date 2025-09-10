"use client";

import React from "react";
import { PromptCardProps } from "@/types";
import { truncateText } from "@/utils/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePromptCard } from "../hooks/usePromptCard";
import { PromptCardActions } from "./PromptCardActions";
import { PromptCardFavorite } from "./PromptCardFavorite";
import { PromptCardTags } from "./PromptCardTags";
import { PromptCardMetadata } from "./PromptCardMetadata";

export const PromptCardList: React.FC<PromptCardProps> = ({
  prompt,
  layoutDensity,
  onEdit,
  onDelete,
  onCopy,
  onToggleFavorite,
}) => {
  const { copied, handleCopy, getPadding } = usePromptCard({
    prompt,
    onCopy,
  });

  return (
    <TooltipProvider>
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 ${getPadding(layoutDensity)}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-3">
                    {prompt.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{prompt.title}</p>
                </TooltipContent>
              </Tooltip>
              <PromptCardFavorite
                prompt={prompt}
                onToggleFavorite={onToggleFavorite}
              />
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-gray-600 mb-3">
                  {truncateText(prompt.content, 200)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-md whitespace-pre-wrap">{prompt.content}</p>
              </TooltipContent>
            </Tooltip>

            {prompt.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-xs text-gray-500 mb-2">
                    {truncateText(prompt.description, 100)}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-md">{prompt.description}</p>
                </TooltipContent>
              </Tooltip>
            )}

            <PromptCardMetadata
              updatedAt={prompt.updated_at}
              usageCount={prompt.usage_count}
              variant="list"
            />

            <PromptCardTags tags={prompt.tags} maxTags={4} className="mt-3" />
          </div>

          <PromptCardActions
            prompt={prompt}
            copied={copied}
            onCopy={handleCopy}
            onEdit={onEdit}
            onDelete={onDelete}
            variant="list"
          />
        </div>
      </div>
    </TooltipProvider>
  );
};
