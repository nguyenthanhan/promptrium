export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string;
  tags: string[];
  created_at: number;
  updated_at: number;
  usage_count: number;
  is_favorite: boolean;
}

export interface Settings {
  theme: "light" | "dark";
  view_mode: "grid" | "list";
  last_backup: number;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
}

export type ModalType =
  | "create"
  | "edit"
  | "delete"
  | "import"
  | "export"
  | null;
export type ViewMode = "grid" | "list";

export interface PromptFormData {
  title: string;
  content: string;
  description: string;
  tags: string[];
}

export interface PromptContextType {
  prompts: Prompt[];
  settings: Settings;
  filteredPrompts: Prompt[];
  selectedPrompt: Prompt | null;
  isLoading: boolean;

  addPrompt: (prompt: PromptFormData) => void;
  updatePrompt: (id: string, prompt: PromptFormData) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  incrementUsage: (id: string) => void;
  selectPrompt: (prompt: Prompt | null) => void;

  updateSettings: (settings: Partial<Settings>) => void;

  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setShowFavorites: (show: boolean) => void;
  setSortOptions: (sortBy: string, sortOrder: "asc" | "desc") => void;

  exportData: () => void;
  importData: (file: File) => Promise<void>;
  clearAllData: () => void;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export interface PromptCardProps {
  prompt: Prompt;
  viewMode: ViewMode;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  onCopy: (prompt: Prompt) => void;
  onToggleFavorite: (prompt: Prompt) => void;
}

export interface PromptFormProps {
  prompt?: Prompt;
  onSubmit: (data: PromptFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterPanelProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  showFavorites: boolean;
  onFavoritesChange: (show: boolean) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "half" | "full";
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number" | "textarea";
  rows?: number;
  className?: string;
}
