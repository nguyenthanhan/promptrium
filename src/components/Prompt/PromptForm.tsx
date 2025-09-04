import React, { useState, useEffect, useCallback } from "react";
import { PromptFormProps, PromptFormData } from "@/types";
import { validatePrompt } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { X, Plus, AlertCircle } from "lucide-react";
import { VALIDATION, ERROR_MESSAGES } from "@/constants";

const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PromptFormData>({
    title: "",
    content: "",
    description: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prompt) {
      setFormData({
        title: prompt.title,
        content: prompt.content,
        description: prompt.description,
        tags: [...prompt.tags],
      });
    }
  }, [prompt]);

  const validateField = useCallback(
    (field: keyof PromptFormData, value: string) => {
      const fieldErrors: { [key: string]: string } = {};

      if (field === "title") {
        if (!value.trim()) {
          fieldErrors.title = ERROR_MESSAGES.VALIDATION.TITLE_REQUIRED;
        } else if (value.trim().length < VALIDATION.TITLE.MIN_LENGTH) {
          fieldErrors.title = ERROR_MESSAGES.VALIDATION.TITLE_TOO_SHORT;
        } else if (value.trim().length > VALIDATION.TITLE.MAX_LENGTH) {
          fieldErrors.title = ERROR_MESSAGES.VALIDATION.TITLE_TOO_LONG;
        }
      }

      if (field === "content") {
        if (!value.trim()) {
          fieldErrors.content = ERROR_MESSAGES.VALIDATION.CONTENT_REQUIRED;
        } else if (value.trim().length < VALIDATION.CONTENT.MIN_LENGTH) {
          fieldErrors.content = ERROR_MESSAGES.VALIDATION.CONTENT_TOO_SHORT;
        }
      }

      return fieldErrors;
    },
    []
  );

  const handleInputChange = (field: keyof PromptFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error and submit error when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };

      // Clear the specific field error
      if (newErrors[field]) {
        newErrors[field] = "";
      }

      // Clear submit error to allow resubmission
      if (newErrors.submit) {
        newErrors.submit = "";
      }

      return newErrors;
    });

    // Real-time validation for title and content
    if (field === "title" || field === "content") {
      const fieldErrors = validateField(field, value);
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleAddTag = useCallback(() => {
    const tag = newTag.trim();
    if (!tag) return;

    if (tag.length > VALIDATION.TAGS.MAX_LENGTH) {
      setErrors((prev) => ({
        ...prev,
        tags: ERROR_MESSAGES.VALIDATION.TAGS_TOO_LONG,
      }));
      return;
    }

    if (formData.tags.length >= VALIDATION.TAGS.MAX_COUNT) {
      setErrors((prev) => ({
        ...prev,
        tags: ERROR_MESSAGES.VALIDATION.TAGS_TOO_MANY,
      }));
      return;
    }

    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag("");
      setErrors((prev) => ({ ...prev, tags: "" }));
    }
  }, [newTag, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const validation = validatePrompt(formData);

      if (!validation.isValid) {
        const fieldErrors: { [key: string]: string } = {};
        validation.errors.forEach((error) => {
          if (error.includes("Title")) fieldErrors.title = error;
          if (error.includes("Content")) fieldErrors.content = error;
        });
        setErrors(fieldErrors);
        return;
      }

      setErrors({});
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to save prompt. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.entries(errors).some(
    ([key, value]) => key !== "submit" && !!value
  );
  const isFormValid = !!(
    formData.title.trim() &&
    formData.content.trim() &&
    !hasErrors
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6"
      noValidate
    >
      {/* Title Field */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter prompt title..."
          className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.title
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300"
          }`}
          disabled={isLoading || isSubmitting}
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={!!errors.title}
          maxLength={VALIDATION.TITLE.MAX_LENGTH}
        />
        {errors.title && (
          <p
            id="title-error"
            className="text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.title}
          </p>
        )}
        <p className="text-xs text-gray-500">
          {formData.title.length}/{VALIDATION.TITLE.MAX_LENGTH} characters
        </p>
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Enter your prompt content here..."
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.content
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300"
          }`}
          disabled={isLoading || isSubmitting}
          aria-describedby={errors.content ? "content-error" : undefined}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <p
            id="content-error"
            className="text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.content}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Optional description of what this prompt does..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          disabled={isLoading || isSubmitting}
          maxLength={VALIDATION.DESCRIPTION.MAX_LENGTH}
        />
        <p className="text-xs text-gray-500">
          {formData.description.length}/{VALIDATION.DESCRIPTION.MAX_LENGTH}{" "}
          characters
        </p>
      </div>

      {/* Tags Field */}
      <div className="space-y-2">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags
        </label>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  disabled={isLoading || isSubmitting}
                  aria-label={`Remove tag: ${tag}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <input
            id="tags"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a tag..."
            className={`flex-1 px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.tags
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300"
            }`}
            disabled={isLoading || isSubmitting}
            aria-describedby={errors.tags ? "tags-error" : "tags-help"}
            maxLength={VALIDATION.TAGS.MAX_LENGTH}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddTag}
            disabled={!newTag.trim() || isLoading || isSubmitting}
            aria-label="Add tag"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {errors.tags && (
          <p id="tags-error" className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.tags}
          </p>
        )}

        <p id="tags-help" className="text-xs text-gray-500">
          Press Enter or comma to add a tag. Click the X to remove a tag.
          Maximum {VALIDATION.TAGS.MAX_COUNT} tags.
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading || isSubmitting}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid || isLoading || isSubmitting}
          className="w-full sm:w-auto sm:min-w-[120px]"
        >
          {isSubmitting ? (
            <Loading size="sm" variant="spinner" />
          ) : prompt ? (
            "Update Prompt"
          ) : (
            "Create Prompt"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PromptForm;
