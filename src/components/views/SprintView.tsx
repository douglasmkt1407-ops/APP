import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Circle,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  Zap,
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SprintView: React.FC = () => {
  const { sprintDays, toggleSprintTask, navigateToWithParams } = useApp();
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);

  const selectedDay = sprintDays.find(d => d.dayNumber === selectedDayNumber) || sprintDays[0];

  const totalSprintTasks = sprintDays.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedSprintTasks = sprintDays.reduce(
    (acc, d) => acc + d.tasks.filter(t => t.completed).length,
    0
  );
  const sprintPercentage = Math.round((completedSprintTasks / totalSprintTasks) * 100);

  const handleTaskToggle = (taskId: string) => {
    toggleSprintTask(taskId);
    // Check if toggling completes this day
    const dayTasks = selectedDay.tasks;
    const willBeCompleted = dayTasks.every(t => (t.id === taskId ? !t.completed : t.completed));
    if (willBeCompleted) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const getActionIcon = (actionView: string) => {
    switch (actionView) {
      case 'cards':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'questoes':
        return <Zap className="w-3.5 h-3.5" />;
      case 'resumos':
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <ArrowRight className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#00E5A3]/10 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" />
              Sprint de 7 Dias Elaborado & Clicável
            </span>
            <span className="text-xs text-slate-400">
              • Metas diárias de alto impacto para sua aprovação
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Desafio Intensivo: 7 Dias de Foco Total
          </h1>

          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Cada dia traz uma missão estruturada: teoria esquematizada, 15 flashcards direcionados e um simulado de fixação. Clique nos dias e nas tarefas para avançar!
          </p>

          {/* Overall progress meter */}
          <div className="mt-5 pt-4 border-t border-[#12243B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 flex items-center justify-center text-[#00E5A3] font-black text-sm">
                {sprintPercentage}%
              </div>
              <div>
                <p className="text-xs font-bold text-white">Progresso Geral do Sprint</p>
                <p className="text-[11px] text-slate-400">
                  {completedSprintTasks} de {totalSprintTasks} missões concluídas
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64 h-2.5 bg-[#050C17] rounded-full overflow-hidden border border-[#142A46]">
              <div
                style={{ width: `${Math.max(2, sprintPercentage)}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#00E5A3] to-[#00B4D8] transition-all duration-500 shadow-[0_0_10px_rgba(0,229,163,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7-DAY INTERACTIVE CLICKABLE NAV BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {sprintDays.map(day => {
          const isSelected = day.dayNumber === selectedDayNumber;
          const completedTasksCount = day.tasks.filter(t => t.completed).length;
          const dayDone = completedTasksCount === day.tasks.length;

          return (
            <div
              key={day.dayNumber}
              onClick={() => setSelectedDayNumber(day.dayNumber)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0F2642] border-[#00E5A3] shadow-[0_0_20px_rgba(0,229,163,0.25)]'
                  : 'bg-[#091526] border-[#142A46] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#00E5A3]">
                  DIA 0{day.dayNumber}
                </span>

                {dayDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {completedTasksCount}/{day.tasks.length}
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">
                {day.focusBadge}
              </h4>

              {/* Mini task dot indicators */}
              <div className="flex items-center gap-1 mt-3">
                {day.tasks.map(t => (
                  <span
                    key={t.id}
                    className={`h-1.5 flex-1 rounded-full ${
                      t.completed ? 'bg-[#00E5A3]' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED DAY ACTIVE MISSION WORKSPACE */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#12243B]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20">
                Dia {selectedDay.dayNumber} de 7
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {selectedDay.theme}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {selectedDay.dayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {selectedDay.description}
            </p>
          </div>

          {selectedDay.completed && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs shrink-0 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-[#00E5A3]" />
              <span>Missão do Dia Cumprida!</span>
            </div>
          )}
        </div>

        {/* CLICKABLE TASKS LIST */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Tarefas Interativas do Dia (Clique para marcar e praticar):
          </h3>

          <div className="space-y-3">
            {selectedDay.tasks.map((task, idx) => (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-[#08182B] border-emerald-500/30 text-slate-300'
                    : 'bg-[#060D17] border-[#142A46] hover:border-slate-600'
                }`}
              >
                {/* Task Checkbox & Description */}
                <div
                  onClick={() => handleTaskToggle(task.id)}
                  className="flex items-start gap-3.5 cursor-pointer flex-1 select-none"
                >
                  <button
                    type="button"
                    className="mt-0.5 text-[#00E5A3] shrink-0 focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#00E5A3] fill-[#00E5A3]/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>

                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Direct Action Link ("Ir para a tarefa") */}
                <button
                  onClick={() => navigateToWithParams(task.actionView, task.actionParams)}
                  className="self-end sm:self-center px-4 py-2 rounded-xl bg-[#0F2238] hover:bg-[#162D4A] border border-[#1E3A5F] hover:border-[#00E5A3]/50 text-xs font-bold text-slate-200 hover:text-[#00E5A3] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  {getActionIcon(task.actionView)}
                  <span>Praticar Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Day navigation footer */}
        <div className="pt-4 border-t border-[#12243B] flex items-center justify-between">
          <button
            onClick={() => setSelectedDayNumber(prev => Math.max(1, prev - 1))}
            disabled={selectedDayNumber === 1}
            className="px-4 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#142A46] text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            &larr; Dia Anterior
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Dia {selectedDayNumber} de 7
          </span>

          <button
            onClick={() => setSelectedDayNumber(prev => Math.min(7, prev + 1))}
            disabled={selectedDayNumber === 7}
            className="px-4 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#142A46] text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            Próximo Dia &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
