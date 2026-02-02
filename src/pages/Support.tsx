import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  ExternalLink,
  Phone,
  Mail,
  Star,
  Filter,
  Search,
  Users,
  Building,
  Stethoscope,
  ArrowRight,
  Book,
  Smartphone,
  PoundSterling,
  HelpCircle,
  Gift,
  Home,
  Plus,
  MessageCircle,
  Calculator,
  Scale,
  BookOpen,
  Eye,
  Moon,
  Smile,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import { resources } from '../data/resources';
import type { ResourceCategory, AgeGroup } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  users: Users,
  building: Building,
  stethoscope: Stethoscope,
  'arrow-right': ArrowRight,
  book: Book,
  smartphone: Smartphone,
  'pound-sterling': PoundSterling,
  'help-circle': HelpCircle,
  gift: Gift,
  home: Home,
  plus: Plus,
  'message-circle': MessageCircle,
  calculator: Calculator,
  scale: Scale,
  'book-open': BookOpen,
  eye: Eye,
  moon: Moon,
  smile: Smile,
  phone: Phone,
};

const categoryLabels: Record<ResourceCategory, { standard: string; easy: string; icon: React.ComponentType<{ className?: string }> }> = {
  'local-support': { standard: 'Local Support', easy: 'Help Near You', icon: Home },
  'national-charity': { standard: 'National Charities', easy: 'Big Charities', icon: Heart },
  'health-medical': { standard: 'Health & Medical', easy: 'Health Information', icon: Stethoscope },
  'transition-adulthood': { standard: 'Transition & Adulthood', easy: 'Becoming an Adult', icon: ArrowRight },
  'education-learning': { standard: 'Education & Learning', easy: 'School and Learning', icon: Book },
  'apps-digital': { standard: 'Apps & Digital', easy: 'Helpful Apps', icon: Smartphone },
  'benefits-financial': { standard: 'Benefits & Financial', easy: 'Money Help', icon: PoundSterling },
};

const ageGroupLabels: Record<AgeGroup, { standard: string; easy: string }> = {
  'early-years': { standard: 'Early Years (0-5)', easy: 'Babies and Toddlers' },
  'school-age': { standard: 'School Age (5-18)', easy: 'School Children' },
  transitions: { standard: 'Transitions (14+)', easy: 'Teenagers' },
  adults: { standard: 'Adults (18+)', easy: 'Grown-ups' },
  'all-ages': { standard: 'All Ages', easy: 'Everyone' },
};

