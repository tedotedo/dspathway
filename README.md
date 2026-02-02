# Down Syndrome Pathway - Stockton & Hartlepool

A mobile-friendly Progressive Web App (PWA) providing support pathway information for children and young people with Down Syndrome in Stockton and Hartlepool.

## Features

- **Role-based experience** - Tailored content for parents/carers, young people, healthcare professionals, and educators
- **Accessibility first** - Easy-read mode, text-to-speech, high contrast, large text options
- **Pathway timeline** - Visual journey through 7 life stages from antenatal to adult transitions
- **Interactive checklists** - Health review checklists for medical appointments
- **Service directory** - NHS service contacts for the local area
- **Support resources** - Local and national organisations, charities, and apps
- **Offline support** - Works without internet connection as a PWA
- **Personal notes** - Store care information locally with backup/restore
- **Video background** - Cheerful looping video on home page

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- PWA (vite-plugin-pwa)
- localStorage for data persistence

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── accessibility/   # TextToSpeech, AccessibilityPanel
│   └── layout/          # AppShell navigation
├── contexts/            # AccessibilityContext
├── data/                # Pathway stages, services, resources
├── hooks/               # useLocalStorage
├── pages/               # All page components
└── types/               # TypeScript interfaces
public/
└── images/              # Video assets
```

## Accessibility Features

- **Easy-read mode** - Simplified language, larger text, increased spacing
- **Text-to-speech** - Web Speech API for reading content aloud
- **High contrast** - Enhanced colour contrast for visibility
- **Large text** - Increased base font size
- **Reduced motion** - Respects system preferences

## Colour Palette

- Primary: NHS Blue (#005eb8)
- Accent: Yellow/Gold (Down Syndrome awareness)
- Support: Teal (healthcare calm)
- Warm neutrals for backgrounds

## Resources Included

### Official
- [NHS Down Syndrome Pathway - Stockton & Hartlepool](https://northeastnorthcumbria.nhs.uk/our-work/down-syndrome-pathway-stockton-and-hartlepool/)

### Local (Stockton & Hartlepool)
- Down Syndrome North East (DSNE)
- Parent Carer Forums
- Together 21
- Family Hubs
- Tees Valley Sleep Service

### National
- Down Syndrome Association
- Positive About Down Syndrome (PADS)
- Mencap
- Contact (for families)
- DSMIG (Medical Interest Group)

### Apps & Digital
- TransitionReady
- Proloquo2Go
- Makaton
- See and Learn

## Created With

Built in partnership with families and North Tees & Hartlepool NHS Foundation Trust.

## License

MIT
