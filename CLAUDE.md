# CLAUDE.md - Down Syndrome Pathway

## Project Overview

**Down Syndrome Pathway** (URL: TBC) is a React-based Progressive Web App providing a support pathway for families and professionals involved in the care of children and young people with Down syndrome in Stockton & Hartlepool. Features accessibility tools including Easy Read mode and text-to-speech. Part of the SUVIMA ecosystem.

## Tech Stack

- **Framework:** React 19.x with TypeScript
- **Build Tool:** Vite 6.x
- **Routing:** React Router DOM 7.x
- **Styling:** Tailwind CSS 3.4.17 with @tailwindcss/forms plugin
- **Icons:** Lucide React
- **PWA:** vite-plugin-pwa + Workbox
- **Data Persistence:** localStorage (no backend)

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── App.tsx                        # Main router + AccessibilityProvider
├── main.tsx                       # Entry point
├── index.css                      # Global styles + Tailwind imports
├── vite-env.d.ts                  # Vite type declarations
├── components/
│   ├── accessibility/
│   │   ├── AccessibilityPanel.tsx # Accessibility settings panel
│   │   ├── EasyReadToggle.tsx     # Easy Read mode toggle
│   │   └── TextToSpeech.tsx       # Text-to-speech functionality
│   ├── layout/
│   │   └── AppShell.tsx           # Main layout wrapper with navigation
│   ├── common/                    # Shared UI components
│   ├── pathway/                   # Pathway-specific components
│   └── services/                  # Service listing components
├── contexts/
│   └── AccessibilityContext.tsx   # Accessibility state (Easy Read, TTS, role)
├── data/
│   ├── pathway-stages.ts         # Down syndrome pathway stage data
│   ├── resources.ts              # Resource links and materials
│   └── services.ts               # Local service directory data
├── hooks/
│   └── useLocalStorage.ts        # Custom hook for persisted state
├── pages/
│   ├── Home.tsx                   # Landing page with role selection
│   ├── Pathway.tsx                # Support pathway stages
│   ├── Checklists.tsx             # Developmental checklists
│   ├── Services.tsx               # Local services directory
│   ├── Support.tsx                # Support resources
│   ├── Emergency.tsx              # Emergency contacts and info
│   ├── MyInfo.tsx                 # Personal information storage
│   └── About.tsx                  # About the app
└── types/
    └── index.ts                   # TypeScript type definitions
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with role selection |
| `/pathway` | Pathway | DS support pathway stages |
| `/checklists` | Checklists | Developmental checklists |
| `/services` | Services | Local services directory |
| `/support` | Support | Support resources |
| `/emergency` | Emergency | Emergency contacts |
| `/my-info` | MyInfo | Personal information storage |
| `/about` | About | About the app |

## Key Features

- **Role-aware:** UserRole context with parent/professional views
- **Accessibility:** Easy Read toggle, text-to-speech, accessibility panel
- **PWA:** Installable offline-capable progressive web app
- **Local focus:** Stockton & Hartlepool services and contacts

## Key Files for Common Tasks

| Task | Files to Edit |
|------|---------------|
| Add new page | `src/pages/NewPage.tsx`, `src/App.tsx` (add route) |
| Edit pathway stages | `src/data/pathway-stages.ts` |
| Edit local services | `src/data/services.ts` |
| Modify accessibility | `src/contexts/AccessibilityContext.tsx`, `src/components/accessibility/` |
| Modify navigation | `src/components/layout/AppShell.tsx` |
| Add new type | `src/types/index.ts` |

## Related Projects

- [[suvima - index]] - SUVIMA medical education hub
- [[warp-transition-helper - index]] - Transition Ready
