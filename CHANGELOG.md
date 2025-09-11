# Changelog

All notable changes to the Promptrium project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-11

### Added

- **Accessibility Improvements**: Enhanced keyboard navigation for tooltips
  - Added `tabIndex={0}` to non-focusable elements wrapped in TooltipTrigger
  - Added `title` attributes as non-JS fallbacks for tooltip content
  - Improved keyboard accessibility for prompt cards in list view

### Fixed

- **Type Safety**: Updated PromptForm onSubmit type to support async handlers
  - Changed `onSubmit: (data: PromptFormData) => void` to `onSubmit: (data: PromptFormData) => Promise<void> | void`
  - Enables proper typing for asynchronous form submission handlers

- **useLocalStorage Hook**: Enhanced safety and reliability
  - Added `isPlainObject` helper to detect plain objects safely
  - Fixed unsafe spreading of parsed JSON that could cause runtime errors
  - Only merge objects when both stored and initial values are plain objects
  - Use parsed value directly for primitives, arrays, and other non-object types
  - Set mounted flag only after load completes to prevent extra renders
  - Updated `initialValueRef` when key changes to maintain consistency

### Improved

- **Error Handling**: Better error handling for localStorage operations
- **Type Safety**: More robust type checking throughout the application
- **Performance**: Reduced unnecessary re-renders in useLocalStorage hook

## [0.1.2] - 2025-09-04

### Fixed

- **Modal Responsiveness**: Fixed Create New Prompt modal sizing for better mobile experience
  - Responsive width: 95% on mobile, scaling up to 50% on large screens
  - Added scroll support with `max-h-[90vh] overflow-y-auto`
  - Reduced form padding on mobile devices for better space utilization
  - Improved button layout: stacked on mobile, horizontal on desktop

### Improved

- **Modal UX**: Enhanced modal header and close button behavior

  - Sticky header positioning - "Create New Prompt" title always visible
  - Close button (X) always accessible and visible
  - Better visual separation with header border
  - Improved scroll behavior with content-only scrolling

- **Mobile Experience**: Optimized form layout for small screens
  - Reduced textarea height on mobile (4 rows vs 6 rows)
  - Full-width buttons on mobile for easier interaction
  - Better spacing and padding for touch interfaces

---

_This changelog will be updated with each new release to document all changes, improvements, and new features._
