import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';
import {
  Home,
  BookOpen,
  Zap,
  FileText,
  CheckSquare,
  TrendingUp,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Activity,
  Timer,
  Smartphone
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { currentView, setCurrentView, user, logout, setIsInstallModalOpen } = useApp();

  const navItems: { id: ViewType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'cards', label: 'Cards de Estudo', icon: BookOpen },
    { id: 'questoes', label: 'Questões', icon: Zap },
    { id: 'resumos', label: 'Resumos Express', icon: FileText },
    { id: 'checklist', label: 'Checklist Diário', icon: CheckSquare },
    { id: 'foco', label: 'Modo Foco', icon: Timer },
    { id: 'progresso', label: 'Meu Progresso', icon: TrendingUp },
    { id: 'sprint', label: 'Sprint de 7 Dias', icon: Calendar },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'suporte', label: 'Suporte', icon: HelpCircle }
  ];

  const handleNavClick = (id: ViewType) => {
    setCurrentView(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className="w-72 bg-[#060D17] border-r border-[#102238] flex flex-col justify-between h-full select-none text-slate-300">
      {/* Top Header & Logo */}
      <div className="p-6 pb-2">
        {/* Logo NEXTENF TÉCNICO EM FOCO */}
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => handleNavClick('inicio')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5A3] to-[#0084FF] p-[2px] shadow-[0_0_20px_rgba(0,229,163,0.3)]">
            <div className="w-full h-full bg-[#060D17] rounded-[10px] flex items-center justify-center font-black text-xl text-[#00E5A3] tracking-tighter">
              <span className="bg-gradient-to-r from-[#00E5A3] to-[#38BDF8] bg-clip-text text-transparent font-extrabold text-2xl">
                N<sup className="text-sm font-black -top-2 text-[#00E5A3]">+</sup>
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl tracking-tight text-white">NEXTENF</span>
            </div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#00E5A3] uppercase">
              Técnico em Foco
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#00E5A3] text-[#050B14] shadow-[0_4px_20px_rgba(0,229,163,0.35)] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-[#0D1B2D]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#050B14]' : 'text-[#00E5A3]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {item.id === 'foco' && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] border border-[#00E5A3]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3] animate-pulse" />
                    Foco
                  </span>
                )}
                {item.id === 'sprint' && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] border border-[#00E5A3]/30">
                    7 Dias
                  </span>
                )}
                {item.id === 'cards' && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    +150
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section with motto & lifeline */}
      <div className="p-6 pt-3 border-t border-[#102238]/60 space-y-4">
        {/* Motto + ECG lifeline exactly as in reference */}
        <div>
          <p className="text-xs font-medium text-slate-400 leading-relaxed">
            Disciplina hoje,
            <br />
            <span className="text-[#00E5A3] font-semibold">aprovação amanhã.</span>
          </p>

          {/* Glowing ECG Heartbeat waveform SVG */}
          <div className="mt-3 flex items-center text-[#00E5A3] opacity-80 hover:opacity-100 transition-opacity">
            <svg
              className="w-24 h-6 text-[#00E5A3] drop-shadow-[0_0_6px_rgba(0,229,163,0.6)]"
              viewBox="0 0 100 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12 H 25 L 30 4 L 35 20 L 40 7 L 45 15 L 50 12 H 98"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Add to home screen / install quick banner */}
        <button
          type="button"
          onClick={() => {
            setIsInstallModalOpen(true);
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full py-2 px-3 rounded-xl bg-[#091628] hover:bg-[#0E2038] border border-[#162D4A] hover:border-[#00E5A3]/40 text-xs text-[#00E5A3] font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-[#00E5A3]" />
            <span className="text-slate-200 text-[11px] group-hover:text-white">Instalar Aplicativo</span>
          </div>
          <span className="text-[10px] text-[#00E5A3] font-bold">Tela Inicial</span>
        </button>

        {/* User preview and logout */}
        {user && (
          <div className="flex items-center justify-between pt-3 border-t border-[#102238]/80 text-xs">
            <button
              onClick={() => handleNavClick('configuracoes')}
              title="Acessar Configurações do Perfil"
              className="flex items-center gap-2.5 overflow-hidden text-left hover:opacity-85 transition-opacity cursor-pointer group"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#00E5A3]/50 shadow-[0_0_8px_rgba(0,229,163,0.25)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5A3] to-[#0084FF] flex items-center justify-center font-bold text-slate-900 text-xs shrink-0 shadow-[0_0_8px_rgba(0,229,163,0.2)]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-semibold text-white truncate group-hover:text-[#00E5A3] transition-colors">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </button>
            <button
              onClick={logout}
              title="Sair do aplicativo"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
