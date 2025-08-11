import { Prompt } from '../types';

export const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';  
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const searchPrompts = (prompts: Prompt[], query: string): Prompt[] => {
  if (!query.trim()) return prompts;
  const searchTerm = query.toLowerCase();
  return prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm) ||
    prompt.content.toLowerCase().includes(searchTerm) ||
    prompt.description.toLowerCase().includes(searchTerm) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getAllTags = (prompts: Prompt[]): string[] => {
  const tagSet = new Set<string>();
  prompts.forEach(prompt => {
    prompt.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const validatePrompt = (prompt: Partial<Prompt>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!prompt.title || prompt.title.trim().length === 0) errors.push('Title is required');
  if (!prompt.content || prompt.content.trim().length === 0) errors.push('Content is required');
  return { isValid: errors.length === 0, errors };
};

export const downloadFile = (content: string, filename: string, contentType: string = 'application/json'): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
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
  } catch (error) {
    return false;
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
