import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface TextToSpeechProps {
  text: string;
  label?: string;
  className?: string;
  autoPlay?: boolean;
}

export function TextToSpeech({ text, label = 'Read aloud', className = '', autoPlay = false }: TextToSpeechProps) {
  const { settings, speak, stopSpeaking } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Handle auto-play
  useEffect(() => {
    if (autoPlay && settings.autoPlayTTS && text) {
      handlePlay();
    }
    // Cleanup on unmount
    return () => {
      if (isPlaying) {
        stopSpeaking();
      }
    };
  }, [autoPlay, settings.autoPlayTTS]); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for speech end
  useEffect(() => {
    const handleEnd = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    if ('speechSynthesis' in window) {
      // Poll for speaking state since there's no reliable end event
      const interval = setInterval(() => {
        if (!window.speechSynthesis.speaking && isPlaying) {
          handleEnd();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlay = useCallback(() => {
    if (isPaused && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speak(text);
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [isPaused, speak, text]);

  const handlePause = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    stopSpeaking();
    setIsPlaying(false);
    setIsPaused(false);
  }, [stopSpeaking]);

  // Don't render if speech synthesis not supported
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {!isPlaying && !isPaused && (
        <button
          onClick={handlePlay}
          className="btn-ghost flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          aria-label={label}
        >
          <Volume2 className="w-5 h-5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      )}

      {isPlaying && (
        <button
          onClick={handlePause}
          className="btn-ghost flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          aria-label="Pause reading"
        >
          <Pause className="w-5 h-5" />
          <span className="hidden sm:inline">Pause</span>
        </button>
      )}

      {isPaused && (
        <button
          onClick={handlePlay}
          className="btn-ghost flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          aria-label="Resume reading"
        >
          <Play className="w-5 h-5" />
          <span className="hidden sm:inline">Resume</span>
        </button>
      )}

      {(isPlaying || isPaused) && (
        <button
          onClick={handleStop}
          className="btn-ghost flex items-center gap-2 text-sm text-warm-500 hover:text-warm-700"
          aria-label="Stop reading"
        >
          <VolumeX className="w-5 h-5" />
          <span className="hidden sm:inline">Stop</span>
        </button>
      )}

      {isPlaying && (
        <span className="text-xs text-primary-500 animate-pulse-soft">
          Reading...
        </span>
      )}
    </div>
  );
}
