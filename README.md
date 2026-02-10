# CFT Services Website

A modern, responsive website for CFT Services, a technology consulting firm specializing in digital transformation, custom software development, and process automation.

## About CFT Services

CFT Services is a technology consulting firm focused on delivering practical, high-impact solutions. We partner with businesses of all sizes to modernize operations, build reliable software, and automate the processes that hold teams back.

### Services Offered
- **Technology Consulting**: Strategic technology guidance for digital transformation
- **Website Development**: Professional websites built to convert with modern tech
- **Web Applications**: Custom business tools tailored to your workflows
- **Process Automation**: Eliminate repetitive manual work through automation

## Technologies Used

This website is built with modern web technologies:

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **i18next** - Internationalization (English and Spanish support)
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variant management

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Internationalization**: Support for English and Spanish languages
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Modern UI**: Clean, professional design with Tailwind CSS
- **SEO Optimized**: Built with performance and search engines in mind
- **Fast Loading**: Vite-powered build for optimal performance

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cft-services.git
cd cft-services
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

### Code Quality

- **Linting**: `pnpm lint` or `npm run lint`
- **Fix Linting Issues**: `pnpm lint:fix` or `npm run lint:fix`
- **Format Code**: `pnpm format` or `npm run format`
- **Check Formatting**: `pnpm format:check` or `npm run format:check`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── Hero.tsx        # Landing section
│   ├── Services.tsx    # Services showcase
│   ├── About.tsx       # Company information
│   ├── Contact.tsx     # Contact form
│   ├── Navbar.tsx      # Navigation
│   └── Footer.tsx      # Site footer
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization files
│   ├── en.json         # English translations
│   ├── es.json         # Spanish translations
│   └── index.ts        # i18n configuration
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to CFT Services.
