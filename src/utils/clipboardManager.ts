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
    this.resetCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('Reset callback error:', error);
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
      console.warn('Clipboard operation failed:', error);
      return false;
    } finally {
      // Clear active operation if it's still this one
      if (this.activeOperation === operation) {
        this.activeOperation = null;
      }
    }
  }

  private async performCopy(text: string, operationId: number): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Check if operation was cancelled before starting
        if (this.operationId !== operationId) {
          return false;
        }
        
        await navigator.clipboard.writeText(text);
        
        // Check again after async operation
        if (this.operationId !== operationId) {
          return false;
        }
        
        return true;
      } else {
        // Fallback method
        return this.fallbackCopy(text, operationId);
      }
    } catch (error) {
      console.warn('Copy operation failed:', error);
      return false;
    }
  }

  private fallbackCopy(text: string, operationId: number): boolean {
    try {
      // Check if operation was cancelled
      if (this.operationId !== operationId) {
        return false;
      }
      
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Check if operation is still valid after sync operation
      return this.operationId === operationId ? success : false;
    } catch (error) {
      console.warn('Fallback copy failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const clipboardManager = new ClipboardManager();
