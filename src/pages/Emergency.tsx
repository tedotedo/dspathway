import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  Phone,
  MapPin,
  AlertTriangle,
  Heart,
  Thermometer,
  Activity,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';

const emergencyContacts = [
  {
    name: 'Emergency Services',
    nameEasy: 'Call 999',
    number: '999',
    description: 'For life-threatening emergencies',
    descriptionEasy: 'If someone is very ill or badly hurt',
    urgent: true,
  },
  {
    name: 'NHS 111',
    nameEasy: 'NHS Help',
    number: '111',
    description: 'For urgent but non-life-threatening conditions',
    descriptionEasy: 'If you need help but it is not an emergency',
    urgent: false,
  },
  {
    name: 'North Tees A&E',
    nameEasy: 'Hospital A&E',
    number: '01642 617 617',
    address: 'University Hospital of North Tees, Hardwick Road, Stockton-on-Tees, TS19 8PE',
    description: 'Accident and Emergency department',
    descriptionEasy: 'The hospital emergency department',
    urgent: false,
  },
];

const whenToSeekHelp = [
  {
    title: 'Breathing problems',
    titleEasy: 'Trouble breathing',
    description: 'Difficulty breathing, blueness around lips, or choking',
    descriptionEasy: 'Cannot breathe properly or lips turning blue',
    icon: Activity,
    urgent: true,
  },
  {
    title: 'Seizures',
    titleEasy: 'Fits or shaking',
    description: 'Uncontrolled shaking, loss of consciousness, or prolonged seizure',
    descriptionEasy: 'Shaking they cannot control or not waking up',
    icon: AlertTriangle,
    urgent: true,
  },
  {
    title: 'Severe illness',
    titleEasy: 'Very unwell',
    description: 'High temperature with rash, severe drowsiness, or unresponsive',
    descriptionEasy: 'Very hot with spots, very sleepy, or not responding',
    icon: Thermometer,
    urgent: true,
  },
  {
    title: 'Heart concerns',
    titleEasy: 'Heart problems',
    description: 'Chest pain, rapid heartbeat, or sudden collapse',
    descriptionEasy: 'Pain in chest, heart beating very fast, or falling down suddenly',
    icon: Heart,
    urgent: true,
  },
];

const generalAdvice = [
  {
    standard: 'Children with Down Syndrome may present differently when unwell',
    easy: 'Children with Down Syndrome may show illness in different ways',
  },
  {
    standard: 'Trust your instincts - you know your child best',
    easy: 'If you are worried, get help. You know your child best',
  },
  {
    standard: 'Keep your child\'s Hospital Passport up to date',
    easy: 'Keep your hospital information ready',
  },
  {
    standard: 'Inform emergency services about Down Syndrome and any cardiac history',
    easy: 'Tell the doctors about Down Syndrome and any heart problems',
  },
];

export default function Emergency() {
  const { settings } = useAccessibility();

  const pageDescription = settings.easyRead
    ? 'What to do if there is an emergency. Important phone numbers and when to get help.'
    : 'Emergency contacts and guidance on when to seek urgent medical help.';

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-emergency-500" />
          {settings.easyRead ? 'Emergency Help' : 'Emergency Information'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-8">
        <h2 className="font-semibold text-warm-800 mb-4">
          {settings.easyRead ? 'Phone Numbers' : 'Emergency Contacts'}
        </h2>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.number}
              className={`card ${
                contact.urgent
                  ? 'bg-emergency-50 border-emergency-200'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    contact.urgent
                      ? 'bg-emergency-100 text-emergency-600'
                      : 'bg-warm-100 text-warm-600'
                  }`}
                >
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-warm-900">
                    {settings.easyRead ? contact.nameEasy : contact.name}
                  </h3>
                  <p className="text-sm text-warm-600 mb-2">
                    {settings.easyRead ? contact.descriptionEasy : contact.description}
                  </p>
                  <a
                    href={`tel:${contact.number}`}
                    className={`inline-flex items-center gap-2 font-bold text-lg ${
                      contact.urgent ? 'text-emergency-600' : 'text-primary-600'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    {contact.number}
                  </a>
                  {contact.address && (
                    <p className="text-sm text-warm-500 mt-2 flex items-start gap-1">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {contact.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* When to Seek Help */}
      <div className="mb-8">
        <h2 className="font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-emergency-500" />
          {settings.easyRead ? 'When to Call 999' : 'When to Seek Emergency Help'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {whenToSeekHelp.map((item) => (
            <div
              key={item.title}
              className="card bg-emergency-50/50 border-emergency-100"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emergency-100 text-emergency-600 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-900">
                    {settings.easyRead ? item.titleEasy : item.title}
                  </h3>
                  <p className="text-sm text-warm-600">
                    {settings.easyRead ? item.descriptionEasy : item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Advice */}
      <div className="mb-8">
        <h2 className="font-semibold text-warm-800 mb-4">
          {settings.easyRead ? 'Remember' : 'Important Advice'}
        </h2>
        <div className="card bg-primary-50 border-primary-100">
          <ul className="space-y-3">
            {generalAdvice.map((advice, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-warm-700">
                  {settings.easyRead ? advice.easy : advice.standard}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Text to speech for key content */}
      <div className="mb-8">
        <TextToSpeech
          text={`Emergency information. Call 999 for life threatening emergencies. Call 111 for urgent but not emergency help. ${generalAdvice
            .map((a) => (settings.easyRead ? a.easy : a.standard))
            .join('. ')}`}
          label={settings.easyRead ? 'Read this page' : 'Read emergency information'}
        />
      </div>

      {/* Footer */}
      <div className="p-4 bg-warm-100 rounded-xl">
        <p className="text-sm text-warm-600">
          {settings.easyRead
            ? 'This page has important numbers. Save it on your phone or print it.'
            : 'Consider saving this page for offline access or printing for your records.'}
        </p>
      </div>
    </div>
  );
}
