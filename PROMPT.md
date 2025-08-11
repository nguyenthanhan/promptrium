# PRD: Promptrium - Next.js Implementation Guide

## 1. Product Overview

### App Name

**Promptrium** - Your personal AI prompt repository

### Purpose

Offline web application to manage, store and reuse AI prompts efficiently using Next.js with LocalStorage persistence.

### Target User

Developers and AI Engineers who need to manage multiple prompt templates for AI Agents.

### Key Constraints

- **Offline Only**: No backend, no authentication, no database
- **Local Storage**: Data persisted as JSON in browser LocalStorage
- **Framework**: Next.js 14+ with App Router
- **No External Dependencies**: Minimal third-party libraries

## 2. Core Features

### 2.1 CRUD Operations

- **Create**: Add new prompt with title, content, tags, description
- **Read**: View prompt list, search, filter prompts
- **Update**: Edit existing prompts
- **Delete**: Remove unwanted prompts

### 2.2 Copy & Paste Features

- One-click copy prompt content to clipboard
- Copy with metadata option (title + content + tags)
- Visual feedback for copy actions

### 2.3 Organization & Search

- Tag-based categorization
- Real-time search in content and titles
- Filter by tags and favorites
- Sort by name, date, usage count

## 3. Technical Architecture

### 3.1 Data Model

```javascript
// LocalStorage structure
{
  prompts: [
    {
      id: string, // UUID
      title: string,
      content: string, // prompt text
      description: string,
      tags: string[],
      created_at: timestamp,
      updated_at: timestamp,
      usage_count: number,
      is_favorite: boolean
    }
  ],
  settings: {
    theme: 'light' | 'dark',
    view_mode: 'grid' | 'list',
    last_backup: timestamp
  }
}
```

### 3.2 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **React**: React 18+ (included with Next.js)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React useState + useContext
- **Storage**: LocalStorage API (client-side only)
- **UUID**: uuidv4() from 'uuid'
- **Copy API**: navigator.clipboard

## 4. Functional Requirements

### 4.1 Pages/Components Structure

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── Prompt/
│   │   ├── PromptList.jsx
│   │   ├── PromptCard.jsx
│   │   ├── PromptForm.jsx
│   │   └── PromptDetail.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Toast.jsx
│   └── Search/
│       ├── SearchBar.jsx
│       └── FilterPanel.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── usePrompts.js
│   └── useClipboard.js
├── utils/
│   ├── storage.js
│   └── helpers.js
└── styles/ (if needed for additional CSS)
    └── components.css
