import React from "react";
import { AlertCircle } from "lucide-react";
import { VALIDATION } from "@/constants";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "input" | "textarea";
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  type = "input",
  rows = 3,
  maxLength,
  showCharCount = false,
}) => {
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>
      <InputComponent
        id={id}
        type={type === "input" ? "text" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={type === "textarea" ? rows : undefined}
        className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          error ? "border-red-300 focus:ring-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        maxLength={maxLength}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      {showCharCount && maxLength && (
        <p className="text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
};

export const TitleField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}> = ({ value, onChange, error, disabled }) => (
  <FormField
    id="title"
    label="Title"
    value={value}
    onChange={onChange}
    placeholder="Enter prompt title..."
    error={error}
    disabled={disabled}
    required
    maxLength={VALIDATION.TITLE.MAX_LENGTH}
    showCharCount
  />
);

export const ContentField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}> = ({ value, onChange, error, disabled }) => (
  <FormField
    id="content"
    label="Content"
    value={value}
    onChange={onChange}
    placeholder="Enter your prompt content here..."
    error={error}
    disabled={disabled}
    required
    type="textarea"
    rows={8}
  />
);

export const DescriptionField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled }) => (
  <FormField
    id="description"
    label="Description"
    value={value}
    onChange={onChange}
    placeholder="Optional description of what this prompt does..."
    disabled={disabled}
    type="textarea"
    rows={3}
    maxLength={VALIDATION.DESCRIPTION.MAX_LENGTH}
    showCharCount
  />
);
