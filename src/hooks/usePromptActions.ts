import { useCallback } from "react";
import { Prompt, PromptFormData } from "@/types";
import { useToast } from "@/components/ui/use-toast";

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
          description: "Prompt created successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create prompt. Please try again.",
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
          description: "Prompt updated successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update prompt. Please try again.",
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
          description: "Prompt deleted successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete prompt. Please try again.",
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
          description: "Failed to update favorite status.",
          variant: "destructive",
        });
      }
    },
    [toggleFavorite, toast]
  );

  const handleCopyPrompt = useCallback(
    (prompt: Prompt) => {
      try {
        incrementUsage(prompt.id);
        toast({
          title: "Success",
          description: "Prompt copied and usage count updated!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update usage count.",
          variant: "destructive",
        });
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
