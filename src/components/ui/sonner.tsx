"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { cn } from "@/utils/helpers";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({
  className,
  toastOptions,
  theme: propsTheme,
  ...props
}: ToasterProps) => {
  const { theme: defaultTheme = "system" } = useTheme();

  // Merge theme: props theme takes precedence over default theme
  const finalTheme = propsTheme ?? defaultTheme;

  // Merge className: combine default with caller className
  const mergedClassName = cn("toaster group", className);

  // Merge toastOptions with deep merging of classNames
  const mergedToastOptions = {
    ...toastOptions,
    classNames: {
      toast: cn(
        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        toastOptions?.classNames?.toast
      ),
      description: cn(
        "group-[.toast]:text-muted-foreground",
        toastOptions?.classNames?.description
      ),
      actionButton: cn(
        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        toastOptions?.classNames?.actionButton
      ),
      cancelButton: cn(
        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        toastOptions?.classNames?.cancelButton
      ),
    },
  };

  return (
    <Sonner
      theme={finalTheme as ToasterProps["theme"]}
      className={mergedClassName}
      toastOptions={mergedToastOptions}
      {...props}
    />
  );
};

export { Toaster };
