import { useState, useCallback } from "react";
import { PromptFormData } from "@/types";
import { VALIDATION, ERROR_MESSAGES } from "@/constants";
import { validatePrompt } from "@/utils/helpers";

export const usePromptForm = (initialData?: PromptFormData) => {
  const [formData, setFormData] = useState<PromptFormData>(initialData || {
    title: "",
    content: "",
    description: "",
    tags: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = useCallback((field: keyof PromptFormData, value: string) => {
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
  }, []);

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

  const validateForm = () => {
    const validation = validatePrompt(formData);

    if (!validation.isValid) {
      const fieldErrors: { [key: string]: string } = {};
      validation.errors.forEach((error) => {
        if (error.includes("Title")) fieldErrors.title = error;
        if (error.includes("Content")) fieldErrors.content = error;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const setError = (field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = () => setErrors({});

  const hasErrors = Object.entries(errors).some(
    ([key, value]) => key !== "submit" && !!value
  );
  
  const isFormValid = !!(
    formData.title.trim() &&
    formData.content.trim() &&
    !hasErrors
  );

  return {
    formData,
    setFormData,
    errors,
    handleInputChange,
    validateForm,
    setError,
    clearErrors,
    isFormValid,
    hasErrors,
  };
};
