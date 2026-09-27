import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';
import {
  Sparkles,
  BookOpen,
  FileQuestion,
  FileText,
  Clock,
  Trophy,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Compass,
  ArrowRight,
  Flame,
  Layers,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TourStep {
  id: string;
  targetView: ViewType;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  keyFeatures: string[];
  proTip: string;
  actionButtonLabel?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetView: 'inicio',
    badge: 'Bem-vindo ao NEXTENF',
    badgeColor: 'text-[#00E5A3] bg-[#00E5A3]/10 border-[#00E5A3]/30',
    icon: Sparkles,
    title: 'Seu Método Definitivo para a Aprovação',
    subtitle: 'Tudo o que você precisa para dominar o concurso de Técnico em Enfermagem.',
    description: 'O NEXTENF foi desenhado para eliminar a sobrecarga de estudos e focar exatamente no que as bancas cobram: prática ativa com flashcards, simulados calibrados e revisões diárias.',
    keyFeatures: [
      '+100 Flashcards com mnemônicos e modo 3D Flip',
      '10 Simulados calibrados (fácil, médio e difícil) com gabarito comentado',
      'Resumos Express com tabelas comparativas e anotações rápidas',
      'Cronômetro de Foco e Checklist que se renova todo dia'
    ],
    proTip: 'Dica de ouro: dedique de 30 a 50 minutos diários com foco absoluto para fixar 4x mais conteúdo.',
    actionButtonLabel: 'Iniciar Tour Guiado'
  },
  {
    id: 'flashcards',
    targetView: 'cards',
    badge: 'Passo 1: Memorização Ativa',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    icon: BookOpen,
    title: 'Flashcards com Repetição Espaçada',
    subtitle: 'Vire os cartões em 3D e transfira o conteúdo para sua memória permanente.',
    description: 'Mais de 100 cards divididos em 8 áreas essenciais da enfermagem. Toque no card para girar e ver a resposta com o mnemônico de ouro e a justificativa clínica.',
    keyFeatures: [
      'Classifique cada card: Novo, Aprendendo ou Dominado',
      'Modo Estudo 3D individual ou Modo Grade para visão panorâmica',
      'Filtros por tema: SUS, Cálculos & Doses, Emergência, Vacinas e mais',
      'Algoritmo que prioriza os cards que você ainda não domina'
    ],
    proTip: 'Ao revisar, tente responder mentalmente antes de virar o card para ativar a memória de recuperação ativa.',
    actionButtonLabel: 'Ver Simulados'
  },
  {
    id: 'simulados',
    targetView: 'questoes',
    badge: 'Passo 2: Treino de Prova',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    icon: FileQuestion,
    title: '10 Simulados Calibrados',
    subtitle: '100 questões com distribuição real no nível das principais bancas.',
    description: 'Cada um dos 10 simulados segue uma calibração rigorosa: 2 questões fáceis, 3 médias e 5 difíceis. Treine com cronômetro de prova e gabarito comentado imediatamente.',
    keyFeatures: [
      'Gabarito justificado pedagógico em todas as alternativas',
      'Cronômetro de prova para simular o tempo real de concurso',
      'Histórico de tentativas gravado na sua conta',
      'Filtro por status: Pendentes, Concluídos e Destaques'
    ],
    proTip: 'Revise sempre as questões que você errou: é exatamente no erro corrigido que mora a sua aprovação.',
    actionButtonLabel: 'Conhecer Resumos'
  },
  {
    id: 'resumos',
    targetView: 'resumos',
    badge: 'Passo 3: Revisão Express',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    icon: FileText,
    title: 'Resumos Express & Mnemônicos Clicáveis',
    subtitle: 'Mapas mentais, fórmulas de gotejamento e tabelas comparativas.',
    description: 'Conteúdo esquematizado para bater o olho e memorizar em minutos. Ideal para revisar antes dos simulados ou na véspera da prova.',
    keyFeatures: [
      'Tabelas de Glasgow, cálculo de gotas/microgotas e calendário vacinal',
      'Botão de cópia rápida das anotações chave para seu caderno pessoal',
      'Marcação de leitura para monitorar os tópicos já vencidos',
      'Filtro por áreas de maior incidência em provas'
    ],
    proTip: 'Use o botão "Copiar Anotações" para colar os esquemas direto no seu bloco de notas ou grupo de estudos.',
    actionButtonLabel: 'Ver Modo Foco'
  },
  {
    id: 'foco',
    targetView: 'foco',
    badge: 'Passo 4: Constância & Foco',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    icon: Clock,
    title: 'Modo Foco & Cronômetro em Tempo Real',
    subtitle: 'Monitore cada minuto líquido de estudo sem distrações.',
    description: 'Inicie sessões de imersão cronometradas por tópico. Todo o seu tempo de dedicação é acumulado no seu histórico diário e nos gráficos de evolução.',
    keyFeatures: [
      'Entrada e saída de sessão registradas automaticamente no sistema',
      'Cronômetro com pausa, retomada e seletor de disciplina',
      'Checklist diário com metas que se renovam automaticamente todo dia',
      'Cofre central que sincroniza seu progresso entre computador e celular'
    ],
    proTip: 'Faça blocos de 25 a 45 minutos no Modo Foco para manter a mente descansada e com alta absorção.',
    actionButtonLabel: 'Ver Sprint & Métricas'
  },
  {
    id: 'sprint',
    targetView: 'sprint',
    badge: 'Passo 5: Reta Final',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    icon: Trophy,
    title: 'Sprint de 7 Dias & Análise de Progresso',
    subtitle: 'O plano intensivo para a última semana antes do concurso.',
    description: 'Um roteiro de 7 dias com missões diárias de teoria, cards e simulados para fechar o edital. E na aba Progresso, visualize seus gráficos de taxa de acerto por disciplina.',
    keyFeatures: [
      '7 dias com missões práticas e objetivas para a reta final',
      'Gráficos de evolução dos últimos 7 dias de estudo',
      'Taxa de acertos discriminada por matéria',
      'Acesse novamente este tutorial quando quiser nas Configurações'
    ],
    proTip: 'Você está no comando! Comece agora revisando seus primeiros 10 flashcards.',
    actionButtonLabel: 'Concluir & Começar a Estudar'
  }
];

