// User roles
export type UserRole = 'parent-carer' | 'young-person' | 'professional' | 'educator' | null;

// Accessibility settings
export interface AccessibilitySettings {
  easyRead: boolean;
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  speechRate: number;
  autoPlayTTS: boolean;
}

// Content with easy-read alternative
export interface ContentItem {
  standard: string;
  easyRead: string;
  icon?: string;
}

// Age stages in the pathway
export type AgeStage =
  | 'antenatal'
  | 'birth'
  | 'birth-to-3'
  | '3-to-5'
  | '5-to-11'
  | '11-to-18'
  | 'transitions';

// Service reference
export interface ServiceReference {
  id: string;
  name: string;
  icon: string;
}

// Pathway stage
export interface PathwayStage {
  id: AgeStage;
  title: string;
  titleEasyRead: string;
  ageRange: string;
  description: string;
  descriptionEasyRead: string;
  icon: string;
  colour: string;
  keyPoints: ContentItem[];
  services: ServiceReference[];
  checklistId?: string;
}

// Checklist types
export type ChecklistCategory = 'discussion' | 'examination' | 'investigation' | 'referral';

export interface ChecklistItem {
  id: string;
  text: string;
  textEasyRead: string;
  category: ChecklistCategory;
  professionalOnly?: boolean;
}

export interface ChecklistSection {
  title: string;
  titleEasyRead: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  titleEasyRead: string;
  ageRange: string;
  sections: ChecklistSection[];
}

// Service directory
export type ServiceCategory =
  | 'paediatrics'
  | 'audiology'
  | 'ophthalmology'
  | 'speech-language'
  | 'occupational-therapy'
  | 'physiotherapy'
  | 'dietetics'
  | 'health-visiting'
  | 'sleep'
  | 'ent';

export interface Contact {
  type: 'phone' | 'email' | 'website' | 'address';
  value: string;
  label?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  descriptionEasyRead: string;
  icon: string;
  category: ServiceCategory;
  contacts: Contact[];
  referralInfo?: string;
  ageRange?: string;
  areas: ('stockton' | 'hartlepool' | 'both')[];
}

// Resources
export type ResourceCategory =
  | 'local-support'
  | 'national-charity'
  | 'health-medical'
  | 'transition-adulthood'
  | 'education-learning'
  | 'apps-digital'
  | 'benefits-financial';

export type AgeGroup = 'early-years' | 'school-age' | 'transitions' | 'adults' | 'all-ages';

export interface Resource {
  id: string;
  name: string;
  description: string;
  descriptionEasyRead: string;
  category: ResourceCategory;
  ageGroups: AgeGroup[];
  icon: string;
  website?: string;
  phone?: string;
  email?: string;
  isLocal: boolean;
  isFeatured?: boolean;
}

// User data (stored locally)
export interface UserData {
  role: UserRole;
  childName?: string;
  childDob?: string;
  currentStage?: AgeStage;
  completedChecklists: Record<string, string[]>; // checklist ID -> completed item IDs
  favouriteResources: string[];
  notes?: string;
}
