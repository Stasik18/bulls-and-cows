# Bulls and Cows

A browser-based implementation of the classic **Bulls and Cows** logic game, developed as part of the Rolling Scopes School Fullstack Engineering course.

The project is currently under development.

## Tech Stack

- **TypeScript** - application development
- **Vite** - development server and build tool
- **Jest** - testing framework
- **ESLint** - code linting
- **Prettier** - code formatting
- **Husky** - Git hooks
- **lint-staged** - running checks on staged files

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Stasik18/bulls-and-cows.git
cd bulls-and-cows
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Available Scripts

| Command                | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Starts the development server                         |
| `npm run build`        | Runs TypeScript checks and creates a production build |
| `npm run preview`      | Previews the production build locally                 |
| `npm test`             | Runs the Jest test suite                              |
| `npm run lint`         | Checks the code with ESLint                           |
| `npm run format`       | Formats project files with Prettier                   |
| `npm run format:check` | Checks code formatting without modifying files        |

## Development Workflow

The project uses Husky to automate code quality checks:

- **pre-commit:** runs `lint-staged` to lint and format staged JavaScript and TypeScript files.
- **pre-push:** runs the Jest test suite before pushing changes.

## Project Goals

The main goals of this project are:

- Apply Test-Driven Development (TDD).
- Practice functional programming principles.
- Write clean, readable, and maintainable TypeScript code.
- Cover application logic with automated tests.
- Build an interactive browser-based game.

## Project Structure

The application is built with Vite and TypeScript. Source code and application assets are located in the `src` directory.

More detailed documentation about the architecture, design decisions, game logic, and algorithm complexity will be added as the project develops.
