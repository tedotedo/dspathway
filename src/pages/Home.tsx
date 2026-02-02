import { Users, Heart, Stethoscope, GraduationCap, Route, ClipboardList, Building2, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import type { UserRole } from '../types';

const roles = [
  {
    id: 'parent-carer' as UserRole,
    icon: Users,
    title: 'Parent or Carer',
    titleEasy: 'I am a Parent or Carer',
    description: 'Managing your child\'s care journey and finding support',
    descriptionEasy: 'I look after someone with Down Syndrome',
    colour: 'primary' as const,
  },
  {
    id: 'young-person' as UserRole,
    icon: Heart,
    title: 'Young Person',
    titleEasy: 'This is for Me',
    description: 'Information about your health and support',
    descriptionEasy: 'I have Down Syndrome and want to learn about my health',
    colour: 'accent' as const,
  },
  {
    id: 'professional' as UserRole,
    icon: Stethoscope,
    title: 'Healthcare Professional',
    titleEasy: 'I am a Doctor or Nurse',
    description: 'Clinical checklists and referral pathways',
    descriptionEasy: 'I work in healthcare',
    colour: 'support' as const,
  },
  {
    id: 'educator' as UserRole,
    icon: GraduationCap,
    title: 'Teacher or Educator',
    titleEasy: 'I am a Teacher',
    description: 'School-based support and educational resources',
    descriptionEasy: 'I work in a school',
    colour: 'warm' as const,
  },
];

const quickLinks = [
  {
    path: '/pathway',
    icon: Route,
    title: 'View Pathway',
    titleEasy: 'My Journey',
    description: 'See what support is available at each age',
    descriptionEasy: 'See what happens at different ages',
  },
  {
    path: '/checklists',
    icon: ClipboardList,
    title: 'Health Checklists',
    titleEasy: 'Health Checks',
    description: 'Review checklists for health appointments',
    descriptionEasy: 'Things to check at the doctor',
  },
  {
    path: '/services',
    icon: Building2,
    title: 'Find Services',
    titleEasy: 'Who Can Help',
    description: 'Contact details for local services',
    descriptionEasy: 'Find people who can help you',
  },
];

function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover opacity-15"
      >
        <source src="/images/dshappyboy.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
    </div>
  );
}

function RoleSelector({ onSelect }: { onSelect: (role: UserRole) => void }) {
  const { settings } = useAccessibility();

  const welcomeText = settings.easyRead
    ? 'Hello! Welcome to the Down Syndrome Pathway. This app helps you find information and support. Who are you?'
    : 'Welcome to the Down Syndrome Pathway for Stockton and Hartlepool. Please select your role to personalise your experience.';

  return (
    <>
      <VideoBackground />
      <div className="page-container animate-fade-in relative">
        <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-card">
          DS
        </div>
        <h1 className="page-title mb-2">
          {settings.easyRead ? 'Welcome!' : 'Down Syndrome Pathway'}
        </h1>
        <p className="text-warm-600 max-w-md mx-auto mb-4">
          {welcomeText}
        </p>
        <TextToSpeech text={welcomeText} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
        {roles.map((role) => {
          const colourClasses = {
            primary: 'border-primary-200 hover:border-primary-400 hover:bg-primary-50/50',
            accent: 'border-accent-200 hover:border-accent-400 hover:bg-accent-50/50',
            support: 'border-support-200 hover:border-support-400 hover:bg-support-50/50',
            warm: 'border-warm-300 hover:border-warm-400 hover:bg-warm-100/50',
          };

          const iconColourClasses = {
            primary: 'bg-primary-100 text-primary-600',
            accent: 'bg-accent-100 text-accent-600',
            support: 'bg-support-100 text-support-600',
            warm: 'bg-warm-200 text-warm-700',
          };

          return (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={`card-interactive text-left ${colourClasses[role.colour]}`}
            >
              <div className={`w-12 h-12 rounded-xl ${iconColourClasses[role.colour]} flex items-center justify-center mb-3`}>
                <role.icon className="w-6 h-6" />
              </div>
              <h2 className="font-semibold text-warm-900 mb-1">
                {settings.easyRead ? role.titleEasy : role.title}
              </h2>
              <p className="text-sm text-warm-600">
                {settings.easyRead ? role.descriptionEasy : role.description}
              </p>
            </button>
          );
        })}
      </div>

        <p className="text-center text-sm text-warm-500 mt-6">
          {settings.easyRead
            ? 'You can change this later in the settings.'
            : 'You can change your role at any time from the dashboard.'}
        </p>
      </div>
    </>
  );
}

