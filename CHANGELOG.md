# Changelog

All notable changes to the Promptrium project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
