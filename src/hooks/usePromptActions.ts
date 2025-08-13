import { useCallback } from "react";
import { Prompt, PromptFormData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/constants";

interface UsePromptActionsProps {
  addPrompt: (prompt: PromptFormData) => void;
  updatePrompt: (id: string, prompt: PromptFormData) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  incrementUsage: (id: string) => void;
}

export const usePromptActions = ({
  addPrompt,
  updatePrompt,
  deletePrompt,
  toggleFavorite,
  incrementUsage,
}: UsePromptActionsProps) => {
  const { toast } = useToast();

  const handleCreatePrompt = useCallback(
    (formData: PromptFormData) => {
      try {
        addPrompt(formData);
        toast({
          title: "Success",
          description: SUCCESS_MESSAGES.PROMPT_CREATED,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: ERROR_MESSAGES.OPERATIONS.CREATE_FAILED,
          variant: "destructive",
        });
      }
    },
    [addPrompt, toast]
  );

  const handleUpdatePrompt = useCallback(
    (id: string, formData: PromptFormData) => {
      try {
        updatePrompt(id, formData);
        toast({
          title: "Success",
          description: SUCCESS_MESSAGES.PROMPT_UPDATED,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: ERROR_MESSAGES.OPERATIONS.UPDATE_FAILED,
          variant: "destructive",
        });
      }
    },
    [updatePrompt, toast]
  );

  const handleDeletePrompt = useCallback(
    (id: string) => {
      try {
        deletePrompt(id);
        toast({
          title: "Success",
          description: SUCCESS_MESSAGES.PROMPT_DELETED,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: ERROR_MESSAGES.OPERATIONS.DELETE_FAILED,
          variant: "destructive",
        });
      }
    },
    [deletePrompt, toast]
  );

  const handleToggleFavorite = useCallback(
    (id: string) => {
      try {
        toggleFavorite(id);
      } catch (error) {
        toast({
          title: "Error",
          description: ERROR_MESSAGES.OPERATIONS.FAVORITE_STATUS_UPDATE_FAILED,
          variant: "destructive",
        });
      }
    },
    [toggleFavorite, toast]
  );

  const handleCopyPrompt = useCallback(
    async (prompt: Prompt) => {
      try {
        // Copy prompt content to clipboard
        await navigator.clipboard.writeText(prompt.content);

        // Increment usage count
        incrementUsage(prompt.id);

        toast({
          title: "Success",
          description: SUCCESS_MESSAGES.PROMPT_COPIED,
        });
      } catch (error) {
        console.error("Failed to copy prompt:", error);

        // Still try to increment usage count even if clipboard fails
        try {
          incrementUsage(prompt.id);
          toast({
            title: "Warning",
            description:
              "Usage count updated, but failed to copy to clipboard.",
            variant: "destructive",
          });
        } catch (usageError) {
          console.error("Failed to update usage count:", usageError);
          toast({
            title: "Error",
            description: ERROR_MESSAGES.OPERATIONS.USAGE_COUNT_UPDATE_FAILED,
            variant: "destructive",
          });
        }
      }
    },
    [incrementUsage, toast]
  );

  return {
    handleCreatePrompt,
    handleUpdatePrompt,
    handleDeletePrompt,
    handleToggleFavorite,
    handleCopyPrompt,
  };
};