export default function Support() {
  const { settings } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'all'>('all');
  const [showLocalOnly, setShowLocalOnly] = useState(false);

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === '' ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

    const matchesAgeGroup =
      selectedAgeGroup === 'all' ||
      resource.ageGroups.includes(selectedAgeGroup) ||
      resource.ageGroups.includes('all-ages');

    const matchesLocal = !showLocalOnly || resource.isLocal;

    return matchesSearch && matchesCategory && matchesAgeGroup && matchesLocal;
  });

  // Get featured resources
  const featuredResources = resources.filter((r) => r.isFeatured);

  const pageDescription = settings.easyRead
    ? 'Find charities and organisations that can help you and your family.'
    : 'Local and national organisations offering support, information, and resources for families affected by Down Syndrome.';

  const categories = Object.keys(categoryLabels) as ResourceCategory[];
  const ageGroups = Object.keys(ageGroupLabels) as AgeGroup[];

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <Heart className="w-8 h-8 text-accent-500" />
          {settings.easyRead ? 'Help & Support' : 'Support & Resources'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="mb-8">
          <h2 className="font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-accent-500" />
            {settings.easyRead ? 'Top Resources' : 'Featured Resources'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredResources.slice(0, 4).map((resource) => {
              const ResourceIcon = iconMap[resource.icon] || Heart;
              return (
                <a
                  key={resource.id}
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-interactive bg-gradient-to-br from-accent-50/50 to-white border-accent-100 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center flex-shrink-0">
                      <ResourceIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-warm-900 group-hover:text-accent-700">
                          {resource.name}
                        </h3>
                        {resource.isLocal && (
                          <span className="badge bg-primary-100 text-primary-700 text-xs">Local</span>
                        )}
                      </div>
                      <p className="text-sm text-warm-600 line-clamp-2 mt-1">
                        {settings.easyRead ? resource.descriptionEasyRead : resource.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-warm-400 flex-shrink-0" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
          <input
            type="text"
            placeholder={settings.easyRead ? 'Search for help...' : 'Search resources...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-warm-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | 'all')}
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

          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup | 'all')}
            className="form-input py-2 pr-8"
          >
            <option value="all">{settings.easyRead ? 'All Ages' : 'All Ages'}</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>
                {settings.easyRead ? ageGroupLabels[age].easy : ageGroupLabels[age].standard}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLocalOnly}
              onChange={(e) => setShowLocalOnly(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm text-warm-700">
              {settings.easyRead ? 'Local only' : 'Local resources only'}
            </span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-warm-500 mb-4">
        {settings.easyRead
          ? `Found ${filteredResources.length} resources`
          : `Showing ${filteredResources.length} of ${resources.length} resources`}
      </p>

      {/* Resources by category */}
      {selectedCategory === 'all' && !searchQuery ? (
        // Grouped view
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryResources = filteredResources.filter((r) => r.category === category);
            if (categoryResources.length === 0) return null;

            const CategoryIcon = categoryLabels[category].icon;

            return (
              <div key={category}>
                <h2 className="font-semibold text-warm-800 mb-4 flex items-center gap-2">
                  <CategoryIcon className="w-5 h-5 text-primary-500" />
                  {settings.easyRead
                    ? categoryLabels[category].easy
                    : categoryLabels[category].standard}
                </h2>
                <div className="space-y-3">
                  {categoryResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} settings={settings} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat list view
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} settings={settings} />
          ))}
        </div>
      )}

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-warm-300 mx-auto mb-4" />
          <p className="text-warm-500">
            {settings.easyRead
              ? 'No resources found. Try a different search.'
              : 'No resources match your search criteria.'}
          </p>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 p-4 bg-warm-100 rounded-xl">
        <p className="text-sm text-warm-600">
          {settings.easyRead
            ? 'Know of another helpful organisation? Tell us about it!'
            : 'If you know of a resource that should be included, please contact the pathway team.'}
        </p>
      </div>
    </div>
  );
}

function ResourceCard({ resource, settings }: { resource: typeof resources[0]; settings: { easyRead: boolean } }) {
  const ResourceIcon = iconMap[resource.icon] || Heart;

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-warm-100 text-warm-600 flex items-center justify-center flex-shrink-0">
          <ResourceIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-warm-900">{resource.name}</h3>
            {resource.isLocal && (
              <span className="badge bg-primary-100 text-primary-700 text-xs">Local</span>
            )}
            {resource.isFeatured && (
              <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
            )}
          </div>

          <p className="text-sm text-warm-600 mb-3">
            {settings.easyRead ? resource.descriptionEasyRead : resource.description}
          </p>

          {/* Age groups */}
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.ageGroups.map((age) => (
              <span key={age} className="badge bg-warm-100 text-warm-600 text-xs">
                {settings.easyRead ? ageGroupLabels[age].easy : ageGroupLabels[age].standard}
              </span>
            ))}
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap gap-3">
            {resource.website && (
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
              >
                <ExternalLink className="w-4 h-4" />
                {settings.easyRead ? 'Visit website' : 'Website'}
              </a>
            )}
            {resource.phone && (
              <a
                href={`tel:${resource.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
              >
                <Phone className="w-4 h-4" />
                {resource.phone}
              </a>
            )}
            {resource.email && (
              <a
                href={`mailto:${resource.email}`}
                className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
              >
                <Mail className="w-4 h-4" />
                {settings.easyRead ? 'Send email' : 'Email'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