```

### 4.2 Core Functionality

#### Storage Operations

- Load prompts from LocalStorage on app start
- Auto-save changes to LocalStorage
- Export all data as JSON file
- Import prompts from JSON file

#### UI Components

- Responsive grid/list toggle view
- Real-time search with highlighting
- Tag input with autocomplete
- Modal dialogs for create/edit
- Toast notifications for actions

#### User Interactions

- Click to copy prompt content
- Double-click to edit prompt title
- Drag to reorder (optional)
- Keyboard shortcuts (Ctrl+N, Ctrl+F, etc.)

## 5. User Stories & Acceptance Criteria

### Epic 1: Basic CRUD Operations

**US1.1**: As a user, I want to create a new prompt

- [ ] Click "New Prompt" button opens modal form
- [ ] Form has required fields: title, content
- [ ] Form has optional fields: description, tags
- [ ] Save button validates and stores prompt
- [ ] New prompt appears in list immediately

**US1.2**: As a user, I want to view all my prompts

- [ ] Main page shows all prompts in grid/list view
- [ ] Each prompt shows title, preview, tags, date
- [ ] Toggle between grid and list views
- [ ] Empty state when no prompts exist

**US1.3**: As a user, I want to edit existing prompts

- [ ] Click edit button opens pre-filled form
- [ ] All fields are editable
- [ ] Save updates the prompt and timestamp
- [ ] Cancel discards changes

**US1.4**: As a user, I want to delete prompts

- [ ] Delete button shows confirmation dialog
- [ ] Confirm removes prompt from storage
- [ ] Prompt disappears from list immediately

### Epic 2: Search & Organization

**US2.1**: As a user, I want to search prompts

- [ ] Search bar filters prompts in real-time
- [ ] Search works on title, content, and tags
- [ ] Clear button resets search
- [ ] No results state displayed when needed

**US2.2**: As a user, I want to organize with tags

- [ ] Tag input supports adding multiple tags
- [ ] Autocomplete suggests existing tags
- [ ] Tags display as removable chips
- [ ] Click tag filters to show only that tag

**US2.3**: As a user, I want to mark favorites

- [ ] Star icon toggles favorite status
- [ ] Favorites filter shows only starred prompts
- [ ] Favorite prompts have visual indicator

### Epic 3: Copy & Export Features

**US3.1**: As a user, I want to copy prompt content

- [ ] Copy button copies content to clipboard
- [ ] Success toast shows after copying
- [ ] Keyboard shortcut Ctrl+C works when prompt selected
- [ ] Copy includes just content by default

**US3.2**: As a user, I want to export/import data

- [ ] Export button downloads JSON file
- [ ] Import button accepts JSON files
- [ ] Import validates file format
- [ ] Import shows success/error messages

### Epic 4: User Experience

**US4.1**: As a user, I want intuitive navigation

- [ ] Clear visual hierarchy
- [ ] Consistent button styles and interactions
- [ ] Loading states for actions
- [ ] Responsive design works on mobile

**US4.2**: As a user, I want data persistence

- [ ] Prompts persist between browser sessions
- [ ] Changes save automatically
- [ ] No data loss on page refresh
- [ ] Storage quota warnings if needed

## 6. Implementation Checklist

### Phase 1: Setup & Basic CRUD

- [ ] Initialize Next.js 14 App Router project
- [ ] Install TailwindCSS, Lucide React, and uuid
- [ ] Create basic component structure
- [ ] Implement LocalStorage utilities
- [ ] Build prompt list component
- [ ] Create add/edit prompt form
- [ ] Implement delete functionality
- [ ] Add basic styling

### Phase 2: Search & Organization

- [ ] Build search functionality
- [ ] Implement tag system
- [ ] Add filtering capabilities
- [ ] Create favorites feature
- [ ] Add sorting options
- [ ] Implement grid/list toggle

### Phase 3: Copy & Export

- [ ] Implement clipboard copy
- [ ] Add copy feedback (toast)
- [ ] Build JSON export feature
- [ ] Create JSON import functionality
- [ ] Add file validation
- [ ] Implement error handling

### Phase 4: Polish & UX

- [ ] Add keyboard shortcuts
- [ ] Improve responsive design
- [ ] Add loading states
- [ ] Implement toast notifications
- [ ] Add empty states
- [ ] Optimize performance
- [ ] Add accessibility features

## 7. File Structure & Key Files

### Essential Components to Build

```javascript
// App.jsx - Main application
// PromptList.jsx - Display all prompts
// PromptCard.jsx - Individual prompt item
// PromptForm.jsx - Create/edit form
// SearchBar.jsx - Search functionality
// TagInput.jsx - Tag management
// useLocalStorage.js - Storage hook
// usePrompts.js - Prompt operations hook
```

### LocalStorage Keys

```javascript
const STORAGE_KEYS = {
  PROMPTS: "promptrium_prompts",
  SETTINGS: "promptrium_settings",
};
```

## 8. Success Criteria

- [ ] All CRUD operations work without errors
- [ ] Data persists between sessions
- [ ] Search returns results in < 200ms
- [ ] Copy to clipboard success rate > 99%
- [ ] Export/import handles 1000+ prompts
- [ ] Mobile responsive design
- [ ] No memory leaks or performance issues

## 9. Testing Checklist

- [ ] Test with empty state (no prompts)
- [ ] Test with large datasets (500+ prompts)
- [ ] Test LocalStorage quota limits
- [ ] Test export/import with various file sizes
- [ ] Test clipboard functionality across browsers
- [ ] Test responsive design on mobile devices
- [ ] Test keyboard navigation
- [ ] Test error scenarios (corrupted data, etc.)

## 10. Deployment Notes

- [ ] Build production with Next.js (next build) and static export for offline use (next export)
- [ ] Configure hosting (Vercel/Netlify) to serve the exported static site
- [ ] Ensure all paths are relative
- [ ] Test deployed version thoroughly
- [ ] No environment variables needed
- [ ] Works completely offline after first load
