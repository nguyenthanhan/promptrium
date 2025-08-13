import { Prompt } from "@/types";
import { VALIDATION, ERROR_MESSAGES } from "@/constants";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const searchPrompts = (prompts: Prompt[], query: string): Prompt[] => {
  if (!query.trim()) return prompts;
  const searchTerm = query.toLowerCase();
  return prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchTerm) ||
      prompt.content.toLowerCase().includes(searchTerm) ||
      prompt.description.toLowerCase().includes(searchTerm) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
};

export const getAllTags = (prompts: Prompt[]): string[] => {
  const tagSet = new Set<string>();
  prompts.forEach((prompt) => {
    prompt.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const validatePrompt = (
  prompt: Partial<Prompt>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Normalize and validate title
  const title = prompt.title?.trim() || "";
  if (!title) {
    errors.push(ERROR_MESSAGES.VALIDATION.TITLE_REQUIRED);
  } else if (title.length < VALIDATION.TITLE.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.VALIDATION.TITLE_TOO_SHORT);
  } else if (title.length > VALIDATION.TITLE.MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.VALIDATION.TITLE_TOO_LONG);
  }

  // Normalize and validate content
  const content = prompt.content?.trim() || "";
  if (!content) {
    errors.push(ERROR_MESSAGES.VALIDATION.CONTENT_REQUIRED);
  } else if (content.length < VALIDATION.CONTENT.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.VALIDATION.CONTENT_TOO_SHORT);
  }

  // Normalize and validate description
  const description = prompt.description?.trim() || "";
  if (description && description.length > VALIDATION.DESCRIPTION.MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG);
  }

  // Normalize and validate tags
  const tags = (prompt.tags || [])
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Check tag count
  if (tags.length > VALIDATION.TAGS.MAX_COUNT) {
    errors.push(ERROR_MESSAGES.VALIDATION.TAGS_TOO_MANY);
  }

  // Check individual tag lengths
  for (const tag of tags) {
    if (tag.length > VALIDATION.TAGS.MAX_LENGTH) {
      errors.push(ERROR_MESSAGES.VALIDATION.TAGS_TOO_LONG);
      break; // Only show this error once
    }
  }

  return { isValid: errors.length === 0, errors };
};

export const downloadFile = (
  content: string,
  filename: string,
  contentType: string = "application/json"
): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const debounceString = (
  func: (value: string) => void,
  wait: number
): ((value: string) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
};

export const deduplicateTags = (tags: string[]): string[] => {
  return Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean)));
};
