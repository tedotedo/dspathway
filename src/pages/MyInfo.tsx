import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Save, Trash2, Calendar, Baby } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AgeStage } from '../types';

interface MyInfoData {
  childName: string;
  childDob: string;
  currentStage: AgeStage | '';
  notes: string;
}

const defaultData: MyInfoData = {
  childName: '',
  childDob: '',
  currentStage: '',
  notes: '',
};

const stageOptions: { value: AgeStage | ''; label: string; labelEasy: string }[] = [
  { value: '', label: 'Select stage', labelEasy: 'Choose one' },
  { value: 'antenatal', label: 'Before Birth (Antenatal)', labelEasy: 'Before Baby Born' },
  { value: 'birth', label: 'At Birth (0-6 weeks)', labelEasy: 'Just Born' },
  { value: 'birth-to-3', label: 'Birth to 3 Years', labelEasy: '0-3 Years' },
  { value: '3-to-5', label: '3 to 5 Years', labelEasy: '3-5 Years' },
  { value: '5-to-11', label: '5 to 11 Years (Primary)', labelEasy: 'Primary School' },
  { value: '11-to-18', label: '11 to 18 Years (Secondary)', labelEasy: 'Secondary School' },
  { value: 'transitions', label: 'Transitions (14+)', labelEasy: 'Becoming Adult' },
];

export default function MyInfo() {
  const { settings } = useAccessibility();
  const [data, setData] = useLocalStorage<MyInfoData>('ds-pathway-myinfo', defaultData);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleChange = (field: keyof MyInfoData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setShowSaved(false);
  };

  const handleSave = () => {
    // Data is already saved via useLocalStorage, this just shows feedback
    setHasChanges(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleClear = () => {
    if (window.confirm(settings.easyRead ? 'Delete all your information?' : 'Are you sure you want to clear all your information?')) {
      setData(defaultData);
      setHasChanges(false);
    }
  };

  const pageDescription = settings.easyRead
    ? 'Save information about yourself or your child. This stays private on your phone.'
    : 'Store personal notes and information. All data is saved locally on your device and never shared.';

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <User className="w-8 h-8 text-primary-500" />
          {settings.easyRead ? 'About Me' : 'My Information'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* Form */}
      <div className="card mb-6">
        <div className="space-y-6">
          {/* Child's Name */}
          <div>
            <label htmlFor="childName" className="form-label flex items-center gap-2">
              <Baby className="w-4 h-4 text-warm-500" />
              {settings.easyRead ? 'Name' : "Child's Name"}
            </label>
            <input
              type="text"
              id="childName"
              value={data.childName}
              onChange={(e) => handleChange('childName', e.target.value)}
              placeholder={settings.easyRead ? 'Your name' : "Enter child's name"}
              className="form-input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="childDob" className="form-label flex items-center gap-2">
              <Calendar className="w-4 h-4 text-warm-500" />
              {settings.easyRead ? 'Birthday' : 'Date of Birth'}
            </label>
            <input
              type="date"
              id="childDob"
              value={data.childDob}
              onChange={(e) => handleChange('childDob', e.target.value)}
              className="form-input"
            />
          </div>

          {/* Current Stage */}
          <div>
            <label htmlFor="currentStage" className="form-label">
              {settings.easyRead ? 'Where are you in the pathway?' : 'Current Pathway Stage'}
            </label>
            <select
              id="currentStage"
              value={data.currentStage}
              onChange={(e) => handleChange('currentStage', e.target.value)}
              className="form-input"
            >
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {settings.easyRead ? option.labelEasy : option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="form-label">
              {settings.easyRead ? 'My Notes' : 'Personal Notes'}
            </label>
            <textarea
              id="notes"
              value={data.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder={settings.easyRead ? 'Write anything you want to remember...' : 'Add any notes, upcoming appointments, or things to remember...'}
              rows={6}
              className="form-input resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-warm-200">
            <button
              onClick={handleClear}
              className="btn-ghost text-warm-500 hover:text-emergency-600"
            >
              <Trash2 className="w-4 h-4" />
              {settings.easyRead ? 'Delete All' : 'Clear All'}
            </button>

            <div className="flex items-center gap-3">
              {showSaved && (
                <span className="text-sm text-support-600 animate-fade-in">
                  {settings.easyRead ? 'Saved!' : 'Changes saved'}
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className="btn-primary"
              >
                <Save className="w-4 h-4" />
                {settings.easyRead ? 'Save' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="p-4 bg-support-50 rounded-xl border border-support-100">
        <h3 className="font-semibold text-support-800 mb-2">
          {settings.easyRead ? 'Your information is private' : 'Privacy Notice'}
        </h3>
        <p className="text-sm text-support-700">
          {settings.easyRead
            ? 'Everything you write here stays on your phone. Nobody else can see it.'
            : 'All information is stored locally on your device only. Nothing is sent to any server or shared with anyone. Your data remains completely private.'}
        </p>
      </div>
    </div>
  );
}
