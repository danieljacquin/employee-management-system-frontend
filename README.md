# 🚀 Vite + React + Tailwind

An educational frontend Employee Management System (EMS) built for learning purposes. This application focuses on practicing modern frontend development using TypeScript and a contemporary framework, while providing an intuitive user interface for managing employees in a simulated real-world HR environment. It allows users to register, view, filter, edit, and delete employee records, following strict business rules and validations.


## 🧩 Main Technologies

- ⚡Vite Ultra-fast build tool
- ⚛️ React 18 Modern UI library
- 🎨 Tailwind css
- 🔄 TanStack Query (React Query) Server state and caching management
- 🌐 Axios HTTP client with a preconfigured instance
- 🧠 TypeScript Static typing
- 🧰 ESLint + Prettier Linting and code formatting

## 🏗️ Project Structure

```
src/
├── modules/                # Feature-based or domain modules
│   └── auth/
│       ├── components/     # Module-specific components
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Module pages or views
│       ├── services/       # Business logic or API calls
│       ├── types/          # TypeScript interfaces and types
│       ├── schemas/        # Validation schemas (e.g., Zod, Yup)
│       └── index.ts        # Module exports
│
├── shared/                 # Reusable global resources
│   ├── components/         # Generic and UI components
│   ├── api/                # Axios instance (apiClient)
│   ├── utils/              # Helpers and utility functions
│   ├── providers/          # Global providers (React Query, Theme, etc.)
│   └── routes/             # Routing and navigation setup
│
├── App.tsx
└── main.tsx
```

## ⚙️ Installation & Usage

```
# Clone the repository
git clone https://github.com/danieljacquin/employee-management-system-frontend.git

# Navigate into the project
cd employee-management-system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```


## ⚙️ Scripts

| Comando               | Descripción                                     | Ejemplo(opcional)
| ----------------      | ----------------------------------------------- | ---------------
| `npm run dev`         | dev	Starts the development server               |
| `npm run build`       | dev	Starts the development server               |
| `npm run preview`     | preview	Previews the production build locally   |
| `npm run lint`        | Runs ESLint                                     |
| `npm run lint:fix`    | Runs ESLint and automatically fixes errors      |
| `npm run format`      | Formats code using Prettier                     |


## 🧑‍💻 Author
- Created by Daniel Jacquin