import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Baby,
  Heart,
  GraduationCap,
  School,
  Users,
  ArrowRightCircle,
  Stethoscope,
  MessageCircle,
  Activity,
  Eye,
  Ear,
  ClipboardCheck,
  Building,
  Calendar,
  ArrowRight,
  HeartPulse,
  TestTube,
  Gift,
  Mail,
  UserCheck,
  BookOpen,
  Hand,
  ClipboardList,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import { pathwayStages } from '../data/pathway-stages';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  baby: Baby,
  heart: Heart,
  'graduation-cap': GraduationCap,
  school: School,
  users: Users,
  'arrow-right-circle': ArrowRightCircle,
  stethoscope: Stethoscope,
  'message-circle': MessageCircle,
  activity: Activity,
  eye: Eye,
  ear: Ear,
  'clipboard-check': ClipboardCheck,
  building: Building,
  calendar: Calendar,
  'arrow-right': ArrowRight,
  'heart-pulse': HeartPulse,
  'test-tube': TestTube,
  gift: Gift,
  mail: Mail,
  'user-check': UserCheck,
  'book-open': BookOpen,
  hand: Hand,
  'clipboard-list': ClipboardList,
  user: Users,
};

const colourClasses: Record<string, { bg: string; border: string; text: string; node: string }> = {
  primary: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    node: 'border-primary-500 bg-primary-500',
  },
  accent: {
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    node: 'border-accent-500 bg-accent-500',
  },
  support: {
    bg: 'bg-support-50',
    border: 'border-support-200',
    text: 'text-support-700',
    node: 'border-support-500 bg-support-500',
  },
};

export default function Pathway() {
  const { settings } = useAccessibility();
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedStages(new Set(pathwayStages.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedStages(new Set());
  };

  const pageDescription = settings.easyRead
    ? 'This shows what happens at different ages. Click on each part to learn more.'
    : 'The Down Syndrome pathway from pregnancy through to adulthood. Click on each stage to see details about support and services available.';

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <ArrowRightCircle className="w-8 h-8 text-primary-500" />
          {settings.easyRead ? 'My Journey' : 'The Pathway'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3 flex items-center gap-4">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <button onClick={expandAll} className="btn-ghost text-sm">
          {settings.easyRead ? 'Open All' : 'Expand All'}
        </button>
        <span className="text-warm-300">|</span>
        <button onClick={collapseAll} className="btn-ghost text-sm">
          {settings.easyRead ? 'Close All' : 'Collapse All'}
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {pathwayStages.map((stage, index) => {
          const isExpanded = expandedStages.has(stage.id);
          const isLast = index === pathwayStages.length - 1;
          const colours = colourClasses[stage.colour] || colourClasses.primary;
          const StageIcon = iconMap[stage.icon] || ArrowRightCircle;

          const stageTitle = settings.easyRead ? stage.titleEasyRead : stage.title;
          const stageDescription = settings.easyRead ? stage.descriptionEasyRead : stage.description;

          return (
            <div key={stage.id} className="relative flex gap-4">
              {/* Timeline line and node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    isExpanded ? colours.node : 'border-warm-300 bg-white'
                  }`}
                />
                {!isLast && <div className="w-0.5 bg-warm-200 flex-grow min-h-[2rem]" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <button
                  onClick={() => toggleStage(stage.id)}
                  className={`w-full text-left card card-hover ${isExpanded ? colours.bg : ''} ${
                    isExpanded ? colours.border : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isExpanded ? `${colours.bg} ${colours.text}` : 'bg-warm-100 text-warm-600'
                      }`}
                    >
                      <StageIcon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className={`font-bold ${isExpanded ? colours.text : 'text-warm-900'}`}>
                          {stageTitle}
                        </h2>
                        <span className="text-sm text-warm-500">({stage.ageRange})</span>
                      </div>
                      <p className="text-sm text-warm-600 line-clamp-2">{stageDescription}</p>
                    </div>

                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-warm-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-warm-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-4 pl-4 animate-fade-in">
                    {/* TTS for this section */}
                    <div className="mb-4">
                      <TextToSpeech
                        text={`${stageTitle}. ${stageDescription}. ${stage.keyPoints
                          .map((p) => (settings.easyRead ? p.easyRead : p.standard))
                          .join('. ')}`}
                        label={settings.easyRead ? 'Read this section' : 'Read aloud'}
                      />
                    </div>

                    {/* Key Points */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-warm-800 mb-3">
                        {settings.easyRead ? 'What Happens' : 'Key Points'}
                      </h3>
                      <ul className="space-y-3">
                        {stage.keyPoints.map((point, pointIndex) => {
                          const PointIcon = iconMap[point.icon || 'clipboard-check'] || ClipboardCheck;
                          return (
                            <li key={pointIndex} className="flex items-start gap-3">
                              <div className={`p-1.5 rounded-lg ${colours.bg} flex-shrink-0`}>
                                <PointIcon className={`w-4 h-4 ${colours.text}`} />
                              </div>
                              <span className="text-warm-700">
                                {settings.easyRead ? point.easyRead : point.standard}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-warm-800 mb-3">
                        {settings.easyRead ? 'Who Can Help' : 'Services Involved'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {stage.services.map((service) => {
                          const ServiceIcon = iconMap[service.icon] || Building;
                          return (
                            <Link
                              key={service.id}
                              to={`/services#${service.id}`}
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-warm-200 rounded-lg text-sm text-warm-700 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                            >
                              <ServiceIcon className="w-4 h-4 text-warm-500" />
                              {service.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Checklist link */}
                    {stage.checklistId && (
                      <Link
                        to={`/checklists#${stage.checklistId}`}
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <ClipboardList className="w-4 h-4" />
                        {settings.easyRead
                          ? 'See health checklist'
                          : 'View review checklist'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 p-4 bg-warm-100 rounded-xl">
        <p className="text-sm text-warm-600">
          {settings.easyRead
            ? 'Everyone is different. You might not need all of these things. Ask your doctor if you have questions.'
            : 'This pathway is a guide. Individual needs may vary and not all services will be required for every child. Consult your healthcare team for personalised advice.'}
        </p>
      </div>
    </div>
  );
}
