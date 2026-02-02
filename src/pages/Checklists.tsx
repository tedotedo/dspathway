import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Printer,
  MessageCircle,
  Stethoscope,
  TestTube,
  ArrowRight,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { UserRole, Checklist, ChecklistCategory } from '../types';

// Simplified checklists data - in a real app this would be more comprehensive
const checklists: Checklist[] = [
  {
    id: '3-month',
    title: '3 Month Review',
    titleEasyRead: '3 Month Check-up',
    ageRange: '3 months',
    sections: [
      {
        title: 'Discussion',
        titleEasyRead: 'Things to Talk About',
        items: [
          { id: '3m-d1', text: 'Feeding and growth', textEasyRead: 'How is feeding going?', category: 'discussion' },
          { id: '3m-d2', text: 'Gastro-oesophageal reflux symptoms', textEasyRead: 'Does baby bring up milk a lot?', category: 'discussion' },
          { id: '3m-d3', text: 'Bowel problems', textEasyRead: 'Any tummy problems?', category: 'discussion' },
          { id: '3m-d4', text: 'Sucking and swallowing difficulties', textEasyRead: 'Any problems with feeding?', category: 'discussion' },
          { id: '3m-d5', text: 'Family adjustment to diagnosis', textEasyRead: 'How is your family coping?', category: 'discussion' },
        ],
      },
      {
        title: 'Examination',
        titleEasyRead: 'What the Doctor Checks',
        items: [
          { id: '3m-e1', text: 'Hearing and vision check', textEasyRead: 'Can baby hear and see?', category: 'examination' },
          { id: '3m-e2', text: 'Check for unusual infections', textEasyRead: 'Has baby been poorly?', category: 'examination' },
          { id: '3m-e3', text: 'Plot growth on Down Syndrome chart', textEasyRead: 'Measure weight and height', category: 'examination' },
        ],
      },
      {
        title: 'Referrals',
        titleEasyRead: 'Other Appointments Needed',
        items: [
          { id: '3m-r1', text: 'Physiotherapy notification', textEasyRead: 'Arrange to see the physio', category: 'referral' },
          { id: '3m-r2', text: 'Discuss DLA application', textEasyRead: 'Information about extra money help', category: 'referral' },
          { id: '3m-r3', text: 'Genetic counselling if parents wish', textEasyRead: 'Talk about genetics if you want', category: 'referral' },
          { id: '3m-r4', text: 'SALT referral if communication concerns', textEasyRead: 'Speech therapy if worried about talking', category: 'referral' },
        ],
      },
    ],
  },
  {
    id: '6-month',
    title: '6 Month Review',
    titleEasyRead: '6 Month Check-up',
    ageRange: '6 months',
    sections: [
      {
        title: 'Discussion',
        titleEasyRead: 'Things to Talk About',
        items: [
          { id: '6m-d1', text: 'As for 3 months plus immunisation discussion', textEasyRead: 'Same as 3 months plus vaccines', category: 'discussion' },
          { id: '6m-d2', text: 'Annual influenza vaccine advice', textEasyRead: 'Flu jab each year', category: 'discussion' },
          { id: '6m-d3', text: 'Reinforce support network (PADS, DSNE, PCF)', textEasyRead: 'Groups that can help you', category: 'discussion' },
        ],
      },
      {
        title: 'Referrals',
        titleEasyRead: 'Other Appointments Needed',
        items: [
          { id: '6m-r1', text: 'Check newborn hearing screen results known', textEasyRead: 'Make sure hearing test done', category: 'referral' },
          { id: '6m-r2', text: 'Inform Pre-school education team', textEasyRead: 'Tell the nursery team', category: 'referral' },
          { id: '6m-r3', text: 'Physiotherapy if motor concerns', textEasyRead: 'Physio if worried about movement', category: 'referral' },
        ],
      },
    ],
  },
  {
    id: '1-year',
    title: '1 Year Review',
    titleEasyRead: '1 Year Check-up',
    ageRange: '12 months',
    sections: [
      {
        title: 'Discussion',
        titleEasyRead: 'Things to Talk About',
        items: [
          { id: '1y-d1', text: 'Developmental progress', textEasyRead: 'How is your child learning and growing?', category: 'discussion' },
          { id: '1y-d2', text: 'General health including respiratory, cardiac, bowel symptoms', textEasyRead: 'Any health worries?', category: 'discussion' },
          { id: '1y-d3', text: 'Sleep-related upper airway obstruction', textEasyRead: 'Does your child snore or stop breathing at night?', category: 'discussion' },
          { id: '1y-d4', text: 'DLA and benefits signposting', textEasyRead: 'Help with money and benefits', category: 'discussion' },
          { id: '1y-d5', text: 'Cervical spine instability information', textEasyRead: 'Information about neck safety', category: 'discussion' },
        ],
      },
      {
        title: 'Examination',
        titleEasyRead: 'What the Doctor Checks',
        items: [
          { id: '1y-e1', text: 'Cardiovascular examination', textEasyRead: 'Check the heart', category: 'examination' },
          { id: '1y-e2', text: 'Neurological - cervical spine signs', textEasyRead: 'Check the neck', category: 'examination' },
          { id: '1y-e3', text: 'ENT - middle ear disease, airway obstruction', textEasyRead: 'Check ears, nose and throat', category: 'examination' },
          { id: '1y-e4', text: 'Eyes - squint, cataract, nystagmus', textEasyRead: 'Check the eyes', category: 'examination' },
          { id: '1y-e5', text: 'Hips, knees, foot position', textEasyRead: 'Check legs and feet', category: 'examination' },
          { id: '1y-e6', text: 'Growth on Down Syndrome charts', textEasyRead: 'Measure weight and height', category: 'examination' },
        ],
      },
      {
        title: 'Investigations',
        titleEasyRead: 'Tests Needed',
        items: [
          { id: '1y-i1', text: 'Audiological assessment (at least yearly)', textEasyRead: 'Hearing test', category: 'investigation' },
          { id: '1y-i2', text: 'Thyroid function tests (T4, TSH, autoantibodies)', textEasyRead: 'Blood test for thyroid', category: 'investigation' },
          { id: '1y-i3', text: 'Sleep study/oximetry if indicated', textEasyRead: 'Sleep test if needed', category: 'investigation' },
          { id: '1y-i4', text: 'Immune function if recurrent infections', textEasyRead: 'Blood test if lots of infections', category: 'investigation', professionalOnly: true },
        ],
      },
    ],
  },
  {
    id: '2-year',
    title: '2 Year Review',
    titleEasyRead: '2 Year Check-up',
    ageRange: '2 years',
    sections: [
      {
        title: 'Discussion',
        titleEasyRead: 'Things to Talk About',
        items: [
          { id: '2y-d1', text: 'As for 1 year review', textEasyRead: 'Same as 1 year', category: 'discussion' },
          { id: '2y-d2', text: 'Behaviour and emerging co-morbidities', textEasyRead: 'Any behaviour changes?', category: 'discussion' },
          { id: '2y-d3', text: 'Therapy and educational input', textEasyRead: 'Help from therapists and nursery', category: 'discussion' },
        ],
      },
      {
        title: 'Investigations',
        titleEasyRead: 'Tests Needed',
        items: [
          { id: '2y-i1', text: 'Audiological assessment', textEasyRead: 'Hearing test', category: 'investigation' },
          { id: '2y-i2', text: 'Thyroid function tests', textEasyRead: 'Blood test for thyroid', category: 'investigation' },
          { id: '2y-i3', text: 'Sleep study at 2 years for asymptomatic children', textEasyRead: 'Sleep test', category: 'investigation' },
          { id: '2y-i4', text: 'Low threshold for coeliac screening', textEasyRead: 'Blood test if tummy problems', category: 'investigation' },
          { id: '2y-i5', text: 'Ophthalmology referral', textEasyRead: 'Eye appointment', category: 'investigation' },
          { id: '2y-i6', text: 'Hip x-ray if not weight bearing', textEasyRead: 'Hip x-ray if not walking', category: 'investigation' },
        ],
      },
    ],
  },
  {
    id: 'annual',
    title: 'Annual School Age Review',
    titleEasyRead: 'Yearly Check-up (School Age)',
    ageRange: '5-18 years',
    sections: [
      {
        title: 'Discussion',
        titleEasyRead: 'Things to Talk About',
        items: [
          { id: 'an-d1', text: 'Developmental progress and general health', textEasyRead: 'How are things going?', category: 'discussion' },
          { id: 'an-d2', text: 'Coeliac disease symptoms (may present atypically)', textEasyRead: 'Any tummy problems?', category: 'discussion' },
          { id: 'an-d3', text: 'Unusual or recurrent infections', textEasyRead: 'Been poorly a lot?', category: 'discussion' },
          { id: 'an-d4', text: 'Behaviour', textEasyRead: 'Any behaviour changes?', category: 'discussion' },
          { id: 'an-d5', text: 'Dental care', textEasyRead: 'Looking after teeth', category: 'discussion' },
          { id: 'an-d6', text: 'Puberty, sex and relationship education', textEasyRead: 'Growing up', category: 'discussion' },
          { id: 'an-d7', text: 'Cervical spine instability advice', textEasyRead: 'Neck safety', category: 'discussion' },
          { id: 'an-d8', text: 'Benefits check (e.g., mobility bus pass)', textEasyRead: 'Money help check', category: 'discussion' },
        ],
      },
      {
        title: 'Examination',
        titleEasyRead: 'What the Doctor Checks',
        items: [
          { id: 'an-e1', text: 'Growth on DS chart (BMI if >75th centile)', textEasyRead: 'Check weight and height', category: 'examination' },
          { id: 'an-e2', text: 'Neurological - cervical spine signs', textEasyRead: 'Check the neck', category: 'examination' },
          { id: 'an-e3', text: 'ENT - middle ear, sleep apnoea', textEasyRead: 'Check ears and breathing', category: 'examination' },
          { id: 'an-e4', text: 'Eyes - squint, cataract, keratoconus', textEasyRead: 'Check the eyes', category: 'examination' },
          { id: 'an-e5', text: 'Cardiac status', textEasyRead: 'Check the heart', category: 'examination' },
          { id: 'an-e6', text: 'Orthopaedic - foot posture, scoliosis', textEasyRead: 'Check back and feet', category: 'examination' },
        ],
      },
      {
        title: 'Investigations',
        titleEasyRead: 'Tests Needed',
        items: [
          { id: 'an-i1', text: 'Audiology yearly', textEasyRead: 'Hearing test', category: 'investigation' },
          { id: 'an-i2', text: 'Ophthalmology yearly or optician', textEasyRead: 'Eye test', category: 'investigation' },
          { id: 'an-i3', text: 'Thyroid function every 2 years', textEasyRead: 'Blood test every 2 years', category: 'investigation' },
        ],
      },
    ],
  },
];

