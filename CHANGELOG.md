# Changelog

All notable changes to the Promptrium project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-10-17

### Changed

- Simplified to grid-only layout (removed dual view mode)
- Streamlined sorting to "Last Updated" and "Created Date" only
- Removed unused tag filtering from PageHeader

### Added

- Empty state message for tags in FilterSidebar
- CSS variables for scrollbar theming
- Accessibility improvements (aria-labels)

### Fixed

- TagsDropdown Apply button now properly closes dropdown
- TagsInput scroll behavior (replaced setTimeout with useEffect)
- TagsInput validation UX (preserves input on errors)

### Removed

- 8+ unused component files (PromptCardGrid, PromptCardList, FilterPanel, TagsPanel, etc.)
- Unused `viewMode` and `layoutDensity` props
- Unused hook functions and type definitions

---

_This changelog will be updated with each new release to document all changes, improvements, and new features._