export const GuidedTourModal: React.FC = () => {
  const { isTourOpen, completeTour, setCurrentView, user } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = TOUR_STEPS[currentStepIndex];
  const totalSteps = TOUR_STEPS.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Whenever step changes, switch view in the background so the user sees the real feature!
  useEffect(() => {
    if (isTourOpen && step) {
      setCurrentView(step.targetView);
    }
  }, [currentStepIndex, isTourOpen, step, setCurrentView]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, currentStepIndex]);

  if (!isTourOpen) return null;

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    completeTour();
    setCurrentView('inicio');
  };

  const StepIcon = step.icon;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-2xl bg-[#091524] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5A3] via-[#0084FF] to-purple-500" />

        {/* Top Header Bar */}
        <div className="px-5 pt-5 pb-3 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 flex items-center justify-center text-[#00E5A3]">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tour Interativo NEXTENF
              </div>
              <div className="text-xs text-slate-500">
                Passo {currentStepIndex + 1} de {totalSteps} • {progressPercent}% concluído
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFinish}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Pular tutorial
            </button>
            <button
              onClick={handleFinish}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-800/50 h-1">
          <div
            className="h-full bg-gradient-to-r from-[#00E5A3] to-[#0084FF] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {/* Badge & Step Title */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${step.badgeColor.includes('emerald') || step.badgeColor.includes('00E5A3') ? 'bg-[#00E5A3]' : 'bg-sky-400'}`} />
              <span className={step.badgeColor}>{step.badge}</span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5A3]/20 to-[#0084FF]/20 border border-slate-700 flex items-center justify-center shrink-0 text-[#00E5A3] shadow-inner">
                <StepIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {isFirstStep && user?.name
                    ? `Bem-vindo(a), ${user.name.split(' ')[0]}!`
                    : step.title}
                </h2>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  {step.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {step.description}
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00E5A3]" /> O que você vai aproveitar:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#00E5A3]/10 to-transparent border border-[#00E5A3]/25 text-xs text-slate-300">
            <Flame className="w-4 h-4 text-[#00E5A3] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#00E5A3]">Dica Pedagógica: </span>
              {step.proTip}
            </div>
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-5 py-4 bg-[#060D17] border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Step Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentStepIndex
                    ? 'w-6 bg-[#00E5A3]'
                    : i < currentStepIndex
                    ? 'w-2 bg-[#00E5A3]/40 hover:bg-[#00E5A3]/70'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Ir para passo ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00E5A3] text-slate-900 hover:bg-[#00c98f] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#00E5A3]/20"
            >
              <span>{isLastStep ? 'Concluir & Começar!' : step.actionButtonLabel || 'Próximo'}</span>
              {isLastStep ? (
                <GraduationCap className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
