import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Simulado, Question, QuestionDifficulty } from '../../types';
import {
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  BarChart3,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';

export const QuestoesView: React.FC = () => {
  const {
    simulados,
    selectedSimuladoId,
    setSelectedSimuladoId,
    recordSimuladoAttempt,
    stats
  } = useApp();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const activeSimulado = simulados.find(s => s.id === selectedSimuladoId);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isFinished) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isFinished]);

  const handleStartSimulado = (simuladoId: number) => {
    setSelectedSimuladoId(simuladoId);
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setSecondsElapsed(0);
    setTimerActive(true);
  };

  const handleSelectOption = (questionId: number, optionLetter: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleFinishExam = () => {
    if (!activeSimulado) return;
    setTimerActive(false);
    setIsFinished(true);

    // Calculate score
    let score = 0;
    activeSimulado.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = Math.round((score / activeSimulado.questions.length) * 100);

    // Record into central stats
    recordSimuladoAttempt({
      simuladoId: activeSimulado.id,
      simuladoTitle: activeSimulado.title,
      score,
      percentage,
      answers: selectedAnswers,
      timeSpentSeconds: secondsElapsed
    });
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper for difficulty badge
  const renderDifficultyBadge = (difficulty: QuestionDifficulty) => {
    switch (difficulty) {
      case 'facil':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Fácil
          </span>
        );
      case 'media':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Média
          </span>
        );
      case 'dificil':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
            Difícil
          </span>
        );
    }
  };

  // ==========================================
  // VIEW A: SIMULADOS LIST (10 SIMULADOS)
  // ==========================================
  if (!activeSimulado) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
        {/* Header */}
        <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20">
              10 Simulados Exclusivos
            </span>
            <span className="text-xs text-slate-400">
              • Calibrados rigorosamente: 2 Fáceis, 3 Médias e 5 Difíceis cada
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Banco de Questões & Simulados
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
            Treine em condições reais de prova com 10 questões por simulado, cronômetro integrado, gabarito detalhado do professor e mensuração de desempenho por nível de complexidade.
          </p>
        </div>

        {/* Simulados Grid (10 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {simulados.map(simulado => {
            const attempt = stats.simuladosAttempts.find(a => a.simuladoId === simulado.id);
            const isCompleted = !!attempt;

            return (
              <div
                key={simulado.id}
                className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#00E5A3] bg-[#0F243E] px-3 py-1 rounded-xl border border-[#00E5A3]/20">
                      {simulado.focusArea}
                    </span>

                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {simulado.timeLimitMinutes} min
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00E5A3] transition-colors">
                    {simulado.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {simulado.description}
                  </p>

                  {/* Difficulty composition pill badges */}
                  <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      2 Fáceis
                    </span>
                    <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      3 Médias
                    </span>
                    <span className="text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md">
                      5 Difíceis
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">
                      (10 questões)
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12243B] flex items-center justify-between">
                  <div>
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00E5A3]" />
                        <span className="text-xs font-bold text-slate-200">
                          Nota: {attempt.score}/10 ({attempt.percentage}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">Ainda não realizado</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleStartSimulado(simulado.id)}
                    className="px-4 py-2 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-[#050B14] font-bold text-xs flex items-center gap-1.5 shadow-[0_2px_12px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
                  >
                    <span>{isCompleted ? 'Refazer Simulado' : 'Iniciar Prova'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW B: ACTIVE SIMULADO SESSION / EXAM
  // ==========================================
  const currentQuestion = activeSimulado.questions[activeQuestionIndex];
  const isLastQuestion = activeQuestionIndex === activeSimulado.questions.length - 1;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Exam Header bar */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => {
              if (window.confirm('Deseja sair do simulado atual?')) {
                setSelectedSimuladoId(null);
              }
            }}
            className="text-xs text-slate-400 hover:text-[#00E5A3] flex items-center gap-1 mb-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar aos Simulados</span>
          </button>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            {activeSimulado.title}
          </h2>
        </div>

        {/* Timer & finish button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#050B14] border border-[#142A46] font-mono text-sm font-bold text-[#00E5A3]">
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          {!isFinished && (
            <button
              onClick={handleFinishExam}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00E5A3] text-slate-900 font-bold text-xs hover:opacity-95 shadow-[0_2px_15px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
            >
              Finalizar Simulado ({answeredCount}/10)
            </button>
          )}
        </div>
      </div>

      {/* Question palette dots (1-10) */}
      <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-3 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 shrink-0">Questões:</span>
        <div className="flex items-center gap-1.5">
          {activeSimulado.questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isCurrent = idx === activeQuestionIndex;
            const isCorrect = isFinished && selectedAnswers[q.id] === q.correctAnswer;
            const isWrong = isFinished && isAnswered && selectedAnswers[q.id] !== q.correctAnswer;

            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-[#00E5A3] ring-offset-2 ring-offset-[#091526]'
                    : ''
                } ${
                  isFinished
                    ? isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isWrong
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                    : isAnswered
                    ? 'bg-[#00E5A3] text-slate-900'
                    : 'bg-[#0F2238] text-slate-300 hover:bg-[#162D4A]'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* FINISHED SCORE CARD BANNER */}
      {isFinished && (
        <div className="bg-gradient-to-br from-[#0B1E36] to-[#071324] border-2 border-[#00E5A3]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 text-[#00E5A3] flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3]">
              Simulado Concluído
            </span>
            <h3 className="text-3xl font-black text-white mt-1">
              {Object.values(activeSimulado.questions).filter(
                q => selectedAnswers[q.id] === q.correctAnswer
              ).length}{' '}
              <span className="text-xl text-slate-400">/ 10 Acertos</span>
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Aproveitamento de{' '}
              <strong className="text-[#00E5A3]">
                {Math.round(
                  (Object.values(activeSimulado.questions).filter(
                    q => selectedAnswers[q.id] === q.correctAnswer
                  ).length /
                    10) *
                    100
                )}
                %
              </strong>{' '}
              em {formatTime(secondsElapsed)}
            </p>
          </div>

          {/* Breakdown by difficulty */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="bg-[#050C17] p-3 rounded-xl border border-emerald-500/30">
              <p className="text-[10px] text-emerald-400 font-semibold uppercase">Fáceis (2)</p>
              <p className="text-lg font-bold text-white mt-0.5">
                {
                  activeSimulado.questions.filter(
                    q => q.difficulty === 'facil' && selectedAnswers[q.id] === q.correctAnswer
                  ).length
                }
                /2
              </p>
            </div>
            <div className="bg-[#050C17] p-3 rounded-xl border border-amber-500/30">
              <p className="text-[10px] text-amber-400 font-semibold uppercase">Médias (3)</p>
              <p className="text-lg font-bold text-white mt-0.5">
                {
                  activeSimulado.questions.filter(
                    q => q.difficulty === 'media' && selectedAnswers[q.id] === q.correctAnswer
                  ).length
                }
                /3
              </p>
            </div>
            <div className="bg-[#050C17] p-3 rounded-xl border border-rose-500/30">
              <p className="text-[10px] text-rose-400 font-semibold uppercase">Difíceis (5)</p>
              <p className="text-lg font-bold text-white mt-0.5">
                {
                  activeSimulado.questions.filter(
                    q => q.difficulty === 'dificil' && selectedAnswers[q.id] === q.correctAnswer
                  ).length
                }
                /5
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Confira abaixo o gabarito comentado de cada questão para fixar os conceitos.
          </p>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">
              Questão {activeQuestionIndex + 1} de {activeSimulado.questions.length}
            </span>
            <span className="text-slate-600">•</span>
            {renderDifficultyBadge(currentQuestion.difficulty)}
          </div>

          <span className="text-xs font-semibold text-[#00E5A3]">
            {currentQuestion.subject}
          </span>
        </div>

        {/* Statement */}
        <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
          {currentQuestion.statement}
        </div>

        {/* Options list */}
        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.letter;
            const isCorrectAnswer = currentQuestion.correctAnswer === option.letter;

            let optionStyle =
              'bg-[#060D17] border-[#142A46] text-slate-200 hover:border-slate-600 hover:bg-[#0A1628]';

            if (isFinished) {
              if (isCorrectAnswer) {
                optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-200 font-semibold';
              } else {
                optionStyle = 'bg-[#060D17] border-[#142A46] text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle =
                'bg-[#00E5A3]/15 border-[#00E5A3] text-white shadow-[0_0_15px_rgba(0,229,163,0.15)] font-semibold';
            }

            return (
              <div
                key={option.letter}
                onClick={() => handleSelectOption(currentQuestion.id, option.letter)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isFinished && isCorrectAnswer
                      ? 'bg-emerald-500 text-slate-900'
                      : isFinished && isSelected && !isCorrectAnswer
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-[#00E5A3] text-slate-900'
                      : 'bg-[#12243B] text-slate-300'
                  }`}
                >
                  {option.letter}
                </div>

                <div className="text-sm leading-relaxed pt-0.5">{option.text}</div>
              </div>
            );
          })}
        </div>

        {/* TEACHER EXPLANATION (When finished) */}
        {isFinished && (
          <div className="mt-6 p-5 rounded-2xl bg-[#0F2238] border border-[#00E5A3]/30 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00E5A3]">
              <Sparkles className="w-4 h-4" />
              <span>Gabarito Comentado pelo Professor:</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="pt-4 border-t border-[#12243B] flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={activeQuestionIndex === 0}
            className="px-4 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#142A46] text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          {!isLastQuestion ? (
            <button
              onClick={() => setActiveQuestionIndex(prev => Math.min(activeSimulado.questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-[#050B14] text-xs font-extrabold flex items-center gap-1.5 shadow-[0_2px_12px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
            >
              <span>Próxima Questão</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          ) : !isFinished ? (
            <button
              onClick={handleFinishExam}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5A3] to-[#00B4D8] text-slate-900 text-xs font-black flex items-center gap-1.5 shadow-[0_2px_20px_rgba(0,229,163,0.4)] transition-all cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Concluir Simulado</span>
            </button>
          ) : (
            <button
              onClick={() => setSelectedSimuladoId(null)}
              className="px-5 py-2.5 rounded-xl bg-[#00E5A3] text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Voltar aos Simulados</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
