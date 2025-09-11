// Global clipboard manager to handle multiple copy operations
class ClipboardManager {
  private activeOperation: Promise<boolean> | null = null;
  private operationId = 0;
  private resetCallbacks: Set<() => void> = new Set();

  // Register a callback to be called when a new copy operation starts
  onNewOperation(callback: () => void): () => void {
    this.resetCallbacks.add(callback);
    // Return cleanup function
    return () => {
      this.resetCallbacks.delete(callback);
    };
  }

  async copy(text: string): Promise<boolean> {
    // Notify all components that a new operation is starting
    this.resetCallbacks.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.warn("Reset callback error:", error);
      }
    });

    // Cancel any existing operation
    this.activeOperation = null;

    // Create unique operation ID
    const currentOpId = ++this.operationId;

    // Create the copy operation
    const operation = this.performCopy(text, currentOpId);
    this.activeOperation = operation;

    try {
      const result = await operation;

      // Only return result if this operation is still active
      if (this.operationId === currentOpId) {
        return result;
      }

      // Operation was superseded, return false
      return false;
    } catch (error) {
      console.warn("Clipboard operation failed:", error);
      return false;
    } finally {
      // Clear active operation if it's still this one
      if (this.activeOperation === operation) {
        this.activeOperation = null;
      }
    }
  }

  private async performCopy(
    text: string,
    operationId: number
  ): Promise<boolean> {
    try {
      // Check for SSR environment - ensure navigator and window are available
      if (
        typeof navigator !== "undefined" &&
        typeof window !== "undefined" &&
        navigator.clipboard &&
        window.isSecureContext
      ) {
        // Check if operation was cancelled before starting
        if (this.operationId !== operationId) {
          return false;
        }

        // Create a cancellation token that can be checked during the async operation
        const isCancelled = () => this.operationId !== operationId;

        // Use a race between the clipboard operation and a cancellation check
        const clipboardPromise = navigator.clipboard.writeText(text);
        const cancellationPromise = new Promise<never>((_, reject) => {
          const checkCancellation = () => {
            if (isCancelled()) {
              reject(new Error("Operation cancelled"));
            } else {
              setTimeout(checkCancellation, 10); // Check every 10ms
            }
          };
          checkCancellation();
        });

        try {
          await Promise.race([clipboardPromise, cancellationPromise]);
        } catch (error) {
          // If it's a cancellation error, don't treat it as a real error
          if (
            error instanceof Error &&
            error.message === "Operation cancelled"
          ) {
            return false;
          }
          throw error;
        }

        // Final check after async operation completes
        if (this.operationId !== operationId) {
          return false;
        }

        return true;
      } else {
        // Fallback method for SSR or when clipboard API is not available
        return this.fallbackCopy(text, operationId);
      }
    } catch (error) {
      console.warn("Copy operation failed:", error);
      return false;
    }
  }

  private fallbackCopy(text: string, operationId: number): boolean {
    // Check for SSR environment - ensure document is available
    if (typeof document === "undefined" || !document.body) {
      return false;
    }

    // Check if operation was cancelled
    if (this.operationId !== operationId) {
      return false;
    }

    let textArea: HTMLTextAreaElement | null = null;
    let previouslyFocusedElement: Element | null = null;
    let previousSelection: { start: number; end: number } | null = null;

    try {
      // Capture current focus and selection for restoration
      previouslyFocusedElement = document.activeElement;

      // Capture selection if the focused element supports it
      if (
        previouslyFocusedElement &&
        "selectionStart" in previouslyFocusedElement &&
        "selectionEnd" in previouslyFocusedElement
      ) {
        const element = previouslyFocusedElement as
          | HTMLInputElement
          | HTMLTextAreaElement;
        previousSelection = {
          start: element.selectionStart || 0,
          end: element.selectionEnd || 0,
        };
      }

      // Create textarea with accessibility-friendly attributes
      textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "true");
      textArea.setAttribute("tabindex", "-1");
      textArea.setAttribute("aria-hidden", "true");

      // Position offscreen without causing focus jump
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      textArea.style.zIndex = "-1000";

      // Append to DOM
      document.body.appendChild(textArea);

      // Check if operation was cancelled after DOM manipulation
      if (this.operationId !== operationId) {
        return false;
      }

      // Select text without stealing focus
      textArea.focus();
      textArea.select();

      // Perform copy operation
      const success = document.execCommand("copy");

      // Check if operation is still valid after sync operation
      if (this.operationId !== operationId) {
        return false;
      }

      return success;
    } catch (error) {
      console.warn("Fallback copy failed:", error);
      return false;
    } finally {
      // Always clean up the textarea
      if (textArea && document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }

      // Restore previous focus and selection
      if (previouslyFocusedElement && "focus" in previouslyFocusedElement) {
        try {
          (previouslyFocusedElement as HTMLElement).focus();

          // Restore selection if it was captured
          if (
            previousSelection &&
            "setSelectionRange" in previouslyFocusedElement
          ) {
            const element = previouslyFocusedElement as
              | HTMLInputElement
              | HTMLTextAreaElement;
            element.setSelectionRange(
              previousSelection.start,
              previousSelection.end
            );
          }
        } catch (focusError) {
          // Silently handle focus restoration errors
          console.warn("Failed to restore focus:", focusError);
        }
      }
    }
  }
}

// Export singleton instance
export const clipboardManager = new ClipboardManager();
