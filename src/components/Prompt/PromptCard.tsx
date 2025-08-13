import React, { memo } from "react";
import { PromptCardProps } from "@/types";
import { useClipboard } from "@/hooks/useClipboard";
import { useToast } from "@/components/ui/use-toast";
import { formatDate, truncateText } from "@/utils/helpers";
import {
  Heart,
  Copy,
  Edit3,
  Trash2,
  Calendar,
  BarChart3,
  Tag,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Separate Grid View Component
const PromptCardGrid: React.FC<PromptCardProps> = memo(
  ({ prompt, onEdit, onDelete, onCopy, onToggleFavorite }) => {
    const { copy, copied } = useClipboard();
    const { toast } = useToast();

    const handleCopy = async () => {
      const success = await copy(prompt.content);
      if (success) {
        onCopy(prompt);
        toast({ title: "Copied to clipboard!" });
      } else {
        toast({ title: "Copy failed" });
      }
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {prompt.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(prompt)}
            className={`ml-2 flex-shrink-0 ${
              prompt.is_favorite ? "text-red-500" : ""
            }`}
            aria-label={
              prompt.is_favorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-4 h-4 ${prompt.is_favorite ? "fill-current" : ""}`}
            />
          </Button>
        </div>

        <div className="flex-1 mb-3">
          <p className="text-sm text-gray-600 mb-2">
            {truncateText(prompt.content, 150)}
          </p>
          {prompt.description && (
            <p className="text-xs text-gray-500">
              {truncateText(prompt.description, 80)}
            </p>
          )}
        </div>

        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {prompt.tags.slice(0, 2).map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span className="text-xs text-gray-500">
                +{prompt.tags.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(prompt.updated_at)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span>{prompt.usage_count}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleCopy}
            className={`flex-1 ${
              copied ? "bg-green-500 hover:bg-green-600" : ""
            }`}
            aria-label="Copy prompt content"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(prompt)}
            aria-label="Edit prompt"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(prompt)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete prompt"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }
);

PromptCardGrid.displayName = "PromptCardGrid";

// Separate List View Component
const PromptCardList: React.FC<PromptCardProps> = memo(
  ({ prompt, onEdit, onDelete, onCopy, onToggleFavorite }) => {
    const { copy, copied } = useClipboard();
    const { toast } = useToast();

    const handleCopy = async () => {
      const success = await copy(prompt.content);
      if (success) {
        onCopy(prompt);
        toast({ title: "Copied to clipboard!" });
      } else {
        toast({ title: "Copy failed" });
      }
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {prompt.title}
              </h3>
              {prompt.is_favorite && (
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3">
              {truncateText(prompt.content, 200)}
            </p>

            {prompt.description && (
              <p className="text-xs text-gray-500 mb-2">
                {truncateText(prompt.description, 100)}
              </p>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(prompt.updated_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>{prompt.usage_count} uses</span>
              </div>
            </div>

            {prompt.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {prompt.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {prompt.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{prompt.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(prompt)}
              className={prompt.is_favorite ? "text-red-500" : ""}
              aria-label={
                prompt.is_favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  prompt.is_favorite ? "fill-current" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={copied ? "text-green-500" : ""}
              aria-label="Copy prompt content"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(prompt)}
              aria-label="Edit prompt"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(prompt)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete prompt"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

PromptCardList.displayName = "PromptCardList";

// Main PromptCard Component
const PromptCard: React.FC<PromptCardProps> = memo(
  ({ prompt, viewMode, onEdit, onDelete, onCopy, onToggleFavorite }) => {
    if (viewMode === "list") {
      return (
        <PromptCardList
          prompt={prompt}
          viewMode={viewMode}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          onToggleFavorite={onToggleFavorite}
        />
      );
    }

    return (
      <PromptCardGrid
        prompt={prompt}
        viewMode={viewMode}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }
);

PromptCard.displayName = "PromptCard";

export default PromptCard;
