import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Edit3, Trash2, CheckCircle } from "lucide-react";
import { Prompt } from "@/types";

interface PromptCardActionsProps {
  prompt: Prompt;
  copied: boolean;
  onCopy: () => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  variant?: "grid" | "list";
}

export const PromptCardActions: React.FC<PromptCardActionsProps> = ({
  prompt,
  copied,
  onCopy,
  onEdit,
  onDelete,
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
        className={`flex-1 shadow-sm transition-all duration-200 ${
          copied
            ? "bg-blue-500 text-white cursor-not-allowed"
            : "hover:shadow-md"
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
};
