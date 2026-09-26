import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  RotateCcw,
  Info,
  Pencil,
  Trash2,
  Check,
  X,
  Tag,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const QUICK_CATEGORIES = [
  'Meta Pessoal',
  'Cards',
  'Simulado',
  'Resumos',
  'Farmacologia',
  'SUS & Leis',
  'Urgência',
  'Saúde'
];

export const ChecklistView: React.FC = () => {
  const {
    dailyGoals,
    toggleDailyGoal,
    addDailyGoal,
    editDailyGoal,
    deleteDailyGoal,
    renewDailyChecklist,
    dailyGoalsDate
  } = useApp();

  // Add goal form state
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Meta Pessoal');
  const [showCategoryChips, setShowCategoryChips] = useState(false);

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Modals state
  const [showRenewModal, setShowRenewModal] = useState(false);

  const completedCount = dailyGoals.filter(g => g.completed).length;
  const totalCount = dailyGoals.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Real-time formatted date in PT-BR
  const formattedToday = useMemo(() => {
    const now = new Date();
    const str = now.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, []);

  const handleToggle = (id: string) => {
    // If currently editing this item, do not toggle
    if (editingId === id) return;

    toggleDailyGoal(id);
    const target = dailyGoals.find(g => g.id === id);
    if (target && !target.completed && completedCount + 1 === totalCount) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAddSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newGoalText.trim()) return;
    addDailyGoal(newGoalText.trim(), newGoalCategory);
    setNewGoalText('');
  };

  const handleStartEdit = (goal: { id: string; text: string; category: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(goal.id);
    setEditText(goal.text);
    setEditCategory(goal.category || 'Meta Pessoal');
  };

  const handleSaveEdit = (id: string, e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    if (!editText.trim()) return;
    editDailyGoal(id, editText.trim(), editCategory);
    setEditingId(null);
    setEditText('');
    setEditCategory('');
  };

  const handleCancelEdit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingId(null);
    setEditText('');
    setEditCategory('');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDailyGoal(id);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleConfirmRenew = () => {
    renewDailyChecklist();
    setShowRenewModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Header & Status */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20 flex items-center gap-1">
              <CheckSquare className="w-3 h-3" />
              Metas do Dia
            </span>

            {/* Daily Auto-renewal Badge */}
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3] animate-pulse" />
              Renovação Diária Automática (00:00)
            </span>
          </div>

          {/* Quick Manual Renew Button */}
          <button
            type="button"
            onClick={() => setShowRenewModal(true)}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#0F2238] hover:bg-[#162D4A] border border-[#1E3A5F] text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reiniciar as metas diárias para hoje"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00E5A3]" />
            <span>Renovar Metas de Hoje</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Checklist Diário de Estudos
          </h1>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#00E5A3]" />
            {formattedToday}
          </span>
        </div>

        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Marque, adicione ou edite suas atividades de estudo diárias. Mantenha a disciplina para construir sua aprovação um dia de cada vez.
        </p>

        {/* Progress Bar & Counters */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              Progresso do Dia
            </span>
            <span className="font-bold text-[#00E5A3]">
              {completedCount} de {totalCount} concluídas ({progressPct}%)
            </span>
          </div>
          <div className="w-full h-3 bg-[#050C17] rounded-full overflow-hidden border border-[#142A46]">
            <div
              style={{ width: `${Math.max(2, progressPct)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#00E5A3] to-[#00B4D8] transition-all duration-500 shadow-[0_0_10px_rgba(0,229,163,0.4)]"
            />
          </div>
        </div>

        {/* Auto Renewal Tip */}
        <div className="mt-4 p-3 rounded-2xl bg-[#060D17]/80 border border-[#142A46] flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
          <Info className="w-4 h-4 text-[#00E5A3] shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Renovação diária automática ativa:</strong> O checklist se renova todo dia à meia-noite (00:00). Você pode adicionar metas personalizadas e editar qualquer item clicando no botão de lápis (✏️).
          </span>
        </div>
      </div>

      {/* ADD NEW GOAL FORM (100% Clicável e com Categoria) */}
      <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-[#00E5A3]" />
            Adicionar Nova Meta ao Checklist
          </span>

          {/* Toggle category chips */}
          <button
            type="button"
            onClick={() => setShowCategoryChips(!showCategoryChips)}
            className="text-[11px] font-semibold text-[#00E5A3] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Tag className="w-3 h-3" />
            <span>Categoria: <strong>{newGoalCategory}</strong></span>
          </button>
        </div>

        {/* Category selector chips (optional dropdown/selector) */}
        {showCategoryChips && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-2 border-b border-[#142A46] animate-fadeIn">
            <span className="text-[11px] text-slate-400 mr-1">Selecionar Categoria:</span>
            {QUICK_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setNewGoalCategory(cat);
                  setShowCategoryChips(false);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
                  newGoalCategory === cat
                    ? 'bg-[#00E5A3]/20 text-[#00E5A3] border-[#00E5A3]/50'
                    : 'bg-[#060D17] hover:bg-[#0F2238] text-slate-300 border-[#142A46]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleAddSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <input
            type="text"
            placeholder="Digite sua meta de hoje (ex: Revisar 20 questões de SUS, Estudar Farmacologia)..."
            value={newGoalText}
            onChange={e => setNewGoalText(e.target.value)}
            className="flex-1 bg-[#060D17] border border-[#142A46] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] shadow-inner"
          />

          <button
            type="submit"
            onClick={() => handleAddSubmit()}
            disabled={!newGoalText.trim()}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shrink-0 ${
              newGoalText.trim()
                ? 'bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 shadow-[0_2px_15px_rgba(0,229,163,0.35)] transform hover:-translate-y-0.5'
                : 'bg-[#0F2238] text-slate-500 border border-[#142A46] cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Adicionar Meta</span>
          </button>
        </form>
      </div>

      {/* DAILY GOALS LIST (Com Edição e Exclusão) */}
      <div className="space-y-3">
        {dailyGoals.length === 0 ? (
          <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm text-slate-300 font-semibold">
              Nenhuma meta cadastrada no momento.
            </p>
            <p className="text-xs text-slate-400">
              Adicione suas metas de hoje acima ou restaure as metas padrão.
            </p>
            <button
              type="button"
              onClick={handleConfirmRenew}
              className="px-4 py-2 rounded-xl bg-[#00E5A3] text-slate-900 font-bold text-xs cursor-pointer"
            >
              Restaurar Metas Padrão
            </button>
          </div>
        ) : (
          dailyGoals.map(goal => {
            const isEditing = editingId === goal.id;

            return (
              <div
                key={goal.id}
                onClick={() => handleToggle(goal.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none ${
                  goal.completed
                    ? 'bg-[#08182B] border-emerald-500/30'
                    : 'bg-[#091526] border-[#142A46] hover:border-slate-600'
                }`}
              >
                {/* Left Side: Checkbox and Text (or Edit Input) */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Checkbox button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(goal.id);
                    }}
                    className="text-[#00E5A3] shrink-0 focus:outline-none cursor-pointer"
                    title={goal.completed ? 'Desmarcar' : 'Concluir meta'}
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#00E5A3] fill-[#00E5A3]/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-[#00E5A3] transition-colors" />
                    )}
                  </button>

                  {/* Goal Content or Inline Edit */}
                  {isEditing ? (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                      <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleSaveEdit(goal.id, e);
                          if (e.key === 'Escape') handleCancelEdit(e as unknown as React.MouseEvent);
                        }}
                        autoFocus
                        className="flex-1 bg-[#060D17] border-2 border-[#00E5A3] rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none"
                      />

                      <select
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value)}
                        className="bg-[#060D17] border border-[#142A46] rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                      >
                        {QUICK_CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleSaveEdit(goal.id, e)}
                          title="Salvar alterações"
                          className="px-3 py-1.5 rounded-lg bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Salvar</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          title="Cancelar edição"
                          className="px-2.5 py-1.5 rounded-lg bg-[#0F2238] hover:bg-[#162D4A] text-slate-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`text-sm font-semibold leading-relaxed break-words flex-1 ${
                        goal.completed ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {goal.text}
                    </span>
                  )}
                </div>

                {/* Right Side: Category Badge & Edit / Delete Actions */}
                {!isEditing && (
                  <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-auto">
                    {/* Category Tag */}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#0F2238] border border-[#142A46] text-slate-400">
                      {goal.category}
                    </span>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={(e) => handleStartEdit(goal, e)}
                      title="Editar texto da meta"
                      className="p-1.5 rounded-lg bg-[#0F2238] hover:bg-[#162D4A] border border-[#1E3A5F] text-slate-300 hover:text-[#00E5A3] transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(goal.id, e)}
                      title="Excluir meta"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Modal for Manual Renewal */}
      {showRenewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2.5 text-white">
              <RotateCcw className="w-5 h-5 text-[#00E5A3]" />
              <h3 className="font-bold text-base">Renovar Checklist de Hoje?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Isso desmarcará todas as metas diárias para você recomeçar suas atividades de hoje. O seu tempo total de estudo e histórico acumulado não serão afetados.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmRenew}
                className="flex-1 py-2.5 rounded-xl bg-[#00E5A3] text-slate-900 font-bold text-xs hover:bg-[#00c98f] transition-colors cursor-pointer"
              >
                Sim, Renovar Agora
              </button>
              <button
                type="button"
                onClick={() => setShowRenewModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0F2238] text-slate-300 font-semibold text-xs hover:bg-[#162D4A] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
