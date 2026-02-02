import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Search,
  Filter,
  Stethoscope,
  Ear,
  Eye,
  MessageCircle,
  Activity,
  Heart,
  HeartPulse,
  Moon,
  ArrowRight,
  Utensils,
  Hand,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import { services } from '../data/services';
import type { ServiceCategory } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  ear: Ear,
  eye: Eye,
  'message-circle': MessageCircle,
  activity: Activity,
  heart: Heart,
  'heart-pulse': HeartPulse,
  moon: Moon,
  'arrow-right': ArrowRight,
  utensils: Utensils,
  hand: Hand,
};

const categoryLabels: Record<ServiceCategory, { standard: string; easy: string }> = {
  paediatrics: { standard: 'Paediatrics', easy: 'Doctors for Children' },
  audiology: { standard: 'Audiology', easy: 'Hearing' },
  ophthalmology: { standard: 'Ophthalmology', easy: 'Eyes' },
  'speech-language': { standard: 'Speech & Language', easy: 'Talking and Eating' },
  'occupational-therapy': { standard: 'Occupational Therapy', easy: 'Everyday Skills' },
  physiotherapy: { standard: 'Physiotherapy', easy: 'Moving and Exercise' },
  dietetics: { standard: 'Dietetics', easy: 'Food and Eating' },
  'health-visiting': { standard: 'Health Visiting', easy: 'Health Visitors' },
  sleep: { standard: 'Sleep Services', easy: 'Sleep Help' },
  ent: { standard: 'ENT', easy: 'Ears, Nose and Throat' },
};

const areaLabels = {
  stockton: 'Stockton',
  hartlepool: 'Hartlepool',
  both: 'Both Areas',
};

export default function Services() {
  const { settings } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedArea, setSelectedArea] = useState<'stockton' | 'hartlepool' | 'all'>('all');

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;

    const matchesArea =
      selectedArea === 'all' ||
      service.areas.includes(selectedArea) ||
      service.areas.includes('both');

    return matchesSearch && matchesCategory && matchesArea;
  });

  const pageDescription = settings.easyRead
    ? 'Find people who can help you in Stockton and Hartlepool.'
    : 'Contact details for NHS services involved in the Down Syndrome pathway for Stockton and Hartlepool.';

  const categories = Object.keys(categoryLabels) as ServiceCategory[];

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <Building2 className="w-8 h-8 text-support-500" />
          {settings.easyRead ? 'Who Can Help' : 'Services Directory'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
          <input
            type="text"
            placeholder={settings.easyRead ? 'Search for help...' : 'Search services...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-warm-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
              className="form-input py-2 pr-8"
            >
              <option value="all">{settings.easyRead ? 'All Types' : 'All Categories'}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {settings.easyRead ? categoryLabels[cat].easy : categoryLabels[cat].standard}
                </option>
              ))}
            </select>
          </div>

          {/* Area filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value as 'stockton' | 'hartlepool' | 'all')}
            className="form-input py-2 pr-8"
          >
            <option value="all">{settings.easyRead ? 'All Areas' : 'All Areas'}</option>
            <option value="stockton">Stockton</option>
            <option value="hartlepool">Hartlepool</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-warm-500 mb-4">
        {settings.easyRead
          ? `Found ${filteredServices.length} services`
          : `Showing ${filteredServices.length} of ${services.length} services`}
      </p>

      {/* Services list */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const ServiceIcon = iconMap[service.icon] || Building2;
          const description = settings.easyRead ? service.descriptionEasyRead : service.description;

          return (
            <div key={service.id} id={service.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-support-100 text-support-600 flex items-center justify-center flex-shrink-0">
                  <ServiceIcon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-bold text-warm-900">{service.name}</h2>
                    <div className="flex flex-wrap gap-1">
                      {service.areas.map((area) => (
                        <span key={area} className="badge bg-warm-100 text-warm-600 text-xs">
                          {areaLabels[area]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-warm-600 mb-4">{description}</p>

                  {/* Contacts */}
                  <div className="space-y-2">
                    {service.contacts.map((contact, index) => {
                      const ContactIcon =
                        contact.type === 'phone'
                          ? Phone
                          : contact.type === 'email'
                          ? Mail
                          : contact.type === 'website'
                          ? Globe
                          : MapPin;

                      const href =
                        contact.type === 'phone'
                          ? `tel:${contact.value.replace(/\s/g, '')}`
                          : contact.type === 'email'
                          ? `mailto:${contact.value}`
                          : contact.type === 'website'
                          ? contact.value
                          : undefined;

                      return (
                        <a
                          key={index}
                          href={href}
                          target={contact.type === 'website' ? '_blank' : undefined}
                          rel={contact.type === 'website' ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                        >
                          <ContactIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">
                            {contact.label && <span className="text-warm-500 mr-2">{contact.label}:</span>}
                            {contact.value}
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  {/* Referral info */}
                  {service.referralInfo && (
                    <div className="mt-4 p-3 bg-warm-50 rounded-lg">
                      <p className="text-sm text-warm-600">
                        <span className="font-medium">
                          {settings.easyRead ? 'How to get this help: ' : 'Referral: '}
                        </span>
                        {service.referralInfo}
                      </p>
                    </div>
                  )}

                  {/* Age range */}
                  {service.ageRange && (
                    <p className="text-sm text-warm-500 mt-2">
                      {settings.easyRead ? `For ages: ${service.ageRange}` : `Age range: ${service.ageRange}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-warm-300 mx-auto mb-4" />
            <p className="text-warm-500">
              {settings.easyRead
                ? 'No services found. Try a different search.'
                : 'No services match your search criteria.'}
            </p>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
        <p className="text-sm text-primary-800">
          {settings.easyRead
            ? 'If you need help urgently, call 999 or go to A&E.'
            : 'For urgent medical concerns, contact 111 or visit A&E. This directory is for routine referrals and enquiries.'}
        </p>
      </div>
    </div>
  );
}
