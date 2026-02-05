import { Eye, EyeOff } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface EasyReadToggleProps {
  /** Show label text next to the toggle */
  showLabel?: boolean;
  /** Compact mode for tight spaces (e.g., bottom nav) */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function EasyReadToggle({
  showLabel = true,
  compact = false,
  className = ''
}: EasyReadToggleProps) {
  const { settings, updateSettings } = useAccessibility();
  const isEasyRead = settings.easyRead;

  const handleToggle = () => {
    updateSettings({ easyRead: !isEasyRead });
  };

  if (compact) {
    // Compact version for bottom nav
    return (
      <button
        onClick={handleToggle}
        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
          isEasyRead
            ? 'text-primary-600'
            : 'text-warm-500 hover:text-warm-700'
        } ${className}`}
        aria-label={isEasyRead ? 'Switch to normal mode' : 'Switch to easy read mode'}
        aria-pressed={isEasyRead}
      >
        {isEasyRead ? (
          <Eye className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <EyeOff className="w-6 h-6" />
        )}
        <span className="text-[10px] font-medium">
          {isEasyRead ? 'Easy' : 'Normal'}
        </span>
      </button>
    );
  }

  // Full toggle button with optional label
  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center gap-3 w-full px-4 py-3 rounded-xl
        transition-all duration-200
        ${isEasyRead
          ? 'bg-primary-100 text-primary-700 border-2 border-primary-300 shadow-sm'
          : 'bg-warm-100 text-warm-600 border-2 border-warm-200 hover:border-warm-300 hover:bg-warm-150'
        }
        ${className}
      `}
      aria-label={isEasyRead ? 'Switch to normal mode' : 'Switch to easy read mode'}
      aria-pressed={isEasyRead}
    >
      <div className={`
        p-2 rounded-lg transition-colors
        ${isEasyRead ? 'bg-primary-200' : 'bg-warm-200'}
      `}>
        {isEasyRead ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
      </div>

      {showLabel && (
        <div className="flex-1 text-left">
          <p className="font-semibold text-sm">
            {isEasyRead ? 'Easy Read: ON' : 'Easy Read: OFF'}
          </p>
          <p className="text-xs opacity-75">
            {isEasyRead ? 'Tap to use normal text' : 'Tap for simpler words'}
          </p>
        </div>
      )}

      {/* Visual toggle indicator */}
      <div className={`
        w-12 h-7 rounded-full p-1 transition-colors
        ${isEasyRead ? 'bg-primary-500' : 'bg-warm-300'}
      `}>
        <div className={`
          w-5 h-5 bg-white rounded-full shadow-sm
          transition-transform duration-200
          ${isEasyRead ? 'translate-x-5' : 'translate-x-0'}
        `} />
      </div>
    </button>
  );
}