function Dashboard({ role, onChangeRole }: { role: UserRole; onChangeRole: () => void }) {
  const { settings } = useAccessibility();
  const roleInfo = roles.find((r) => r.id === role);

  const greetings: Record<NonNullable<UserRole>, { standard: string; easy: string }> = {
    'parent-carer': {
      standard: 'Welcome back! Find the support your family needs.',
      easy: 'Hello! We are here to help you and your family.',
    },
    'young-person': {
      standard: 'Welcome! Your health journey, your way.',
      easy: 'Hello! This app is here to help you.',
    },
    professional: {
      standard: 'Welcome. Access clinical pathways and checklists.',
      easy: 'Hello! Find the information you need for your patients.',
    },
    educator: {
      standard: 'Welcome. Supporting learners with Down Syndrome.',
      easy: 'Hello! Find ways to help your students.',
    },
  };

  const greeting = role ? (settings.easyRead ? greetings[role].easy : greetings[role].standard) : '';

  return (
    <>
      <VideoBackground />
      <div className="page-container animate-fade-in relative">
        {/* Welcome Section */}
      <div className="card mb-6 bg-gradient-to-br from-primary-50 to-white border-primary-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {roleInfo && (
                <span className="badge-primary">
                  <roleInfo.icon className="w-3 h-3 mr-1" />
                  {settings.easyRead ? roleInfo.titleEasy : roleInfo.title}
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-warm-900 mb-1">
              {settings.easyRead ? 'Hello!' : 'Welcome'}
            </h1>
            <p className="text-warm-600 mb-3">{greeting}</p>
            <TextToSpeech text={greeting} />
          </div>
          <button
            onClick={onChangeRole}
            className="btn-ghost text-sm text-warm-500"
            title="Change role"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">
              {settings.easyRead ? 'Change' : 'Switch Profile'}
            </span>
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="font-semibold text-warm-700 mb-3">
        {settings.easyRead ? 'What would you like to do?' : 'Quick Access'}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {quickLinks.map((link) => (
          <Link key={link.path} to={link.path} className="card-interactive group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-warm-900 mb-0.5 group-hover:text-primary-600 transition-colors">
                  {settings.easyRead ? link.titleEasy : link.title}
                </h3>
                <p className="text-sm text-warm-500 line-clamp-2">
                  {settings.easyRead ? link.descriptionEasy : link.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-warm-400 flex-shrink-0 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Information Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card border-accent-100 bg-gradient-to-br from-accent-50/50 to-white">
          <h3 className="font-semibold text-warm-900 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent-500" />
            {settings.easyRead ? 'Get Support' : 'Support Available'}
          </h3>
          <p className="text-sm text-warm-600 mb-3">
            {settings.easyRead
              ? 'There are people who can help you and your family.'
              : 'Connect with local charities, parent groups, and support services.'}
          </p>
          <Link to="/support" className="text-sm font-medium text-accent-600 hover:text-accent-700 inline-flex items-center gap-1">
            {settings.easyRead ? 'Find help' : 'View support organisations'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card border-support-100 bg-gradient-to-br from-support-50/50 to-white">
          <h3 className="font-semibold text-warm-900 mb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-support-500" />
            {settings.easyRead ? 'Local Services' : 'NHS Services'}
          </h3>
          <p className="text-sm text-warm-600 mb-3">
            {settings.easyRead
              ? 'Find doctors and therapists in Stockton and Hartlepool.'
              : 'Access contact details for healthcare services in your area.'}
          </p>
          <Link to="/services" className="text-sm font-medium text-support-600 hover:text-support-700 inline-flex items-center gap-1">
            {settings.easyRead ? 'See services' : 'Browse services'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-warm-500">
            {settings.easyRead
              ? 'This app was made by the NHS and local families.'
              : 'Created in partnership with families and North Tees & Hartlepool NHS Foundation Trust'}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [role, setRole] = useLocalStorage<UserRole>('ds-pathway-role', null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleChangeRole = () => {
    setRole(null);
  };

  if (!role) {
    return <RoleSelector onSelect={handleRoleSelect} />;
  }

  return <Dashboard role={role} onChangeRole={handleChangeRole} />;
}
