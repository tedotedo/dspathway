import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { UserRole } from './types';

// Pages
import Home from './pages/Home';
import Pathway from './pages/Pathway';
import Checklists from './pages/Checklists';
import Services from './pages/Services';
import Support from './pages/Support';
import Emergency from './pages/Emergency';
import MyInfo from './pages/MyInfo';
import About from './pages/About';

function AppContent() {
  const [role] = useLocalStorage<UserRole>('ds-pathway-role', null);

  return (
    <AccessibilityProvider userRole={role}>
      <Router>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="pathway" element={<Pathway />} />
            <Route path="checklists" element={<Checklists />} />
            <Route path="services" element={<Services />} />
            <Route path="support" element={<Support />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="my-info" element={<MyInfo />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </AccessibilityProvider>
  );
}

export default function App() {
  return <AppContent />;
}
