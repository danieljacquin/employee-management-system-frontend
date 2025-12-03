# 🚀 Vite + React + MUI Template

This repository serves as a starter template for technical tests or personal projects built with React, powered by Vite and styled with Material UI.
It’s structured in a modular architecture, preconfigured with Axios, React Query, and other modern development tools.

## 🧩 Main Technologies

- ⚡Vite Ultra-fast build tool
- ⚛️ React 18 Modern UI library
- 🎨 Material UI (MUI) Accessible and customizable UI components
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
git clone https://github.com/danieljacquin/technical-assessments-template-react.git

# Navigate into the project
cd react-vite-template

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


## 🧰 Included Configurations

- Path alias (@/) set up in vite.config.ts
- Preconfigured Axios instance in src/shared/api/apiClient.ts
- React Query Provider ready in src/shared/providers/
- Linting and formatting with ESLint + Prettier


## 🧪 How to Use This Template

- Click “Use this template” or clone the repo.
- Update project metadata in package.json.
- Create or customize your modules under src/modules/.
- Add routes in src/shared/routes/.
- Configure your API services and types as needed.


## 🧑‍💻 Author
- Created by Daniel Jacquin