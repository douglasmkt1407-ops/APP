import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Zap,
  Target,
  BarChart2,
  PieChart,
  Flame,
  Calendar,
  Sparkles,
  PlusCircle,
  Activity,
  LogIn,
  LogOut,
  Pause,
  Play,
  Timer,
  Radio
} from 'lucide-react';

export const ProgressoView: React.FC = () => {
  const {
    stats,
    overallProgressPercentage,
    flashcards,
    registerStudySession,
    resetStudyTimeToZero,
    setCurrentView,
    sessionEntryTime,
    sessionLastExitTime,
    sessionActiveSeconds,
    isSessionTracking,
    toggleSessionTracking,
    formatDurationHHMMSS
  } = useApp();

  // Helper to format study time nicely in Portuguese
  const formatStudyHours = (hours: number) => {
    if (!hours || hours <= 0) return '0 min';
    const totalMinutes = Math.round(hours * 60);
    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    }
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  };

  // Real-time ticking clock
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatted real-time date string in Portuguese
  const formattedRealTimeDate = useMemo(() => {
    const dayOfWeek = currentDate.toLocaleDateString('pt-BR', { weekday: 'long' });
    const day = currentDate.getDate();
    const month = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return `${capitalizedDay}, ${day} de ${month} de ${year}`;
  }, [currentDate]);

  const formattedLiveClock = useMemo(() => {
    return currentDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, [currentDate]);

  const totalCards = flashcards.length;
  const masteredCards = stats.masteredCardIds.length;
  const learningCards = Math.max(0, stats.reviewedCardIds.length - masteredCards);
  const unreadCards = Math.max(0, totalCards - stats.reviewedCardIds.length);

  // Overall question accuracy
  const totalQuestions = stats.questionsAnsweredCount;
  const correctQuestions = stats.questionsCorrectCount;
  const accuracyPercentage =
    totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  // Disciplines performance breakdown computed dynamically from actual flashcards
  const disciplines = useMemo(() => {
    const categories: { name: string; weight: 'Alta' | 'Média' }[] = [
      { name: 'Fundamentos de Enfermagem', weight: 'Alta' },
      { name: 'Farmacologia & Cálculos', weight: 'Alta' },
      { name: 'Urgência & Emergência', weight: 'Alta' },
      { name: 'SUS & Legislação', weight: 'Média' },
      { name: 'Biossegurança & Infecção', weight: 'Média' },
      { name: 'Saúde da Mulher & Criança', weight: 'Alta' },
      { name: 'Médico-Cirúrgica', weight: 'Média' },
      { name: 'Saúde Coletiva & Vacinas', weight: 'Média' }
    ];

    return categories.map(cat => {
      const catCards = flashcards.filter(c => c.category === cat.name);
      const mastered = catCards.filter(c => stats.masteredCardIds.includes(c.id)).length;
      return {
        name: cat.name,
        total: catCards.length,
        mastered,
        weight: cat.weight
      };
    });
  }, [flashcards, stats.masteredCardIds]);

  // Dynamic 7-day calendar history ending TODAY in real-time
  const last7DaysData = useMemo(() => {
    const list = [];
    const d = new Date(currentDate);

    // Weekdays short names in PT-BR
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let i = 6; i >= 0; i--) {
      const past = new Date(d);
      past.setDate(d.getDate() - i);
      const year = past.getFullYear();
      const month = String(past.getMonth() + 1).padStart(2, '0');
      const day = String(past.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;

      const isToday = i === 0;
      const isYesterday = i === 1;

      let label = dayNames[past.getDay()];
      if (isToday) label = 'Hoje';
      else if (isYesterday) label = 'Ontem';

      const shortDate = `${day}/${month}`;
      const hours = stats.dailyStudyHistory?.[dateKey] || 0;

      list.push({
        dateKey,
        dayLabel: label,
        shortDate,
        hours,
        isToday
      });
    }

    return list;
  }, [currentDate, stats.dailyStudyHistory]);

  const maxRecordedHours = Math.max(2.5, ...last7DaysData.map(d => d.hours));

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Header & Live Real-Time Date/Clock Banner */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#00E5A3]" />
                Painel Analítico de Desempenho
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                • Atualizado em tempo real
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meu Progresso & Gráficos
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Acompanhe a retenção dos flashcards, assertividade nos 10 simulados e horas dedicadas diariamente.
            </p>
          </div>

          {/* Real-time date and clock card */}
          <div className="bg-[#060D17] border border-[#183659] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 flex items-center justify-center text-[#00E5A3] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5A3] animate-ping" />
                <span className="text-[10px] font-bold tracking-widest text-[#00E5A3] uppercase">
                  Data em Tempo Real
                </span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white font-mono mt-0.5">
                {formattedLiveClock}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {formattedRealTimeDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Taxa de Acerto</span>
            <Target className="w-4 h-4 text-[#00E5A3]" />
          </div>
          <div className="text-3xl font-black text-white">
            {accuracyPercentage}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {correctQuestions} certas de {totalQuestions} respondidas
          </p>
        </div>

        <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cards Dominados</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {masteredCards}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            de {totalCards} cards totais
          </p>
        </div>

        <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Simulados Feitos</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {stats.simuladosAttempts.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            de 10 simulados disponíveis
          </p>
        </div>

        <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tempo Estudado</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00E5A3]/10 border border-[#00E5A3]/30 text-[10px] text-[#00E5A3] font-bold">
              <Clock
                className={`w-3 h-3 ${
                  isSessionTracking ? 'animate-spin [animation-duration:8s]' : 'opacity-60'
                }`}
              />
              <span>{isSessionTracking ? 'Girando ao vivo' : 'Pausado'}</span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5 flex-wrap">
            <span>{formatStudyHours(stats.studyTimeHours)}</span>
            {stats.studyTimeHours >= 1 && (
              <span className="text-xs text-slate-400 font-mono font-normal">
                ({stats.studyTimeHours.toFixed(1)}h)
              </span>
            )}
            <span className="text-xs font-mono text-[#00E5A3] font-bold">
              +{formatDurationHHMMSS(sessionActiveSeconds)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#142A46] text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3] animate-ping" />
              <span>Entrada: {sessionEntryTime}</span>
            </span>
            {stats.studyTimeHours > 0 && (
              <button
                type="button"
                onClick={resetStudyTimeToZero}
                title="Zerar cronômetro e reiniciar tempo"
                className="text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer"
              >
                Zerar tempo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AUTOMATED PRESENCE / STUDY TIME TRACKER (Entrada e Saída em Tempo Real) */}
      <div className="bg-gradient-to-r from-[#071424] via-[#091b30] to-[#0a182b] border border-[#162D4A] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#00E5A3]/10 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00E5A3] animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00E5A3]">
                Ponto de Estudo Automatizado
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-400">
                Gira sozinho conforme horário de entrada e saída
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
              <span>Presença Contínua no App</span>
              <div className="p-1 rounded-lg bg-[#00E5A3]/15 text-[#00E5A3]">
                <Clock
                  className={`w-4 h-4 ${
                    isSessionTracking ? 'animate-spin [animation-duration:6s]' : ''
                  }`}
                />
              </div>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              O tempo de estudo acumula e gira sozinho em segundo plano enquanto você navega e revisa flashcards, resumos e questões. Ao fechar ou sair do app, seu horário de saída é registrado automaticamente.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSessionTracking}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                isSessionTracking
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-[#00E5A3]/10 hover:bg-[#00E5A3]/20 text-[#00E5A3] border-[#00E5A3]/30'
              }`}
              title={isSessionTracking ? 'Pausar temporariamente o cronômetro' : 'Retomar cronômetro de presença'}
            >
              {isSessionTracking ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar Ponto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Retomar Ponto</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('foco')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#00E5A3] text-black hover:bg-[#00c98f] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,163,0.25)]"
              title="Abrir o Modo Foco com cronômetro imersivo em tela preta"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Abrir Modo Foco</span>
            </button>
          </div>
        </div>

        {/* 4 Real-time Time Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#142A46]">
          {/* 1. Entrada */}
          <div className="bg-[#050C17]/80 border border-[#142A46] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Horário de Entrada
              </span>
              <span className="text-base font-black text-white font-mono">
                {sessionEntryTime}
              </span>
              <span className="text-[10px] text-emerald-400/90 block font-medium">
                Sessão iniciada hoje
              </span>
            </div>
          </div>

          {/* 2. Tempo na Sessão Atual (Gira Sozinho) */}
          <div className="bg-[#050C17]/80 border border-[#00E5A3]/30 rounded-2xl p-4 flex items-center gap-3 relative shadow-[0_0_20px_rgba(0,229,163,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/15 text-[#00E5A3] flex items-center justify-center shrink-0">
              <Clock
                className={`w-5 h-5 ${
                  isSessionTracking ? 'animate-spin [animation-duration:10s]' : ''
                }`}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#00E5A3] uppercase tracking-wider block">
                Sessão em Andamento
              </span>
              <span className="text-lg font-black text-white font-mono tracking-tight block text-[#00E5A3]">
                {formatDurationHHMMSS(sessionActiveSeconds)}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {isSessionTracking ? 'Girando em tempo real' : 'Contagem pausada'}
              </span>
            </div>
          </div>

          {/* 3. Última Saída */}
          <div className="bg-[#050C17]/80 border border-[#142A46] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Última Saída
              </span>
              <span className="text-base font-black text-white font-mono">
                {sessionLastExitTime}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                Gravado no último encerramento
              </span>
            </div>
          </div>

          {/* 4. Total Acumulado Hoje */}
          <div className="bg-[#050C17]/80 border border-[#142A46] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total de Estudo Hoje
              </span>
              <span className="text-base font-black text-white font-mono">
                {formatStudyHours(stats.studyTimeHours)}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                Atualizado a cada 10s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Domínio dos Flashcards (Distribution Bar) */}
        <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#00E5A3]" />
                Domínio dos Flashcards (+150)
              </h3>
              <p className="text-xs text-slate-400">Status dos {totalCards} cards de estudo</p>
            </div>
            <span className="text-xs font-bold text-[#00E5A3]">
              {Math.round((stats.reviewedCardIds.length / totalCards) * 100)}% explorados
            </span>
          </div>

          {/* Tri-color Segmented Progress Bar */}
          <div className="w-full h-4 bg-[#050C17] rounded-full overflow-hidden flex border border-[#142A46]">
            <div
              style={{ width: `${(masteredCards / totalCards) * 100}%` }}
              className="bg-[#00E5A3] h-full transition-all duration-500"
              title={`Dominados: ${masteredCards}`}
            />
            <div
              style={{ width: `${(Math.max(0, learningCards) / totalCards) * 100}%` }}
              className="bg-amber-400 h-full transition-all duration-500"
              title={`Aprendendo: ${learningCards}`}
            />
            <div
              style={{ width: `${(unreadCards / totalCards) * 100}%` }}
              className="bg-slate-800 h-full transition-all duration-500"
              title={`Novos: ${unreadCards}`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00E5A3]" />
              <span className="text-slate-300 font-semibold">{masteredCards} Dominados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-slate-300 font-semibold">{learningCards} Aprendendo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-700" />
              <span className="text-slate-400">{unreadCards} Novos</span>
            </div>
          </div>
        </div>

        {/* CHART 2: Gráfico de Tempo de Estudo dos Últimos 7 Dias (Linked to REAL-TIME DATE) */}
        <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Tempo de Estudo dos Últimos 7 Dias
              </h3>
              <p className="text-xs text-slate-400">
                Registrado por data em tempo real (hoje em destaque)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-cyan-400 block font-mono">
                {formatStudyHours(stats.studyTimeHours)} ({stats.studyTimeHours.toFixed(1)}h)
              </span>
              <span className="text-[10px] text-[#00E5A3] font-semibold">
                {stats.dailyStudyHistory?.[last7DaysData[6]?.dateKey]
                  ? `${formatStudyHours(stats.dailyStudyHistory[last7DaysData[6].dateKey])} hoje`
                  : '0 min hoje'}
              </span>
            </div>
          </div>

          {/* SVG/CSS Bar Chart with actual dates and dynamic height */}
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-1">
            {last7DaysData.map((item, idx) => {
              const heightPct =
                item.hours > 0
                  ? Math.min(100, Math.max(16, (item.hours / maxRecordedHours) * 100))
                  : 4; // subtle dot if 0

              return (
                <div
                  key={idx}
                  className={`flex-1 flex flex-col items-center gap-1.5 h-full justify-end group rounded-xl p-1 transition-all ${
                    item.isToday
                      ? 'bg-[#00E5A3]/5 border border-[#00E5A3]/30'
                      : 'hover:bg-[#0A1A2E]'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono transition-opacity ${
                      item.isToday
                        ? 'text-[#00E5A3] font-bold opacity-100'
                        : 'text-slate-400 opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    {item.hours > 0 ? `${item.hours.toFixed(1)}h` : '0h'}
                  </span>

                  <div className="w-full flex justify-center">
                    <div
                      style={{ height: `${heightPct}%`, minHeight: item.hours > 0 ? '16px' : '4px' }}
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                        item.isToday
                          ? 'bg-gradient-to-t from-[#00E5A3] via-[#22D3EE] to-[#38BDF8] shadow-[0_0_15px_rgba(0,229,163,0.4)]'
                          : item.hours > 0
                          ? 'bg-gradient-to-t from-[#0084FF] to-[#00E5A3] opacity-80'
                          : 'bg-slate-800'
                      }`}
                    />
                  </div>

                  <div className="text-center">
                    <span
                      className={`text-[11px] block font-bold leading-tight ${
                        item.isToday ? 'text-[#00E5A3]' : 'text-slate-300'
                      }`}
                    >
                      {item.dayLabel}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block leading-tight">
                      {item.shortDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick study logging trigger & Modo Foco shortcut */}
          <div className="pt-2 border-t border-[#12243B] flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setCurrentView('foco')}
              className="text-xs bg-[#00E5A3] hover:bg-[#00c98f] text-black px-3.5 py-1.5 rounded-xl font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,163,0.3)]"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Abrir Modo Foco</span>
            </button>

            <button
              type="button"
              onClick={() => registerStudySession(15, 'Sessão de Leitura')}
              className="text-xs bg-[#0F2238] hover:bg-[#162D4A] border border-[#1A3657] hover:border-[#00E5A3]/50 text-[#00E5A3] px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+15 min de estudo hoje</span>
            </button>
          </div>
        </div>

        {/* CHART 3: Desempenho por Disciplina (Horizontal Bars) */}
        <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 shadow-xl space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00E5A3]" />
                Desempenho por Disciplina de Enfermagem
              </h3>
              <p className="text-xs text-slate-400">
                Fixação de conteúdo nas 8 matérias mais cobradas pelas bancas examinadoras
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {disciplines.map((d, idx) => {
              const pct = Math.round((d.mastered / d.total) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{d.name}</span>
                    <span className="text-slate-400 font-mono">
                      {d.mastered}/{d.total} cards dominados ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#050C17] rounded-full overflow-hidden border border-[#142A46]">
                    <div
                      style={{ width: `${Math.max(2, pct)}%` }}
                      className="h-full bg-gradient-to-r from-[#00E5A3] to-[#0084FF] transition-all duration-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
