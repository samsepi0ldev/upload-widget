# Widget Upload

A modern, full-stack file upload widget with real-time progress tracking and a minimizable interface. Built as a monorepo using Turborepo with a React frontend and Fastify backend.

## Description

Widget Upload is a drag-and-drop file upload solution featuring a collapsible widget interface that allows users to upload files with visual progress indicators. The widget can be minimized while uploads continue in the background, providing a seamless user experience. The application uses a clean architecture pattern on the backend with proper separation of concerns across domain, data, presentation, and infrastructure layers.

## Features

- **Drag & Drop Interface** - Intuitive file upload using react-dropzone
- **Real-time Progress Tracking** - Visual progress bars with percentage indicators
- **Minimizable Widget** - Collapsible UI that stays out of the way while uploads continue
- **File Compression** - Automatic file compression before upload
- **Multiple File Support** - Upload multiple files simultaneously
- **Responsive Design** - Built with Tailwind CSS for a modern, responsive UI
- **Type-safe** - Full TypeScript implementation across frontend and backend
- **Clean Architecture** - Backend follows clean architecture principles with clear separation of layers

## Technologies Used

### Frontend (Web)
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Radix UI** - Accessible UI components (Collapsible, Progress)
- **Motion** - Animations
- **Lucide React** - Icons
- **react-dropzone** - File upload handling

### Backend (Server)
- **Fastify** - Web framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **@fastify/multipart** - File upload handling
- **@fastify/cors** - CORS support
- **@fastify/static** - Static file serving
- **tsup** - Build tool

### Monorepo Tools
- **Turborepo** - Monorepo build system
- **pnpm** - Package manager
- **Biome** - Linting and formatting

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm 10.29.3 or higher

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd widget-upload
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure the server environment:
```bash
cd apps/server
cp .env-example .env
```

4. Edit `apps/server/.env` and set the required variables:
```env
PORT=3000
UPLOAD_DIR=./public/uploads
```

## Usage

### Development Mode

Run both frontend and backend in development mode:
```bash
pnpm dev
```

This will start:
- Frontend at `http://localhost:5173` (default Vite port)
- Backend at `http://localhost:<PORT>` (configured in .env)

### Production Build

Build all applications:
```bash
pnpm build
```

Start the production server:
```bash
cd apps/server
pnpm start
```

### Individual Applications

Run only the frontend:
```bash
cd apps/web
pnpm dev
```

Run only the backend:
```bash
cd apps/server
pnpm dev
```

## File Structure

```
widget-upload/
├── apps/
│   ├── web/                    # React frontend application
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   │   ├── ui/         # Reusable UI components
│   │   │   │   └── upload-*    # Upload widget components
│   │   │   ├── http/           # API client functions
│   │   │   ├── store/          # Zustand state management
│   │   │   ├── utils/          # Utility functions
│   │   │   ├── app.tsx         # Root component
│   │   │   └── main.tsx        # Application entry point
│   │   ├── public/             # Static assets
│   │   └── package.json
│   │
│   └── server/                 # Fastify backend application
│       ├── src/
│       │   ├── data/           # Data layer (use cases implementation)
│       │   ├── domain/         # Domain layer (entities, interfaces)
│       │   ├── infra/          # Infrastructure (file storage)
│       │   ├── main/           # Application entry point
│       │   │   ├── adapters/   # Framework adapters
│       │   │   ├── config/     # App configuration
│       │   │   ├── factories/  # Dependency injection factories
│       │   │   └── routes/     # Route definitions
│       │   ├── presentation/   # Presentation layer (controllers)
│       │   └── utils/          # Utility functions
│       ├── public/             # Uploaded files directory
│       └── package.json
│
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

## API Endpoints

### POST /upload
Upload a file to the server.

**Request:**
- Content-Type: `multipart/form-data`
- Body: File data

**Response:**
```json
{
  "url": "http://localhost:3000/uploads/filename.ext"
}
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all linting checks:
```bash
cd apps/web
pnpm lint
```

## License

ISC

## Author

Created by Elivelton Santos
