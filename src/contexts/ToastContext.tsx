"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Toast, ToastContextType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      if (!mounted) return; // Don't remove toasts until mounted

      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    [mounted]
  );

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      if (!mounted) return; // Don't add toasts until mounted

      const newToast: Toast = {
        ...toast,
        id: uuidv4(),
      };
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        removeToast(newToast.id);
      }, 5000);
    },
    [mounted, removeToast]
  );

  const clearToasts = useCallback(() => {
    if (!mounted) return; // Don't clear toasts until mounted

    setToasts([]);
  }, [mounted]);

  // Don't render toasts until mounted to prevent hydration mismatch
  const contextValue = {
    toasts: mounted ? toasts : [],
    addToast,
    removeToast,
    clearToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
