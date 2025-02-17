# Movie Explorer

A React web application for exploring movies using the OMDB API. This application allows users to search for movies, view detailed information about them, and filter results by year and type. This project was built as a case study to demonstrate web development practices and state management in React applications.

## Features

- **Movies List**: View a list of movies in a table with pagination
- **Movie Details**: View comprehensive information about each movie including:
  - Title, Plot, Release Date, Runtime
  - Genre, Rating, Director, Writer
  - Cast Information and IMDb Rating
  - Movie Poster
- **Filtering Options**:
  - Search movies by title with real-time debounced input
  - Filter by Year (100 years range)
  - Filter by Type (Movies, Series, Episodes)

## Tech Stack

- **Framework**: React 19 with TypeScript
- **State Management**:
  - Redux Toolkit
  - TanStack Query
- **Routing**: TanStack Router
- **Styling**:
  - TailwindCSS for utility-first CSS
  - SASS for custom styling
- **HTTP Client**: oFetch
- **Build Tool**: Vite
- **Testing**:
  - E2E Testing: Playwright
- **Code Quality**:
  - ESLint
  - Oxlint
  - Prettier

## Project Structure

```
e2e/
├── movie-explorer.spec.ts  # End-to-end tests
src/
├── components/             # Reusable UI components
├── features/
│   └── movie/              # Movie feature related components and logic
│       ├── api/            # API integration
│       ├── components/     # Movie-specific components
│       ├── hooks/          # Custom hooks for the movie feature
├── hooks/                  # Custom React hooks
├── routes/                 # Application routes
├── store/                  # Redux store configuration
├── styles/                 # Global styles
└── utils/                  # Utility functions
```

## Project Setup

### Node.js and pnpm Setup

Make sure you have LTS or latest Node.js and pnpm installed. The pnpm version should be `9.x.x`.

### Install Dependencies

```sh
pnpm install
```

### Update .env

You should create a `.env` file in the root of the project.

In this file, you should set the below environment variable:

```sh
VITE_OMDB_API_KEY=
```

This was set in the production environment, using Vercel environment variables.

### Run Development Server

```sh
pnpm dev
```

### Build for Production

```sh
pnpm build
```

### Run Type Checking

```sh
pnpm typecheck
```

### Run Linting

```sh
pnpm lint
```

### Run Formatting

```sh
pnpm format
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
pnpm exec playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
```

## Code Quality

The project maintains code quality standards through:

- TypeScript for type safety
- ESLint and Oxlint for code linting
- Prettier for code formatting
- End-to-end tests with Playwright
