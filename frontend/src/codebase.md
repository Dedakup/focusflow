# FocusFlow Codebase Documentation

## Project Overview

FocusFlow is a productivity application that combines a Pomodoro timer with a To-Do list manager. The application is built using modern web technologies and follows a structured architecture.

## Tech Stack

- Frontend: Next.js, TypeScript, Redux Toolkit
- Styling: Tailwind CSS, Shadcn UI
- Authentication: Auth0
- Testing: Jest, Testing Library
- Documentation: Storybook
- State Management: Redux

## Project Structure

### Frontend Architecture

### Key Features

1. **Authentication System**

    - Implemented using Auth0
    - Secure user authentication and authorization
    - Protected routes and API endpoints

2. **Task Management**

    - Create, edit, and delete tasks
    - Mark tasks as complete
    - Filter tasks by status
    - Task prioritization

3. **Pomodoro Timer**

    - Configurable work/break sessions
    - Visual and audio notifications
    - Session tracking
    - Custom duration settings

4. **Background Management**
    - Dynamic background changes
    - Lo-fi music integration
    - Volume controls
    - Background selection

## State Management

The application uses Redux Toolkit for state management, organized into the following slices:

1. **Timer Slice**

    - Manages timer state and settings
    - Handles work/break phases
    - Controls timer operations

2. **Task Slice**

    - Manages todo list state
    - Handles task operations
    - Controls filtering and organization

3. **User Slice**

    - Manages user preferences
    - Handles authentication state
    - Stores user settings

4. **Background Slice**
    - Controls background selection
    - Manages audio settings
    - Handles theme preferences

## Development Guidelines

### Code Style

- Follow the established coding standards (see coding-standards.md)
- Use TypeScript for type safety
- Implement proper error handling
- Write comprehensive tests

### Version Control

- Follow semantic versioning (SemVer)
- Use conventional commits
- Branch naming convention:
    - feature/feature-name
    - bugfix/bug-description
    - hotfix/issue-description

### Testing Strategy

- Unit tests for components and utilities
- Integration tests for features
- E2E tests for critical user flows
- Accessibility testing

### Documentation

- Use Storybook for component documentation
- Maintain up-to-date README files
- Document API endpoints
- Keep CHANGELOG updated

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Access the application at `http://localhost:3000`

## Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

## Contributing

Follow the contribution guidelines in CONTRIBUTING.md and ensure all tests pass before submitting pull requests.

# Redux Slices Documentation

## Timer Management Slice

This slice handles the core timer functionality including:

- Timer state (running/paused)
- Time tracking
- Work/break phase management
- Duration settings

## Ambient Background Slice

Manages the application's background atmosphere including:

- Background selection
- Audio controls
- Volume management
- Available background options

## Task Management Slice

Handles all todo-related functionality:

- Task creation and deletion
- Task completion status
- Task filtering and organization
- Task prioritization

## User Profile Slice

Manages user-related data including:

- Authentication state
- User information
- User preferences(timer settings)
- Theme settings
- Notification preferences

## Implementation Details

Each slice follows this general structure:
