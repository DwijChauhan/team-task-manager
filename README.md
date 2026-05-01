# team-task-manager
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

A modern, highly interactive project management dashboard built specifically for the fast-paced Indian tech ecosystem. TaskFlow provides a beautiful, state-driven interface to track projects, manage team permissions, and visualize workflows via Kanban boards.

## ✨ Features

- **Interactive Kanban Boards**: Full drag-and-drop functionality for task management across "Todo", "In Progress", and "Done" states.
- **Team Management**: Robust admin panel to invite members, assign roles (Admin, Member, Viewer), and manage access.
- **Dashboard Analytics**: Real-time summary cards tracking overall progress, completed tasks, and overdue items.
- **Client-Side Persistence**: State is persisted across browser reloads using a custom `useLocalStorage` React hook, ensuring no data loss during active sessions.
- **Premium Design System**: Glassmorphism elements, CSS-variable-based theme tokens, dynamic micro-animations, and responsive layouts.
- **Localized Data Context**: Pre-populated with practical, real-world Indian business scenarios (e.g., UPI Integrations, GST Filings, Diwali Campaigns).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Material Symbols Font](https://fonts.google.com/icons)
- **Deployment**: Configured for [Railway](https://railway.app/) via Nixpacks (`railway.json`).

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/team-task-manager.git
   cd team-task-manager
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app`: Next.js App Router containing pages, layouts, and global CSS.
  - `/(dashboard)`: The authenticated core application routes.
  - `/page.tsx`: The authentication (Login/Signup) landing page.
- `/components`: Reusable UI components (e.g., `CreateButton.tsx`).
- `/hooks`: Custom React hooks (e.g., `useLocalStorage.ts` for state persistence).
- `/public`: Static assets and images.

## 🚢 Deployment

This project includes a `railway.json` configuration file, making it instantly deployable on Railway using the Nixpacks builder.

1. Push your code to GitHub.
2. Connect the repository in the Railway dashboard.
3. Railway will automatically build and deploy the production bundle.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