const categoryIcons: Record<ChecklistCategory, React.ComponentType<{ className?: string }>> = {
  discussion: MessageCircle,
  examination: Stethoscope,
  investigation: TestTube,
  referral: ArrowRight,
};

export default function Checklists() {
  const { settings } = useAccessibility();
  const [role] = useLocalStorage<UserRole>('ds-pathway-role', null);
  const [completedItems, setCompletedItems] = useLocalStorage<Record<string, string[]>>(
    'ds-pathway-checklists',
    {}
  );
  const [expandedChecklists, setExpandedChecklists] = useState<Set<string>>(new Set());

  const toggleChecklist = (checklistId: string) => {
    setExpandedChecklists((prev) => {
      const next = new Set(prev);
      if (next.has(checklistId)) {
        next.delete(checklistId);
      } else {
        next.add(checklistId);
      }
      return next;
    });
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    setCompletedItems((prev) => {
      const checklistCompleted = prev[checklistId] || [];
      if (checklistCompleted.includes(itemId)) {
        return {
          ...prev,
          [checklistId]: checklistCompleted.filter((id) => id !== itemId),
        };
      } else {
        return {
          ...prev,
          [checklistId]: [...checklistCompleted, itemId],
        };
      }
    });
  };

  const getCompletionCount = (checklist: Checklist) => {
    const completed = completedItems[checklist.id] || [];
    const total = checklist.sections.reduce(
      (sum, section) =>
        sum +
        section.items.filter((item) => !item.professionalOnly || role === 'professional').length,
      0
    );
    return { completed: completed.length, total };
  };

  const handlePrint = () => {
    window.print();
  };

  const pageDescription = settings.easyRead
    ? 'Lists of things to check at doctor appointments. You can tick things off as you go.'
    : 'Health review checklists for each age stage. Use these to prepare for appointments and track completed items.';

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link no-print">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-primary-500" />
              {settings.easyRead ? 'Health Checklists' : 'Review Checklists'}
            </h1>
            <p className="page-subtitle mt-2">{pageDescription}</p>
          </div>
          <button onClick={handlePrint} className="btn-secondary no-print">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{settings.easyRead ? 'Print' : 'Print'}</span>
          </button>
        </div>
        <div className="mt-3 no-print">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Checklists */}
      <div className="space-y-4">
        {checklists.map((checklist) => {
          const isExpanded = expandedChecklists.has(checklist.id);
          const { completed, total } = getCompletionCount(checklist);
          const progress = total > 0 ? (completed / total) * 100 : 0;

          return (
            <div key={checklist.id} id={checklist.id} className="card">
              <button
                onClick={() => toggleChecklist(checklist.id)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-bold text-warm-900">
                      {settings.easyRead ? checklist.titleEasyRead : checklist.title}
                    </h2>
                    <p className="text-sm text-warm-500">{checklist.ageRange}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-medium text-warm-700">
                        {completed}/{total}
                      </span>
                      <div className="w-20 h-2 bg-warm-200 rounded-full mt-1">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-warm-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-warm-400" />
                    )}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-warm-200 space-y-6 animate-fade-in">
                  {checklist.sections.map((section) => {
                    const CategoryIcon = categoryIcons[section.items[0]?.category || 'discussion'];

                    return (
                      <div key={section.title}>
                        <h3 className="font-semibold text-warm-800 mb-3 flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-primary-500" />
                          {settings.easyRead ? section.titleEasyRead : section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item) => {
                            // Hide professional-only items from non-professionals
                            if (item.professionalOnly && role !== 'professional') {
                              return null;
                            }

                            const isChecked = (completedItems[checklist.id] || []).includes(
                              item.id
                            );

                            return (
                              <li key={item.id}>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <div className="relative mt-0.5">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleItem(checklist.id, item.id)}
                                      className="form-checkbox"
                                    />
                                  </div>
                                  <span
                                    className={`text-warm-700 group-hover:text-warm-900 ${
                                      isChecked ? 'line-through text-warm-400' : ''
                                    }`}
                                  >
                                    {settings.easyRead ? item.textEasyRead : item.text}
                                    {item.professionalOnly && (
                                      <span className="ml-2 badge bg-warm-100 text-warm-500 text-xs">
                                        Professional
                                      </span>
                                    )}
                                  </span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-warm-100 rounded-xl no-print">
        <p className="text-sm text-warm-600">
          {settings.easyRead
            ? 'Your ticks are saved on this device. They will be here when you come back.'
            : 'Checklist progress is saved locally on this device. Print or screenshot for your records.'}
        </p>
      </div>
    </div>
  );
}
