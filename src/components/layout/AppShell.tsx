import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Route,
  ClipboardList,
  Building2,
  Heart,
  AlertCircle,
  User,
  Info,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { AccessibilityPanel } from '../accessibility/AccessibilityPanel';
import { EasyReadToggle } from '../accessibility/EasyReadToggle';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home', labelEasy: 'Home' },
  { path: '/pathway', icon: Route, label: 'Pathway', labelEasy: 'My Journey' },
  { path: '/checklists', icon: ClipboardList, label: 'Checklists', labelEasy: 'Health Checks' },
  { path: '/services', icon: Building2, label: 'Services', labelEasy: 'Who Can Help' },
  { path: '/support', icon: Heart, label: 'Support', labelEasy: 'Help & Support' },
];

const secondaryNavItems = [
  { path: '/emergency', icon: AlertCircle, label: 'Emergency', labelEasy: 'Emergency Help', emergency: true },
  { path: '/my-info', icon: User, label: 'My Info', labelEasy: 'About Me' },
  { path: '/about', icon: Info, label: 'About', labelEasy: 'About This App' },
];

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useAccessibility();

  const getLabel = (item: { label: string; labelEasy: string }) => {
    return settings.easyRead ? item.labelEasy : item.label;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-warm-200 fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-warm-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
              DS
            </div>
            <div>
              <h1 className="font-bold text-warm-900 leading-tight">
                {settings.easyRead ? 'DS Pathway' : 'Down Syndrome'}
              </h1>
              <p className="text-xs text-warm-500">Stockton & Hartlepool</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
            >
              <item.icon className="w-5 h-5" />
              {getLabel(item)}
            </NavLink>
          ))}

          <hr className="my-4 border-warm-200" />

          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''} ${
                  item.emergency ? 'text-emergency-600 hover:bg-emergency-50' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {getLabel(item)}
            </NavLink>
          ))}
        </nav>

        {/* Easy Read Toggle - Always Visible */}
        <div className="p-4 border-t border-warm-200">
          <EasyReadToggle showLabel={true} />
        </div>

        {/* More Accessibility Settings */}
        <div className="px-4 pb-2">
          <AccessibilityPanel />
        </div>

        {/* Copyright Footer */}
        <div className="p-4 border-t border-warm-200 text-center">
          <p className="text-[10px] text-warm-400 leading-relaxed">
            © {new Date().getFullYear()} Dr Odet Mark Aszkenasy
            <br />
            FRCP, DA, DCH, MFPHM
            <br />
            Consultant Paediatrician
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-warm-200 safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
              DS
            </div>
            <span className="font-semibold text-warm-900">
              {settings.easyRead ? 'DS Pathway' : 'DS Pathway'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <EasyReadToggle showLabel={false} compact={true} />
            <AccessibilityPanel />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="btn-ghost p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-up">
            <div className="p-4 border-b border-warm-200 flex items-center justify-between">
              <span className="font-semibold text-warm-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ghost p-2"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {/* Easy Read Toggle - Prominent in drawer */}
              <div className="mb-4">
                <EasyReadToggle showLabel={true} />
              </div>

              {[...navItems, ...secondaryNavItems].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'nav-item-active' : ''} ${
                      'emergency' in item && item.emergency
                        ? 'text-emergency-600 hover:bg-emergency-50'
                        : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {getLabel(item)}
                </NavLink>
              ))}
            </nav>

            {/* Copyright Footer - Mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-200 bg-white text-center">
              <p className="text-[10px] text-warm-400 leading-relaxed">
                © {new Date().getFullYear()} Dr Odet Mark Aszkenasy, FRCP, DA, DCH, MFPHM
                <br />
                Consultant Paediatrician
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 shadow-nav safe-bottom z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 3).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-warm-500 hover:text-warm-700'
                }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium">
                  {settings.easyRead ? item.labelEasy.split(' ')[0] : item.label}
                </span>
              </NavLink>
            );
          })}
          {/* Easy Read Toggle in Bottom Nav */}
          <EasyReadToggle compact={true} showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-warm-500 hover:text-warm-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
