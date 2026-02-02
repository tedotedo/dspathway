import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AccessibilitySettings, UserRole } from '../types';

const defaultSettings: AccessibilitySettings = {
  easyRead: false,
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  speechRate: 1,
  autoPlayTTS: false,
};

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

interface AccessibilityProviderProps {
  children: ReactNode;
  userRole: UserRole;
}

export function AccessibilityProvider({ children, userRole }: AccessibilityProviderProps) {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'ds-pathway-accessibility',
    defaultSettings
  );

  // Auto-enable easy-read mode for young people
  useEffect(() => {
    if (userRole === 'young-person' && !settings.easyRead) {
      setSettings((prev) => ({ ...prev, easyRead: true }));
    }
  }, [userRole, settings.easyRead, setSettings]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;

    // Easy-read mode
    if (settings.easyRead) {
      root.classList.add('easy-read');
    } else {
      root.classList.remove('easy-read');
    }

    // Large text mode
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reduceMotion) {
      root.style.setProperty('--reduce-motion', 'reduce');
    } else {
      root.style.removeProperty('--reduce-motion');
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Text-to-speech functions
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speechRate;
      utterance.lang = 'en-GB';

      // Try to use a British English voice
      const voices = window.speechSynthesis.getVoices();
      const britishVoice = voices.find(
        (voice) => voice.lang === 'en-GB' || voice.lang.startsWith('en-GB')
      );
      if (britishVoice) {
        utterance.voice = britishVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const isSpeaking = useMemo(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }, []);

  const value: AccessibilityContextValue = {
    settings,
    updateSettings,
    resetSettings,
    speak,
    stopSpeaking,
    isSpeaking,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
