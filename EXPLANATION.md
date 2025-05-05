# Task Management Tool

This is a full-stack task management tool built with **React** (frontend) and **NestJS** (backend). The main goal was to
enable users to create **nested tasks (subtasks)** via the UI and extend the backend API to support retrieving and
displaying these nested tasks.

My overarching goal of the task was to show the tools and methods I would use for implementing a more enterprise-level,
production-ready application, rather than a simple approach to solving the problem. Obviously, a lot of what I have
implemented is overkill for this application. I am aware I may have deviated slightly from the original task, but it was
in effort to show a broader range of skills.

---

## What Was Done

### Backend

#### General Additions

- Added OpenAPI Swagger documentation for the API.
- Added **Orval** to generate TypeScript types for the API to be used by the client based on the OpenAPI spec.
- Configured Orval to also generate a fully typed **React Query client** for the API.
  > This I have found is an incredibly powerful pattern that increases velocity and DX
  significantly. (https://orval.dev/)
- Added `@ApiProperty` decorators in `TaskResponseDto` to define properties for OpenAPI spec generation.  
  This code-first approach avoids missing updates to the spec when DTOs change. (Someone will inevitably forget)
- Sanitized the API response to avoid circular references by returning only the `parentId` instead of the full parent
  task object.  
  This prevents issues where a parent would include its own subtasks, leading to potentially infinite nesting.

#### Controller Layer

- Endpoints added:
    - `GET /api/tasks/:id/subtasks` – fetch subtasks for a given task ID.  
      *(NOTE: Not used on the UI as the UI fetches and renders the entire tree, but implemented as the spec asked for
      it.)*
    - `GET /api/tasks/tree` – fetch all tasks in a tree structure.
    - `GET /api/tasks/:id` – fetch a specific task by ID.
- Created `@ApiDefinition` decorator to apply OpenAPI metadata to controller methods.  
  Used for automating OpenAPI generation and syncing client types.
- Enabled CORS to allow frontend/backend development locally outside Docker.
  > I have reconfigured the API to be proxied through NGINX, though to run locally you just need to change the
  `VITE_API_URL` in the frontend to point to localhost rather than `/api` as NGINX is not running in the local dev
  environment.

---

### Frontend

- Configured `tsconfig` and `vite.config` for **absolute imports**.  
  Example: `import { Button } from '@/components/Button'` instead of relative paths.
- Used Orval to generate a fully typed **React Query client**.  
  This provides end-to-end type safety with no duplication of types.
- Set up a custom Axios instance for the generated client.  
  Useful for handling auth, errors, interceptors, etc.
- Leveraged **React Query** for data fetching instead of `useEffect`/`useState`.  
  Provides better UX with caching, error handling, and loading states.
- Integrated **TailwindCSS** for styling.  
  Styling is minimal, but shows how to integrate Tailwind. A full design system would be a next step.
- Componentized basic UI primitives like `Button` and `PageHeader`.  
  These would be expanded with variants and theming as the UI scales.
- Added react hot toast for notifications.  
  This is a great library for showing success/error messages in a user-friendly way.

---

## Suggestions for Improvement

- Refine and extend UI primitives (buttons, input fields) for reusability and consistency.
- Improve theming and styling with Tailwind (e.g., button variants, typography utilities).
- Consider a scalable file structure as the project grows.
- Enhance UX and polish UI, especially for rendering many tasks/subtasks.
- Improve error handling and loading indicators across the frontend. 
- Add automated tests for frontend and backend.
- Introduce a persistent database for real-world usage.
- Documentation for the API and frontend.
- Add liniting and prettier for code quality and consistency. using pre-commit hooks.


## NOTE: I get an intermittent error when runnning docker-compose up --build. I get errors regarding the sqlite package not being found. Clearing the build folder in /backend and running the command again fixes it. 