// Storage keys
export const STORAGE_KEYS = {
  PROMPTS: "promptrium_prompts",
  SETTINGS: "promptrium_settings",
} as const;

// Validation constants
export const VALIDATION = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  CONTENT: {
    MIN_LENGTH: 10,
  },
  DESCRIPTION: {
    MAX_LENGTH: 200,
  },
  TAGS: {
    MAX_COUNT: 10,
    MAX_LENGTH: 20,
  },
} as const;

// UI constants
export const UI = {
  DEBOUNCE_DELAY: 300,
  COPY_RESET_DELAY: 2000,
  SKELETON_COUNT: 3,
} as const;

// Sort options
export const SORT_OPTIONS = [
  { key: "updated", label: "Last Updated" },
  { key: "created", label: "Created Date" },
  { key: "name", label: "Name" },
  { key: "usage", label: "Usage Count" },
] as const;

// Export constants
export const EXPORT = {
  VERSION: "1.0.0",
  FILENAME_PREFIX: "promptrium-export-",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    TITLE_REQUIRED: "Title is required",
    TITLE_TOO_SHORT: `Title must be at least ${VALIDATION.TITLE.MIN_LENGTH} characters`,
    TITLE_TOO_LONG: `Title must be less than ${VALIDATION.TITLE.MAX_LENGTH} characters`,
    CONTENT_REQUIRED: "Content is required",
    CONTENT_TOO_SHORT: `Content must be at least ${VALIDATION.CONTENT.MIN_LENGTH} characters`,
    TAGS_TOO_LONG: `Tag must be less than ${VALIDATION.TAGS.MAX_LENGTH} characters`,
    TAGS_TOO_MANY: `Maximum ${VALIDATION.TAGS.MAX_COUNT} tags allowed`,
  },
  OPERATIONS: {
    CREATE_FAILED: "Failed to create prompt. Please try again.",
    UPDATE_FAILED: "Failed to update prompt. Please try again.",
    DELETE_FAILED: "Failed to delete prompt. Please try again.",
    COPY_FAILED: "Copy failed",
    IMPORT_FAILED: "Failed to import data. Please check the file format.",
    EXPORT_FAILED: "Failed to export data. Please try again.",
  },
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PROMPT_CREATED: "Prompt created successfully!",
  PROMPT_UPDATED: "Prompt updated successfully!",
  PROMPT_DELETED: "Prompt deleted successfully!",
  PROMPT_COPIED: "Copied to clipboard!",
  DATA_EXPORTED: "Data exported successfully!",
  DATA_IMPORTED: "Data imported successfully!",
  FAVORITE_UPDATED: "Favorite status updated!",
  USAGE_UPDATED: "Usage count updated!",
} as const;
