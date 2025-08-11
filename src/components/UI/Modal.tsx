import React, { useEffect, useRef, useState } from 'react';
import { ModalProps } from '@/types';
import { X, Minus, Square, Move } from 'lucide-react';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isMinimized) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isMinimized, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = modalRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Keep modal within viewport bounds
      const maxX = window.innerWidth - (modalRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (modalRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-96',
    md: 'w-[32rem]',
    lg: 'w-[48rem]',
    xl: 'w-[64rem]',
    'half': 'w-[50vw]', // New half-screen width option
    'full': 'w-[90vw]', // Full width option for future use
  };

  // Position style - center by default or use dragged position
  const positionStyle = position.x === 0 && position.y === 0
    ? {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    : {
        top: position.y,
        left: position.x,
      };

  // If minimized, show a small bar at the bottom
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg border border-gray-300 p-3 flex items-center space-x-3"
        style={{ minWidth: '250px' }}
      >
        <span className="text-sm font-medium text-gray-700 flex-1 truncate">{title}</span>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Restore"
        >
          <Square className="w-4 h-4 text-gray-500" />
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Close"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={modalRef}
      className={`fixed z-50 ${sizeClasses[size]} bg-white rounded-xl shadow-2xl border border-gray-300 ${
        isDragging ? 'cursor-move select-none' : ''
      }`}
      style={{
        ...positionStyle,
        maxHeight: '90vh',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <Move className="w-4 h-4 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 select-none">
            {title}
          </h2>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title="Minimize"
          >
            <Minus className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
