# Development Guide

## Project Overview

This is a modern Electron + Vite + React + TypeScript desktop application development template that integrates the latest technology stack and development tools.

## Technology Stack

### Core Frameworks

- **React 19** - Latest React framework with concurrent features
- **Vite 7** - Ultra-fast build tool with Rolldown engine
- **Electron 37** - Latest Electron framework with security improvements
- **TypeScript 5.9** - Full type safety and IntelliSense

### Styling and UI

- **Tailwind CSS 4** - Modern utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library
- **Lucide React** - Modern icon library

### Development Tools

- **Oxlint** - Fast JavaScript/TypeScript linter
- **Prettier** - Code formatting with OXC plugin
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing

### Package Management

- **pnpm** - Faster, more efficient package manager

## Project Structure

```
electron-vite-template/
├── electron/                    # Electron-related code
│   ├── main/                   # Main process source code
│   │   ├── index.ts           # Main process entry
│   │   └── update.ts          # Auto-update logic
│   └── preload/               # Preload scripts source code
│       └── index.ts           # Preload script
├── src/                       # Renderer process source code
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── alert.tsx     # Alert component
│   │   │   ├── badge.tsx     # Badge component
│   │   │   ├── button.tsx    # Button component
│   │   │   ├── card.tsx      # Card component
│   │   │   ├── dialog.tsx    # Dialog component
│   │   │   └── progress.tsx  # Progress component
│   │   └── update/           # Auto-update components
│   │       └── index.tsx     # Update interface
│   ├── assets/               # Static assets
│   ├── demos/                # Example code
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Common utility functions
│   ├── type/                 # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles
│   └── main.tsx              # Renderer process entry
├── public/                   # Static assets
├── test/                     # Test files
├── build/                    # Build output
├── release/                  # Release files
└── Configuration files
    ├── package.json          # Project configuration
    ├── vite.config.ts        # Vite configuration
    ├── electron-builder.json # Electron Builder configuration
    ├── tsconfig.json         # TypeScript configuration
    ├── components.json       # shadcn/ui configuration
    ├── prettier.config.js    # Prettier configuration
    └── .oxlintrc.json       # Oxlint configuration
```

## Development Environment Setup

### 1. Install Dependencies

```sh
# Install dependencies using pnpm
pnpm install
```

### 2. Development Mode

```sh
# Start development server
pnpm dev
```

This will start:

- Vite development server (http://localhost:7777)
- Electron main process
- Hot reload support

### 3. Build Application

```sh
# Build production version
pnpm build
```

The build process includes:

- TypeScript compilation
- Vite build
- Electron Builder packaging

### 4. Preview Build

```sh
# Preview production build
pnpm preview
```

## Development Standards

### Code Style

The project uses the following tools to ensure code quality:

- **Oxlint** - Fast code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

```sh
# Code linting
pnpm lint

# Code formatting
pnpm format
```

### Component Development

#### shadcn/ui Components

The project uses the shadcn/ui component library, with all components located in the `src/components/ui/` directory.

Add new components:

```sh
pnpm dlx shadcn@latest add [component-name]
```

#### Custom Components

When creating custom components, follow these standards:

1. Use TypeScript strict mode
2. Use functional components and Hooks
3. Use Tailwind CSS for styling
4. Support dark mode
5. Use `cn()` function to merge class names

```tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
	className?: string;
	children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
	return <div className={cn("base-classes", className)}>{children}</div>;
}
```

### Styling Standards

#### Tailwind CSS

- Use Tailwind CSS 4.x
- Support dark mode: `dark:bg-gray-800`
- Use responsive design: `md:text-lg`
- Use Tailwind classes for animations: `transition-all duration-200`

#### Dark Mode

The project supports dark mode using the `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">Content</div>
```

### TypeScript Standards

- Strictly use TypeScript, avoid `any` types
- Define types for all function parameters and return values
- Use interfaces to define complex object types
- Prefer `const` and `let`, avoid `var`

### Electron Development

#### IPC Communication

Use type-safe IPC communication:

```typescript
// Send message
await window.electron.ipcRenderer.invoke("channel-name", data);

// Listen for message
window.electron.ipcRenderer.on("channel-name", callback);
```

#### Main Process Development

Main process code is located in the `electron/main/` directory:

- `index.ts` - Main process entry
- `update.ts` - Auto-update logic

#### Preload Scripts

Preload scripts are located in the `electron/preload/` directory and are used to safely expose APIs to the renderer process.

## Testing

### Unit Testing

Use Vitest for unit testing:

```sh
# Run tests
pnpm test

# Run tests with watch mode
pnpm test --watch
```

### End-to-End Testing

Use Playwright for end-to-end testing:

```sh
# Run E2E tests
pnpm test:e2e
```

## Auto Update

The project integrates `electron-updater` to implement auto-update functionality.

### Configuration

Configure publish information in `electron-builder.json`:

```json
{
	"publish": {
		"provider": "generic",
		"channel": "latest",
		"url": "https://your-update-server.com/"
	}
}
```

### Usage

Update components are located in the `src/components/update/` directory, providing complete update interface and logic.

## Publishing

### Build Release Version

```sh
# Build for all platforms
pnpm build

# Build for specific platform
pnpm build --win
pnpm build --mac
pnpm build --linux
```

### Release Files

After building, release files are located in the `release/` directory:

- Unpacked application executable
- Application installer

## Common Issues

### 1. Dependency Installation Issues

If you encounter dependency installation issues, try:

```sh
# Clear cache
pnpm store prune

# Reinstall
pnpm install
```

### 2. Build Failures

Check:

- Node.js version >= 18.0.0
- All dependencies are correctly installed
- TypeScript configuration is correct

### 3. Development Server Issues

If the development server cannot start:

```sh
# Check port usage
lsof -i :7777

# Use different port
pnpm dev --port 3000
```

### 4. Electron Security

By default, the project integrates Node.js API in the renderer process. To follow Electron security best practices, you can remove the renderer plugin configuration in `vite.config.ts`.

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT](LICENSE) © [canvascat](https://github.com/canvascat)
