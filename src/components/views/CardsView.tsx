import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CardCategory, Flashcard } from '../../types';
import {
  BookOpen,
  Search,
  Filter,
  RotateCw,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Eye,
  Check,
  Award
} from 'lucide-react';

const CATEGORIES: (CardCategory | 'Todas')[] = [
  'Todas',
  'Fundamentos de Enfermagem',
  'Farmacologia & Cálculos',
  'Urgência & Emergência',
  'SUS & Legislação',
  'Biossegurança & Infecção',
  'Saúde da Mulher & Criança',
  'Médico-Cirúrgica',
  'Saúde Coletiva & Vacinas'
];

export const CardsView: React.FC = () => {
  const { flashcards, activeCategory, setActiveCategory, markCardReviewed, stats } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'study' | 'grid'>('study');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'learning' | 'mastered'>('all');

  // Filtered flashcards
  const filteredCards = useMemo(() => {
    return flashcards.filter(card => {
      const matchCategory = activeCategory === 'Todas' || card.category === activeCategory;
      const matchQuery =
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.keyMnemonic && card.keyMnemonic.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = statusFilter === 'all' || card.status === statusFilter;

      return matchCategory && matchQuery && matchStatus;
    });
  }, [flashcards, activeCategory, searchQuery, statusFilter]);

  const safeIndex = filteredCards.length > 0 ? Math.min(currentIndex, filteredCards.length - 1) : 0;
  const currentCard: Flashcard | undefined = filteredCards[safeIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (safeIndex < filteredCards.length - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, filteredCards.length - 1));
    }
  };

  const handleRate = (status: 'learning' | 'mastered') => {
    if (currentCard) {
      markCardReviewed(currentCard.id, status);
      handleNext();
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#091526] border border-[#142A46] rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20">
              Banco com {flashcards.length} Cards
            </span>
            <span className="text-xs text-slate-400">
              • {stats.reviewedCardIds.length} revisados ({stats.masteredCardIds.length} dominados)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cards de Estudo (Flashcards)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Memorização acelerada com repetição espaçada, mnemônicos e foco nos concursos mais concorridos.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-[#050B14] p-1.5 rounded-2xl border border-[#142A46] self-start md:self-auto">
          <button
            onClick={() => setViewMode('study')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'study'
                ? 'bg-[#00E5A3] text-[#050B14] shadow-[0_2px_12px_rgba(0,229,163,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Estudo 3D
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#00E5A3] text-[#050B14] shadow-[0_2px_12px_rgba(0,229,163,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ver Todos ({filteredCards.length})
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="space-y-3">
        {/* Search and status */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por termo (ex: gotejamento, PCR, Glasgow, insulina, Braden)..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full bg-[#081220] border border-[#142A46] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#081220] border border-[#142A46] rounded-2xl p-1 shrink-0 overflow-x-auto">
            {(['all', 'new', 'learning', 'mastered'] as const).map(s => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  statusFilter === s
                    ? 'bg-[#142A46] text-[#00E5A3] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s === 'all' && 'Todos'}
                {s === 'new' && 'Novos'}
                {s === 'learning' && 'Aprendendo'}
                {s === 'mastered' && 'Dominados'}
              </button>
            ))}
          </div>
        </div>

        {/* Categories scrollable pill bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-semibold border transition-all cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#00E5A3]/15 text-[#00E5A3] border-[#00E5A3]/50 shadow-[0_0_12px_rgba(0,229,163,0.15)] font-bold'
                  : 'bg-[#081220] text-slate-400 border-[#142A46] hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: STUDY SESSION (Card 3D Flip) */}
      {viewMode === 'study' ? (
        filteredCards.length === 0 ? (
          <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Nenhum card encontrado</h3>
            <p className="text-sm text-slate-400 mt-1">Tente ajustar seus filtros ou termo de busca.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Card Progress counter & navigation bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span>
                Card <strong className="text-white">{currentIndex + 1}</strong> de{' '}
                <strong className="text-white">{filteredCards.length}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffle}
                  title="Embaralhar cards"
                  className="p-1.5 rounded-lg bg-[#0F2238] hover:text-white text-slate-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Aleatório</span>
                </button>
              </div>
            </div>

            {/* The 3D Flip Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full min-h-[340px] sm:min-h-[380px] bg-[#0A1628] border-2 border-[#162D4A] hover:border-[#00E5A3]/60 rounded-3xl p-6 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-2xl group hover:shadow-[0_0_35px_rgba(0,229,163,0.15)] select-none"
            >
              {/* Card top tag and status */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#00E5A3] bg-[#00E5A3]/10 border border-[#00E5A3]/20 px-3 py-1 rounded-full">
                  {currentCard?.category}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      currentCard?.status === 'mastered'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : currentCard?.status === 'learning'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-700/40 text-slate-300 border-slate-600'
                    }`}
                  >
                    {currentCard?.status === 'mastered' ? 'Dominado' : currentCard?.status === 'learning' ? 'Em Estudo' : 'Novo'}
                  </span>

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    Clique p/ girar
                  </span>
                </div>
              </div>

              {/* Card Content (Front vs Back) */}
              <div className="my-auto py-6">
                {!isFlipped ? (
                  /* FRONT: Question */
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Pergunta
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed">
                      {currentCard?.question}
                    </h2>
                  </div>
                ) : (
                  /* BACK: Answer & Key Mnemonic */
                  <div className="space-y-4 animate-fadeIn">
                    <span className="text-xs font-semibold text-[#00E5A3] uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Resposta & Gabarito Comentado
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
                      {currentCard?.answer}
                    </p>

                    {currentCard?.keyMnemonic && (
                      <div className="p-3.5 rounded-2xl bg-[#0F2642] border border-[#00E5A3]/30 text-xs text-[#00E5A3] font-medium">
                        💡 <strong>Mnemônico / Regra de Ouro:</strong> {currentCard.keyMnemonic}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {currentCard?.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Card bottom tip */}
              <div className="pt-4 border-t border-[#142A46] flex items-center justify-between text-xs text-slate-400">
                <span>Pressione espaço ou clique para virar o card</span>
                <span className="text-slate-500 font-mono">#{currentCard?.id}</span>
              </div>
            </div>

            {/* Rating controls & next/previous */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#091526] hover:bg-[#102238] border border-[#142A46] text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#091526] hover:bg-[#102238] border border-[#142A46] text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Rate buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleRate('learning')}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ainda estudando</span>
                </button>

                <button
                  onClick={() => handleRate('mastered')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-[#050B14] text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-[0_2px_15px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Dominado!</span>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* MODE 2: GRID OVERVIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('study');
                setIsFlipped(false);
              }}
              className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold text-[#00E5A3] bg-[#00E5A3]/10 px-2 py-0.5 rounded-md border border-[#00E5A3]/20 truncate">
                    {card.category}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      card.status === 'mastered'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : card.status === 'learning'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {card.status === 'mastered' ? 'Dominado' : card.status === 'learning' ? 'Estudando' : 'Novo'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#00E5A3] transition-colors line-clamp-3">
                  {card.question}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-[#12243B] flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[200px] text-slate-500">{card.answer}</span>
                <span className="text-[#00E5A3] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  Praticar &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
