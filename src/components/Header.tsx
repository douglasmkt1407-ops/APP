import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Bell,
  Flame,
  User,
  Sparkles,
  X,
  CheckCircle2,
  Clock,
  Smartphone,
  Download,
  Compass
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    currentView,
    setCurrentView,
    user,
    stats,
    inAppNotification,
    dismissInAppNotification,
    sendTestNotification,
    sessionEntryTime,
    sessionLastExitTime,
    sessionActiveSeconds,
    isSessionTracking,
    formatDurationHHMMSS,
    setIsInstallModalOpen,
    canInstallPwa,
    promptPwaInstall,
    startTour
  } = useApp();

  const getViewTitle = () => {
    switch (currentView) {
      case 'inicio':
        return 'Início';
      case 'cards':
        return 'Cards de Estudo (+100)';
      case 'questoes':
        return '10 Simulados Calibrados';
      case 'resumos':
        return 'Resumos Express Clicáveis';
      case 'checklist':
        return 'Checklist Diário';
      case 'progresso':
        return 'Meu Progresso & Gráficos';
      case 'sprint':
        return 'Sprint de 7 Dias';
      case 'configuracoes':
        return 'Configurações & Notificações';
      case 'suporte':
        return 'Suporte & Ajuda';
      default:
        return 'NEXTENF';
    }
  };

  return (
    <>
      {/* Toast Notification Banner (triggered via test notification or background timer) */}
      {inAppNotification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-[#0A182A] border-2 border-[#00E5A3] rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-start justify-between gap-3 animate-slideIn">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{inAppNotification.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {inAppNotification.body}
              </p>
            </div>
          </div>
          <button
            onClick={dismissInAppNotification}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <header className="h-16 border-b border-[#102238] bg-[#060D17]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#0F2238] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              {getViewTitle()}
            </h1>
            <p className="hidden sm:block text-[10px] text-slate-400 font-medium">
              NEXTENF • Técnico em Foco
            </p>
          </div>
        </div>

        {/* Right side stats & quick actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Automated Live Session Tracker (Entrada & Saída em tempo real) */}
          <button
            type="button"
            onClick={() => setCurrentView('progresso')}
            title={`Tempo Estudado em Tempo Real • Entrada: ${sessionEntryTime} • Última saída: ${sessionLastExitTime} • Clique para ver Meu Progresso`}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#091526] hover:bg-[#0c1c33] border border-[#142A46] hover:border-[#00E5A3]/40 text-xs font-semibold transition-all cursor-pointer group shadow-sm"
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <Clock
                className={`w-3.5 h-3.5 text-[#00E5A3] transition-transform ${
                  isSessionTracking ? 'animate-spin [animation-duration:8s]' : 'opacity-60'
                }`}
              />
            </div>
            <span className="font-mono text-[#00E5A3] font-bold text-xs tracking-tight">
              {formatDurationHHMMSS(sessionActiveSeconds)}
            </span>
            <span className="hidden xl:inline text-[10px] text-slate-400 group-hover:text-slate-300 font-normal">
              sessão
            </span>
          </button>

          {/* Consecutive days streak badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#091526] border border-[#142A46] text-xs font-bold text-slate-200">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{stats.consecutiveDays}</span>
            <span className="hidden sm:inline text-slate-400 font-normal">dias</span>
          </div>

          {/* Guided Tour Trigger Button */}
          <button
            type="button"
            onClick={startTour}
            title="Abrir Tour Guiado pela Plataforma"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0084FF]/10 hover:bg-[#0084FF]/20 border border-[#0084FF]/30 hover:border-[#0084FF] text-xs font-bold text-[#0084FF] transition-all cursor-pointer shadow-sm group"
          >
            <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline">Tour Guiado</span>
          </button>

          {/* Add to Home Screen / PWA button */}
          <button
            type="button"
            onClick={() => {
              if (canInstallPwa) {
                promptPwaInstall();
              } else {
                setIsInstallModalOpen(true);
              }
            }}
            title="Adicionar à Tela Inicial / Instalar App"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#00E5A3]/10 hover:bg-[#00E5A3]/20 border border-[#00E5A3]/30 hover:border-[#00E5A3] text-xs font-bold text-[#00E5A3] transition-all cursor-pointer shadow-sm group"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Instalar App</span>
          </button>

          {/* Quick notification test trigger */}
          <button
            onClick={sendTestNotification}
            title="Testar notificação"
            className="p-2 rounded-xl bg-[#091526] hover:bg-[#0F2238] border border-[#142A46] text-slate-400 hover:text-[#00E5A3] transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#00E5A3] absolute top-1.5 right-1.5 ring-2 ring-[#060D17]" />
          </button>

          {/* User profile capsule */}
          {user && (
            <button
              onClick={() => setCurrentView('configuracoes')}
              title="Acessar Perfil & Configurações"
              className="flex items-center gap-2 pl-2 border-l border-[#142A46] hover:opacity-85 transition-opacity text-left cursor-pointer"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#00E5A3] shadow-[0_0_10px_rgba(0,229,163,0.35)] shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5A3] to-[#0084FF] flex items-center justify-center font-bold text-slate-900 text-xs shadow-[0_0_10px_rgba(0,229,163,0.3)] shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-white block leading-tight">{user.name}</span>
                <span className="text-[10px] text-[#00E5A3] block leading-tight truncate max-w-[140px]">
                  {user.targetExam}
                </span>
              </div>
            </button>
          )}
        </div>
      </header>
    </>
  );
};
