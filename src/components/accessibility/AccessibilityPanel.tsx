import { useState } from 'react';
import { Settings, X, Eye, Type, Volume2, Zap, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetSettings } = useAccessibility();

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-ghost p-2"
        aria-label="Accessibility settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Panel overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-auto shadow-xl animate-slide-up safe-bottom">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-warm-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-warm-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary-500" />
                Accessibility
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-ghost p-2 -mr-2"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings */}
            <div className="p-6 space-y-6">
              {/* Easy Read Mode */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-primary-50">
                  <Eye className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-warm-900">Easy Read Mode</p>
                      <p className="text-sm text-warm-500">
                        Simpler words, bigger text, more spacing
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.easyRead}
                      onChange={(e) => updateSettings({ easyRead: e.target.checked })}
                      className="form-checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* Large Text */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-accent-50">
                  <Type className="w-6 h-6 text-accent-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-warm-900">Large Text</p>
                      <p className="text-sm text-warm-500">
                        Make all text bigger
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.largeText}
                      onChange={(e) => updateSettings({ largeText: e.target.checked })}
                      className="form-checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-warm-100">
                  <Eye className="w-6 h-6 text-warm-700" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-warm-900">High Contrast</p>
                      <p className="text-sm text-warm-500">
                        Black text on white background
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={(e) => updateSettings({ highContrast: e.target.checked })}
                      className="form-checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-support-50">
                  <Zap className="w-6 h-6 text-support-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-warm-900">Reduce Motion</p>
                      <p className="text-sm text-warm-500">
                        Turn off animations
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.reduceMotion}
                      onChange={(e) => updateSettings({ reduceMotion: e.target.checked })}
                      className="form-checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* Speech Settings */}
              <div className="pt-4 border-t border-warm-200">
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-warm-900">Speech Settings</h3>
                </div>

                {/* Speech Rate */}
                <div className="mb-4">
                  <label className="form-label">
                    Reading Speed: {settings.speechRate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.speechRate}
                    onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <div className="flex justify-between text-xs text-warm-500 mt-1">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>

                {/* Auto-play TTS */}
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-medium text-warm-800">Auto-read pages</p>
                    <p className="text-sm text-warm-500">
                      Automatically read page content aloud
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoPlayTTS}
                    onChange={(e) => updateSettings({ autoPlayTTS: e.target.checked })}
                    className="form-checkbox"
                  />
                </label>
              </div>

              {/* Reset button */}
              <div className="pt-4 border-t border-warm-200">
                <button
                  onClick={resetSettings}
                  className="btn-secondary w-full justify-center"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
