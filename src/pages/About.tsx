import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  Download,
  Upload,
  Trash2,
  ExternalLink,
  Heart,
  Shield,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { TextToSpeech } from '../components/accessibility/TextToSpeech';

export default function About() {
  const { settings } = useAccessibility();

  const handleExportData = () => {
    const data: Record<string, string | null> = {};
    const keys = ['ds-pathway-role', 'ds-pathway-accessibility', 'ds-pathway-myinfo', 'ds-pathway-checklists'];

    keys.forEach((key) => {
      data[key] = localStorage.getItem(key);
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ds-pathway-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        Object.entries(data).forEach(([key, value]) => {
          if (value && typeof value === 'string') {
            localStorage.setItem(key, value);
          }
        });

        window.location.reload();
      } catch {
        alert(settings.easyRead ? 'Could not load file' : 'Error loading backup file');
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (
      window.confirm(
        settings.easyRead
          ? 'Delete all your saved data? This cannot be undone!'
          : 'Are you sure you want to delete all saved data? This action cannot be undone.'
      )
    ) {
      const keys = ['ds-pathway-role', 'ds-pathway-accessibility', 'ds-pathway-myinfo', 'ds-pathway-checklists'];
      keys.forEach((key) => localStorage.removeItem(key));
      window.location.reload();
    }
  };

  const pageDescription = settings.easyRead
    ? 'Information about this app and how to backup your data.'
    : 'About the Down Syndrome Pathway app, data management, and acknowledgements.';

  return (
    <div className="page-container">
      {/* Header */}
      <Link to="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        {settings.easyRead ? 'Go Back' : 'Back to Home'}
      </Link>

      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <Info className="w-8 h-8 text-primary-500" />
          {settings.easyRead ? 'About This App' : 'About'}
        </h1>
        <p className="page-subtitle mt-2">{pageDescription}</p>
        <div className="mt-3">
          <TextToSpeech text={pageDescription} />
        </div>
      </div>

      {/* About the App */}
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-card">
            DS
          </div>
          <div>
            <h2 className="text-xl font-bold text-warm-900">
              {settings.easyRead ? 'DS Pathway' : 'Down Syndrome Pathway'}
            </h2>
            <p className="text-warm-500">Stockton & Hartlepool</p>
            <p className="text-sm text-warm-400">Version 1.0.0</p>
          </div>
        </div>

        <p className="text-warm-600 mb-4">
          {settings.easyRead
            ? 'This app helps families and professionals find information about Down Syndrome support in Stockton and Hartlepool.'
            : 'A mobile-friendly guide to the Down Syndrome support pathway for children and young people in Stockton and Hartlepool. Created in partnership with families and healthcare professionals.'}
        </p>

        <div className="flex items-center gap-2 text-sm text-warm-500">
          <Heart className="w-4 h-4 text-accent-500" />
          {settings.easyRead
            ? 'Made with families and the NHS'
            : 'Co-produced with families and North Tees & Hartlepool NHS Foundation Trust'}
        </div>
      </div>

      {/* Data Management */}
      <div className="card mb-6">
        <h2 className="font-semibold text-warm-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-500" />
          {settings.easyRead ? 'Your Data' : 'Data Management'}
        </h2>

        <p className="text-sm text-warm-600 mb-4">
          {settings.easyRead
            ? 'Your information is saved on your phone only. You can save a copy or delete everything.'
            : 'All your data is stored locally on your device. You can export a backup or clear all data.'}
        </p>

        <div className="space-y-3">
          <button onClick={handleExportData} className="btn-secondary w-full justify-center">
            <Download className="w-4 h-4" />
            {settings.easyRead ? 'Save a Copy' : 'Export Backup'}
          </button>

          <button onClick={handleImportData} className="btn-secondary w-full justify-center">
            <Upload className="w-4 h-4" />
            {settings.easyRead ? 'Load from File' : 'Import Backup'}
          </button>

          <button
            onClick={handleClearData}
            className="btn-ghost w-full justify-center text-emergency-600 hover:bg-emergency-50"
          >
            <Trash2 className="w-4 h-4" />
            {settings.easyRead ? 'Delete Everything' : 'Clear All Data'}
          </button>
        </div>
      </div>

      {/* Acknowledgements */}
      <div className="card mb-6">
        <h2 className="font-semibold text-warm-900 mb-4">
          {settings.easyRead ? 'Thank You' : 'Acknowledgements'}
        </h2>

        <p className="text-sm text-warm-600 mb-4">
          {settings.easyRead
            ? 'This app was made by:'
            : 'This pathway was created in partnership with:'}
        </p>

        <ul className="space-y-2 text-sm text-warm-600">
          <li>• Stockton Parent Carer Forum</li>
          <li>• Hartlepool Parent Carer Forum</li>
          <li>• North Tees and Hartlepool NHS Foundation Trust</li>
          <li>• North East and North Cumbria Integrated Care Board</li>
          <li>• Down Syndrome North East (DSNE)</li>
          <li>• Positive About Down Syndrome (PADS)</li>
          <li>• Local parents and carers with lived experience</li>
        </ul>

        <p className="text-sm text-warm-500 mt-4">
          {settings.easyRead
            ? 'Ideas from Hull, Oxfordshire, and Bristol NHS teams helped make this.'
            : 'With thanks to Hull CCG, Oxfordshire NHS Foundation Trust, and Bristol NHS Trust for inspiration from their pathway work.'}
        </p>
      </div>

      {/* Links */}
      <div className="card mb-6">
        <h2 className="font-semibold text-warm-900 mb-4">
          {settings.easyRead ? 'More Information' : 'Useful Links'}
        </h2>

        <div className="space-y-3">
          <a
            href="https://northeastnorthcumbria.nhs.uk/our-work/down-syndrome-pathway-stockton-and-hartlepool/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors border border-primary-200"
          >
            <span className="text-primary-700 font-medium">
              {settings.easyRead ? 'Official NHS Pathway Website' : 'NHS Down Syndrome Pathway - Stockton & Hartlepool'}
            </span>
            <ExternalLink className="w-4 h-4 text-primary-500" />
          </a>

          <a
            href="https://www.dsmig.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors"
          >
            <span className="text-warm-700">
              {settings.easyRead ? 'Down Syndrome Medical Guidelines' : 'DSMIG Clinical Guidelines'}
            </span>
            <ExternalLink className="w-4 h-4 text-warm-400" />
          </a>
        </div>
      </div>

      {/* Privacy & Disclaimer */}
      <div className="p-4 bg-warm-100 rounded-xl">
        <h3 className="font-semibold text-warm-800 mb-2">
          {settings.easyRead ? 'Important' : 'Privacy & Disclaimer'}
        </h3>
        <p className="text-sm text-warm-600 mb-2">
          {settings.easyRead
            ? 'This app gives information but is not medical advice. Always talk to your doctor about your health.'
            : 'This app provides general information and does not constitute medical advice. Always consult your healthcare team for personalised guidance.'}
        </p>
        <p className="text-sm text-warm-600">
          {settings.easyRead
            ? 'We do not collect any of your personal information.'
            : 'No personal data is collected or transmitted. All information remains on your device.'}
        </p>
      </div>

      {/* Contact */}
      <div className="mt-6 text-center text-sm text-warm-500">
        <p>
          {settings.easyRead ? 'Found a mistake? ' : 'Report errors or suggest changes: '}
          <a
            href="mailto:nencicbtv.enquiries@nhs.net?subject=DS%20Pathway%20App%20Feedback"
            className="text-primary-600 hover:text-primary-700"
          >
            nencicbtv.enquiries@nhs.net
          </a>
        </p>
      </div>
    </div>
  );
}
