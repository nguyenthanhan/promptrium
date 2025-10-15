import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Edit3, Trash2, CheckCircle, Heart } from "lucide-react";
import { Prompt } from "@/types";

interface PromptCardActionsProps {
  prompt: Prompt;
  copied: boolean;
  onCopy: () => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  onToggleFavorite?: (prompt: Prompt) => void;
  variant?: "grid" | "list";
}

export const PromptCardActions: React.FC<PromptCardActionsProps> = ({
  prompt,
  copied,
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
  variant = "grid",
}) => {
  if (variant === "list") {
    return (
      <div className="flex items-center space-x-3 ml-6">
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={onCopy}
          disabled={copied}
          className={`p-2 shadow-sm transition-all duration-200 ${
            copied
              ? "text-blue-500 cursor-not-allowed opacity-75"
              : "hover:shadow-md"
          }`}
          aria-label={copied ? "Copied to clipboard" : "Copy prompt content"}
        >
          {copied ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={() => onEdit(prompt)}
          className="p-2 shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Edit prompt"
        >
          <Edit3 className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={() => onDelete(prompt)}
          className="p-2 text-red-500 hover:text-red-700 shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Delete prompt"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Button
        type="button"
        variant="default"
        size="default"
        onClick={onCopy}
        disabled={copied}
        className={`flex-1 border border-gray-200 !shadow-none hover:!shadow-none hover:bg-gray-100 transition-all duration-200 ${
          copied
            ? "bg-blue-500 text-white cursor-not-allowed"
            : ""
        }`}
        aria-label={copied ? "Copied to clipboard" : "Copy prompt content"}
      >
        {copied ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 mr-2" />
            Copy
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="default"
        onClick={() => onEdit(prompt)}
        className="w-10 h-10 p-2 border border-gray-200 hover:bg-gray-100 transition-all duration-200"
        aria-label="Edit prompt"
      >
        <Edit3 className="w-5 h-5" />
      </Button>
      {onToggleFavorite && (
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={() => onToggleFavorite(prompt)}
          className={`w-10 h-10 p-2 border border-gray-200 hover:bg-gray-100 transition-all duration-200 ${
            prompt.is_favorite ? "text-red-500" : "text-gray-400"
          }`}
          aria-label={prompt.is_favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${prompt.is_favorite ? "fill-current" : ""}`} />
        </Button>
      )}
      <Button
        type="button"
        variant="ghost"
        size="default"
        onClick={() => onDelete(prompt)}
        className="w-10 h-10 p-2 border border-gray-200 text-red-500 hover:text-red-700 hover:bg-gray-100 transition-all duration-200"
        aria-label="Delete prompt"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
};
