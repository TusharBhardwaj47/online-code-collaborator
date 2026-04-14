# CodeSync - Online Code Collaboration Platform

A premium, modern web application for real-time code collaboration. Built with React, TypeScript, and Tailwind CSS, featuring a clean design inspired by Linear.app and Vercel's dashboard.

## ✨ Features

### 🎨 Design System
- **Primary Color**: Soft violet-purple (#6C63FF)
- **Accent Color**: Mint green (#00C896) for active states
- **Background**: Off-white (#F8F9FC)
- **Typography**: Inter font family (400, 500, 600, 700)
- **Spacing**: 4px base unit system (8, 12, 16, 24, 32, 48)
- **Border Radius**: 12px for cards, 8px for buttons/inputs
- **Light Theme**: Clean, airy design with subtle shadows for depth

### 📱 Screens & Features

#### 1. Login/Register Page
- Split layout with animated code snippets
- Tab-based authentication (Login/Register)
- GitHub OAuth option
- Smooth animations and transitions

#### 2. Dashboard
- Welcome header with personalized greeting
- Real-time statistics cards (Active Rooms, Total Sessions, Collaborators)
- Recent rooms grid with language badges
- Sidebar navigation with active room indicators
- Quick room creation

#### 3. Create Room Modal
- Centered modal with backdrop blur
- Language selection with color-coded icons
- Smooth entrance animations
- Clean form design

#### 4. Main Editor (Full-Screen)
- **Top Bar**: Room info, connected users, action buttons
- **Left Panel**: Code editor with dark theme
  - Syntax highlighting
  - Line numbers
  - Active line highlight
- **Right Panel**: Tabbed interface
  - **Output Tab**: Terminal-style code execution
  - **Chat Tab**: Real-time messaging with bubble UI
  - **History Tab**: Snapshot management
- **Bottom Status Bar**: Language indicator, cursor positions, connection status

#### 5. Collaborator Presence
- Color-coded user cursors
- Real-time position tracking
- Online status indicators

#### 6. Profile & Settings
- Avatar upload
- Account information management
- Security settings (password change)
- Preferences (default language, notifications)
- Section-based save buttons

### 🎭 Micro-Interactions
- ✨ Skeleton loaders for async content
- 🎯 Toast notifications (success, error, info)
- 🎨 Smooth hover states with elevation
- 💫 Active states with purple accents
- 🔍 Input focus with purple glow
- 📋 Copy-to-clipboard functionality

### 🛠️ Tech Stack
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Motion (Framer Motion)** for animations
- **Lucide React** for icons
- **Sonner** for toast notifications
- **Radix UI** components for accessibility

## Getting Started

The application uses a multi-page architecture with React Router:

### Routes
- `/` - Login/Register page
- `/app` - Dashboard (protected)
- `/app/editor/:roomId` - Code editor
- `/app/profile` - User profile and settings

### Key Components
- `Navbar` - Top navigation with search and user menu
- `Sidebar` - Room list and quick actions
- `EditorPanel` - Code editing interface
- `RightPanel` - Output/Chat/History tabs
- `CreateRoomModal` - Room creation dialog

## Design Philosophy

**"Notion meets VS Code meets Linear"**

- Premium SaaS product feel
- Intentional spacing and whitespace
- Subtle shadows for depth
- Light, airy, and focused
- No unnecessary decorations
- Let whitespace do the work

## Mock Data

The application includes mock data for demonstration:
- Sample rooms with different programming languages
- Multiple users with avatars
- Chat messages and history snapshots
- Real-time collaboration indicators

## Future Enhancements

- Real-time WebSocket integration
- Actual code execution backend
- User authentication system
- Room persistence
- Advanced code collaboration features
- Video/audio chat integration