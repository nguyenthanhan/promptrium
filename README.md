# Promptrium 🚀

[![Release and Deploy](https://github.com/nguyenthanhan/promptrium/workflows/Deploy%20and%20Release/badge.svg)](https://github.com/nguyenthanhan/promptrium/actions/workflows/deploy-and-release.yml)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-black)](https://vercel.com/heimers-projects/promptrium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Promptrium** is a modern, offline-first AI prompt management application that helps you organize, search, and reuse your AI prompts efficiently. Built with Next.js and TypeScript, it provides a beautiful, responsive interface for managing your prompt library.

## ✨ Features

### 📝 **Prompt Management**

- **Create, Edit & Delete**: Full CRUD operations for prompt management
- **Rich Text Support**: Store detailed prompts with titles, content, and descriptions
- **Tagging System**: Organize prompts with custom tags for better categorization
- **Favorites**: Mark important prompts as favorites for quick access

### 🔍 **Search & Discovery**

- **Advanced Search**: Real-time search across prompt titles, content, and descriptions
- **Tag Filtering**: Filter prompts by one or multiple tags
- **Favorites Filter**: Quickly view only your favorite prompts
- **Smart Sorting**: Sort by creation date or last updated

### 📊 **Analytics & Tracking**

- **Usage Statistics**: Track how often you use each prompt
- **Creation & Update Timestamps**: Keep track of when prompts were created and modified
- **Prompt Statistics**: View total prompts, favorites, and tag counts at a glance

### 🎨 **User Experience**

- **Modern Layout**: A new, improved layout with a responsive sidebar, header, and main content area
- **Grid View**: Clean 3-column grid layout for optimal prompt browsing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **One-Click Copy**: Copy prompts to clipboard with visual feedback
- **Toast Notifications**: Immediate feedback for all user actions
- **Loading States**: Smooth loading experience with skeleton screens

### 💾 **Data Management**

- **Local Storage**: All data stored locally in your browser (no server required)
- **Import/Export**: Backup and restore your prompts via JSON files
- **Data Validation**: Robust validation to ensure data integrity
- **Offline First**: Works completely offline once loaded

### 🔧 **Developer Experience**

- **TypeScript**: Full type safety throughout the application
- **Modern React**: Built with React 19 and modern hooks
- **Component Architecture**: Well-structured, reusable components
- **Performance Optimized**: Memoized components and efficient state management
- **Code Formatting**: Integrated with Prettier for consistent code style.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nguyenthanhan/promptrium.git
   cd promptrium
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm dev:turbo    # Start development server with Turbopack

# Build & Deploy
pnpm build        # Build for production
pnpm start        # Start production server

# Maintenance
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm clean        # Clean build artifacts

# Release Management
pnpm release             # Create a new release
pnpm release:patch       # Create a patch release
pnpm release:minor       # Create a minor release
pnpm release:major       # Create a major release
pnpm changelog           # Extract changelog
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Test your changes across different screen sizes
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Vercel](https://vercel.com/font)

---

**Made with ❤️ for the AI community**