import { useState, useEffect } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const STORAGE_KEY = 'ds-pathway-disclaimer-accepted';

export function MedicalDisclaimer() {
  const [visible, setVisible] = useState(false);
  const { settings } = useAccessibility();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    document.body.style.overflow = '';
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-warm-100/95 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto p-6 sm:p-8 text-center max-h-[90vh] overflow-y-auto">
        <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-warm-800 mb-4 sm:mb-6">
          {settings.easyRead ? 'Important Information' : 'Medical Disclaimer'}
        </h2>

        <p className="text-sm sm:text-base text-warm-600 leading-relaxed mb-3 sm:mb-4">
          {settings.easyRead ? (
            <>
              This app gives you information about Down Syndrome support.{' '}
              <strong className="text-warm-800">Important:</strong> This is not medical advice.
            </>
          ) : (
            <>
              This app provides information about the Down Syndrome support pathway in Stockton and Hartlepool.{' '}
              <strong className="text-warm-800">IMPORTANT:</strong> This content does not constitute medical advice, diagnosis, or treatment recommendations.
            </>
          )}
        </p>

        <p className="text-sm sm:text-base text-warm-600 leading-relaxed mb-4 sm:mb-6">
          {settings.easyRead
            ? 'By pressing the button below, you agree that:'
            : 'By clicking "I Understand," you acknowledge that:'}
        </p>

        <ul className="text-left text-sm sm:text-base text-warm-600 space-y-2.5 mb-6 sm:mb-8 max-w-sm mx-auto">
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
            {settings.easyRead
              ? 'You will talk to your doctor before making health decisions'
              : 'You will consult your healthcare team before making any treatment decisions'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
            {settings.easyRead
              ? 'This information is to help you learn'
              : 'This information is for educational purposes only'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
            {settings.easyRead
              ? 'This app does not replace your doctor'
              : 'No doctor-patient relationship is established'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
            {settings.easyRead
              ? 'Everyone is different and needs their own medical advice'
              : 'Individual medical guidance from your healthcare team is essential'}
          </li>
        </ul>

        <button
          onClick={handleAccept}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-card hover:shadow-card-hover w-full sm:w-auto"
        >
          {settings.easyRead ? 'I Understand' : 'I Understand'}
        </button>
      </div>
    </div>
  );
}
