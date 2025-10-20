# Changelog

All notable changes to the Promptrium project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-10-20

### Changed

- Migrated to TailwindCSS v4 with CSS-first configuration
- Moved all theme configuration from `tailwind.config.ts` to `globals.css`
- Centralized all hard-coded colors (red, gray, blue) into CSS variables
- Theme toggle simplified to manual light/dark selection only

### Added

- CSS variables for error, gray, and blue color shades
- Native CSS keyframes for all animations
- Theme-aware colors that adapt to dark/light mode

### Removed

- `tailwind.config.ts` file
- `tailwindcss-animate` dependency
- System theme detection support

### Fixed

- Dark/light mode not applying correctly
- Tag remove button hover feedback
- Theme toggle form submission behavior

---

_This changelog will be updated with each new release to document all changes, improvements, and new features._
