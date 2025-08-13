import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "skeleton";
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  text,
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center space-x-1", className)}
        role="status"
        aria-live="polite"
        aria-label={text || "Loading"}
      >
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
        </div>
        {text && (
          <span
            className={cn("text-muted-foreground ml-2", textSizeClasses[size])}
          >
            {text}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
    >
      <Loader2
        className={cn("animate-spin text-muted-foreground", sizeClasses[size])}
        aria-hidden="true"
      />
      {text && (
        <span
          className={cn("text-muted-foreground mt-2", textSizeClasses[size])}
        >
          {text}
        </span>
      )}
    </div>
  );
};

// Skeleton components for different content types
export const SkeletonCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn(
      "bg-background border border-border rounded-lg p-4",
      className
    )}
  >
    <div className="animate-pulse space-y-3">
      <div className="h-5 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-2/3"></div>
      <div className="flex space-x-2">
        <div className="h-6 bg-muted rounded w-16"></div>
        <div className="h-6 bg-muted rounded w-20"></div>
      </div>
    </div>
  </div>
);

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className,
}) => (
  <div className={cn("space-y-4", className)}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export default Loading;
