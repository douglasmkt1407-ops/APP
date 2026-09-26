import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  Flame,
  Zap,
  RotateCcw,
  Smartphone,
  Download,
  Database
} from 'lucide-react';

export const InicioView: React.FC = () => {
  const {
    user,
    stats,
    overallProgressPercentage,
    setCurrentView,
    flashcards,
    simulados,
    summaries,
    resetAllStatsToZero,
    loadDemoStats,
    sessionEntryTime,
    sessionActiveSeconds,
    isSessionTracking,
    formatDurationHHMMSS,
    setIsInstallModalOpen,
    canInstallPwa,
    promptPwaInstall
  } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Welcome Card matching reference design */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071324] via-[#0B1A30] to-[#0A223E] border border-[#162D4A] p-7 sm:p-9 shadow-2xl">
        {/* Subtle decorative glowing mesh */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#00E5A3]/10 via-[#0084FF]/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 right-20 w-60 h-60 rounded-full bg-[#00E5A3]/10 blur-[80px] pointer-events-none" />

        {/* Right side artistic stethoscope representation */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-25 hover:opacity-40 transition-opacity pointer-events-none">
          <svg width="240" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 40 C30 90, 80 120, 100 120 C120 120, 170 90, 170 40"
              stroke="#00E5A3"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M100 120 L100 160 C100 180, 130 180, 140 160"
              stroke="#00E5A3"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="150" cy="155" r="14" fill="#00E5A3" fillOpacity="0.4" stroke="#00E5A3" strokeWidth="4" />
            <circle cx="30" cy="35" r="7" fill="#00E5A3" />
            <circle cx="170" cy="35" r="7" fill="#00E5A3" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          {/* Logo inside card */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5A3] to-[#0084FF] p-[2px]">
              <div className="w-full h-full bg-[#060D17] rounded-[8px] flex items-center justify-center">
                <span className="bg-gradient-to-r from-[#00E5A3] to-[#38BDF8] bg-clip-text text-transparent font-black text-xl">
                  N<sup className="text-xs font-black -top-1.5 text-[#00E5A3]">+</sup>
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">NEXTENF</span>
              </div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#00E5A3] uppercase">
                Técnico em Foco
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 mt-2 mb-2">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#00E5A3] shadow-[0_0_20px_rgba(0,229,163,0.4)] shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00E5A3] to-[#0084FF] p-[2px] shadow-[0_0_20px_rgba(0,229,163,0.35)] shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#060D17] rounded-[14px] flex items-center justify-center font-black text-xl text-[#00E5A3]">
                  {(user?.name || 'A').charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Olá, {user?.name ? user.name.split(' ')[0] : 'futuro(a) profissional'}!
              </h1>
              <p className="text-xs text-[#00E5A3] font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3] animate-pulse" />
                Meta: {user?.targetExam || 'Concurso Técnico em Enfermagem'}
              </p>
            </div>
          </div>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Aqui é o seu espaço de estudos. Use o menu ao lado para acessar todos os recursos e mantenha o foco no seu objetivo.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('cards')}
              className="px-6 py-3 rounded-full bg-[#00E5A3] hover:bg-[#00c98f] text-[#050B14] font-bold text-sm flex items-center gap-2 shadow-[0_4px_25px_rgba(0,229,163,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Vamos juntos?</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setCurrentView('foco')}
              className="px-5 py-3 rounded-full bg-[#000000] hover:bg-neutral-900 border border-[#00E5A3]/60 text-[#00E5A3] font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,163,0.25)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Clock className="w-4 h-4 text-[#00E5A3]" />
              <span>Modo Foco</span>
            </button>

            <button
              onClick={() => setCurrentView('questoes')}
              className="px-5 py-3 rounded-full bg-[#0F2238] hover:bg-[#162D4A] border border-[#1E3A5F] text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#00E5A3]" />
              <span>Ver Simulados</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards exactly matching reference design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Stat 1: Cards de Estudo */}
        <div
          onClick={() => setCurrentView('cards')}
          className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F2642] flex items-center justify-center text-[#00E5A3] group-hover:bg-[#00E5A3]/10 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#00E5A3] transition-colors">
              {flashcards.length} disp.
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.cardsReviewedCount}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">Cards de Estudo</p>
        </div>

        {/* Stat 2: Questões respondidas */}
        <div
          onClick={() => setCurrentView('questoes')}
          className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F2642] flex items-center justify-center text-[#00E5A3] group-hover:bg-[#00E5A3]/10 transition-colors">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#00E5A3] transition-colors">
              100 disp.
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.questionsAnsweredCount}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">Questões respondidas</p>
        </div>

        {/* Stat 3: Dias consecutivos */}
        <div
          onClick={() => setCurrentView('sprint')}
          className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F2642] flex items-center justify-center text-[#00E5A3] group-hover:bg-[#00E5A3]/10 transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#00E5A3] flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Foco
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.consecutiveDays}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">Dias consecutivos</p>
        </div>

        {/* Stat 4: Tempo de estudo (Gira sozinho em tempo real) */}
        <div
          onClick={() => setCurrentView('progresso')}
          className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F2642] flex items-center justify-center text-[#00E5A3] group-hover:bg-[#00E5A3]/10 transition-colors">
              <Clock
                className={`w-5 h-5 ${
                  isSessionTracking ? 'animate-spin [animation-duration:8s]' : ''
                }`}
              />
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00E5A3]/10 text-[10px] font-bold text-[#00E5A3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3] animate-pulse" />
              <span>{formatDurationHHMMSS(sessionActiveSeconds)}</span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.studyTimeHours > 0
              ? stats.studyTimeHours < 1
                ? `${Math.round(stats.studyTimeHours * 60)} min`
                : `${Math.floor(stats.studyTimeHours)}h ${Math.round((stats.studyTimeHours % 1) * 60) > 0 ? `${Math.round((stats.studyTimeHours % 1) * 60)}min` : ''}`
              : '0 min'}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1 flex items-center justify-between">
            <span>
              {stats.studyTimeHours > 0
                ? stats.studyTimeHours < 1
                  ? `${Math.round(stats.studyTimeHours * 60)} min acumulados`
                  : `${stats.studyTimeHours.toFixed(1)}h acumuladas`
                : 'Tempo de estudo'}
            </span>
            <span className="text-[10px] text-[#00E5A3] font-semibold">Entrada: {sessionEntryTime}</span>
          </p>
        </div>
      </div>

      {/* Seu Progresso Geral card matching reference design */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white tracking-tight">
            Seu progresso geral
          </h3>
          <span className="text-lg font-black text-[#00E5A3]">
            {overallProgressPercentage}%
          </span>
        </div>

        {/* Progress Bar with glow */}
        <div className="w-full h-3.5 bg-[#050C17] rounded-full overflow-hidden p-0.5 border border-[#142A46]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00E5A3] via-[#22D3EE] to-[#00E5A3] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(0,229,163,0.5)]"
            style={{ width: `${Math.max(2, overallProgressPercentage)}%` }}
          />
        </div>

        {/* Motivational quote in reference image */}
        <div className="mt-5 pt-4 border-t border-[#12243B] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-400 italic">
            “Grandes conquistas são o resultado de pequenos esforços repetidos todos os dias.”
          </p>

          {/* Quick zero / demo control hint for user inspection */}
          <div className="shrink-0 flex items-center gap-2">
            {stats.cardsReviewedCount > 0 ||
            stats.questionsAnsweredCount > 0 ||
            stats.studyTimeHours > 0 ||
            stats.consecutiveDays > 0 ||
            stats.simuladosAttempts.length > 0 ? (
              <button
                type="button"
                onClick={resetAllStatsToZero}
                title="Zerar dados de estudo para voltar a zero"
                className="text-xs bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                <span>Zerar dados de estudo</span>
              </button>
            ) : (
              <span className="text-[11px] font-semibold text-[#00E5A3] bg-[#00E5A3]/10 px-3 py-1 rounded-full border border-[#00E5A3]/25 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,229,163,0.15)]">
                <CheckCircle className="w-3.5 h-3.5 text-[#00E5A3]" />
                Início 100% Zerado (Pronto para estudar)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Launchpad to core features requested by user */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Launchpad 1: Cards */}
        <div
          onClick={() => setCurrentView('cards')}
          className="bg-gradient-to-b from-[#09172B] to-[#06101D] border border-[#152B47] hover:border-[#00E5A3]/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#00E5A3]/10 flex items-center justify-center text-[#00E5A3]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#00E5A3] transition-colors">
                108 Cards de Estudo
              </h4>
              <p className="text-[11px] text-slate-400">8 categorias de enfermagem</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Flashcards com mnemônicos, gabarito e sistema de repetição espaçada.
          </p>
        </div>

        {/* Launchpad 2: 10 Simulados */}
        <div
          onClick={() => setCurrentView('questoes')}
          className="bg-gradient-to-b from-[#09172B] to-[#06101D] border border-[#152B47] hover:border-[#00E5A3]/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                10 Simulados Calibrados
              </h4>
              <p className="text-[11px] text-slate-400">2 fáceis, 3 médias e 5 difíceis</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            100 questões com gabarito comentado e cronômetro de prova real.
          </p>
        </div>

        {/* Launchpad 3: Sprint 7 Dias */}
        <div
          onClick={() => setCurrentView('sprint')}
          className="bg-gradient-to-b from-[#09172B] to-[#06101D] border border-[#152B47] hover:border-[#00E5A3]/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                Sprint de 7 Dias
              </h4>
              <p className="text-[11px] text-slate-400">Missões intensivas diárias</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Roteiro estruturado de revisão passo a passo para a sua aprovação.
          </p>
        </div>
      </div>

      {/* PWA Install & Account Persistence Banner */}
      <div className="rounded-2xl bg-[#081527] border border-[#142A46] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 text-[#00E5A3] flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Adicione o App à Tela Inicial</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] font-bold border border-[#00E5A3]/25">
                PWA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Estude em tela cheia com acesso rápido em 1 toque e progresso 100% salvo na sua conta.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (canInstallPwa) {
              promptPwaInstall();
            } else {
              setIsInstallModalOpen(true);
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,163,0.3)]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Adicionar à Tela Inicial</span>
        </button>
      </div>
    </div>
  );
};
