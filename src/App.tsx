import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { InicioView } from './components/views/InicioView';
import { CardsView } from './components/views/CardsView';
import { QuestoesView } from './components/views/QuestoesView';
import { ResumosView } from './components/views/ResumosView';
import { ChecklistView } from './components/views/ChecklistView';
import { ProgressoView } from './components/views/ProgressoView';
import { ModoFocoView } from './components/views/ModoFocoView';
import { SprintView } from './components/views/SprintView';
import { ConfiguracoesView } from './components/views/ConfiguracoesView';
import { SuporteView } from './components/views/SuporteView';
import { InstallAppModal } from './components/InstallAppModal';

const MainContent: React.FC = () => {
  const { user, currentView, isInstallModalOpen, setIsInstallModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is not authenticated, show login/register modal
  if (!user) {
    return <AuthModal />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'inicio':
        return <InicioView />;
      case 'cards':
        return <CardsView />;
      case 'questoes':
        return <QuestoesView />;
      case 'resumos':
        return <ResumosView />;
      case 'checklist':
        return <ChecklistView />;
      case 'progresso':
        return <ProgressoView />;
      case 'foco':
        return <ModoFocoView />;
      case 'sprint':
        return <SprintView />;
      case 'configuracoes':
        return <ConfiguracoesView />;
      case 'suporte':
        return <SuporteView />;
      default:
        return <InicioView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050B14] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-[#060D17] shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* PWA / Add to Home Screen Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
