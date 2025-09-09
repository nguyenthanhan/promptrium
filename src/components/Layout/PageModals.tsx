import React, { useRef, useState } from "react";
import PromptForm, { PromptFormRef } from "@/components/Prompt/PromptForm";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Prompt, ModalType, PromptFormData } from "@/types";
import { Trash2 } from "lucide-react";

interface PageModalsProps {
  modalType: ModalType;
  selectedPrompt: Prompt | null;
  onCloseModal: () => void;
  onSubmitPrompt: (formData: PromptFormData) => void;
  onDeletePrompt: () => void;
}

export const PageModals: React.FC<PageModalsProps> = ({
  modalType,
  selectedPrompt,
  onCloseModal,
  onSubmitPrompt,
  onDeletePrompt,
}) => {
  const formRef = useRef<PromptFormRef>(null);
  const [formState, setFormState] = useState<{
    isFormValid: boolean;
    isSubmitting: boolean;
    submitError?: string;
  }>({
    isFormValid: false,
    isSubmitting: false,
    submitError: undefined,
  });

  const handleFormSubmit = () => {
    if (formRef.current && formState.isFormValid && !formState.isSubmitting) {
      formRef.current.submit();
    }
  };
  return (
    <>
      {/* Create/Edit Dialog */}
      <Dialog
        open={modalType === "create" || modalType === "edit"}
        onOpenChange={(open) => {
          if (!open) onCloseModal();
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[65vw] max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <DialogTitle>
                {modalType === "create" ? "Create New Prompt" : "Edit Prompt"}
              </DialogTitle>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCloseModal}
                  disabled={formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleFormSubmit}
                  disabled={!formState.isFormValid || formState.isSubmitting}
                  className="min-w-[100px]"
                >
                  {formState.isSubmitting ? (
                    <div className="flex items-center">
                      <Loading size="sm" variant="spinner" />
                      <span className="ml-1">
                        {selectedPrompt ? "Updating..." : "Creating..."}
                      </span>
                    </div>
                  ) : (
                    selectedPrompt ? "Update" : "Create"
                  )}
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <PromptForm
              ref={formRef}
              prompt={selectedPrompt || undefined}
              onSubmit={onSubmitPrompt}
              onFormStateChange={setFormState}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={modalType === "delete"}
        onOpenChange={(open) => {
          if (!open) onCloseModal();
        }}
      >
        <DialogContent className="sm:max-w-lg md:max-w-xl">
          <DialogHeader>
            <DialogTitle>Delete Prompt</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Delete &ldquo;{selectedPrompt?.title}&rdquo;
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDeletePrompt}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
