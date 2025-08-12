"use client";

import React, { useState, useEffect } from "react";
import { Toast as ToastType } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useToast();

  const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };
  const colorMap = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const Icon = iconMap[toast.type];

  return (
    <div
      className={`p-4 rounded-lg border shadow-lg ${
        colorMap[toast.type]
      } animate-in slide-in-from-right-full duration-300`}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-medium">{toast.title}</p>
          {toast.message && (
            <p className="text-sm mt-1 opacity-90">{toast.message}</p>
          )}
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="flex-shrink-0 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render toasts until mounted to prevent hydration mismatch
  if (!mounted || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toast;
