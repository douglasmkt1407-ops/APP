import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const ModoFocoView: React.FC = () => {
  const { addStudySeconds, setCurrentView } = useApp();

  // Stopwatch state
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Leitura Focada');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Focus topics
  const topics = [
    'Leitura Focada',
    'Revisão de Cards',
    'Resolução de Questões',
    'Resumos Express',
    'Estudo Livre'
  ];

  // Soft sound feedback generator using AudioContext
  const playFocusChime = (type: 'start' | 'pause' | 'reset') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'start') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
      } else if (type === 'pause') {
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(523.25, audioCtx.currentTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      }

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.26);
    } catch {
      // AudioContext not supported
    }
  };

  // Stopwatch interval timer and un-synced seconds tracking
  const accruedSecondsRef = useRef<number>(0);
  const addStudySecondsRef = useRef(addStudySeconds);

  useEffect(() => {
    addStudySecondsRef.current = addStudySeconds;
  }, [addStudySeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        // Pure state update - no side effects!
        setSeconds(prev => prev + 1);

        // Track seconds accrued since last sync
        accruedSecondsRef.current += 1;

        // Every 10 seconds of active focus, safely flush to stats outside of state updater
        if (accruedSecondsRef.current >= 10) {
          const toAdd = accruedSecondsRef.current;
          accruedSecondsRef.current = 0;
          addStudySecondsRef.current(toAdd);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Flush remaining unsynced seconds on unmount
  useEffect(() => {
    return () => {
      if (accruedSecondsRef.current > 0) {
        const remaining = accruedSecondsRef.current;
        accruedSecondsRef.current = 0;
        // Run outside of unmount render cycle safely
        setTimeout(() => {
          addStudySecondsRef.current(remaining);
        }, 0);
      }
    };
  }, []);

  // Handle Play / Pause toggle
  const togglePlayPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      playFocusChime('start');
    } else {
      setIsRunning(false);
      // Flush residual seconds to stats
      if (accruedSecondsRef.current > 0) {
        const residual = accruedSecondsRef.current;
        accruedSecondsRef.current = 0;
        addStudySecondsRef.current(residual);
      }
      playFocusChime('pause');
    }
  };

  // Handle Reset
  const handleReset = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    // Flush any pending seconds before resetting
    if (accruedSecondsRef.current > 0) {
      const residual = accruedSecondsRef.current;
      accruedSecondsRef.current = 0;
      addStudySecondsRef.current(residual);
    }
    setSeconds(0);
    playFocusChime('reset');
  };

  // Toggle Fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Format time helpers (HH:MM:SS)
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Total session hours / minutes
  const sessionMinutes = Math.floor(seconds / 60);

  return (
    <div className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-between p-4 sm:p-8 select-none overflow-y-auto animate-fadeIn">
      {/* Top Bar with Clean Minimalist Controls */}
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentView('inicio')}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white px-3 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 transition-all border border-neutral-800/80 cursor-pointer"
          title="Sair do Modo Foco e voltar ao Início"
        >
          <ArrowLeft className="w-4 h-4 text-[#00E5A3]" />
          <span>Voltar ao Início</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Audio Chime Toggle */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#00E5A3]/10 text-[#00E5A3] border-[#00E5A3]/40'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
            title={soundEnabled ? 'Sons de foco ativados' : 'Ativar sons sutis de foco'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 transition-all cursor-pointer"
            title={isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia (imersão total)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center Hero: Minimalist Topic Selector, Rotating Loading Circle, Stopwatch & Green Button */}
      <div className="flex flex-col items-center justify-center my-auto py-6 sm:py-10 max-w-xl mx-auto w-full text-center">
        {/* Topic Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 max-w-md">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedTopic === t
                  ? 'bg-neutral-800 text-[#00E5A3] border border-[#00E5A3]/50 font-bold shadow-[0_0_15px_rgba(0,229,163,0.15)]'
                  : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Minimalist Rotating Loading Circle & Stopwatch Container */}
        <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {/* Subtle Outer Ambient Glow Ring */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${
              isRunning ? 'opacity-100 shadow-[0_0_80px_rgba(0,229,163,0.15)]' : 'opacity-0'
            }`}
          />

          {/* Minimalist Rotating Spinner Ring (smooth loading circle) */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all ${
              isRunning
                ? 'border-neutral-900 border-t-[#00E5A3] border-r-[#00E5A3]/40 animate-spin duration-[8000ms] shadow-[0_0_20px_rgba(0,229,163,0.2)]'
                : 'border-neutral-900/80 border-t-neutral-700'
            }`}
            style={{
              animationDuration: isRunning ? '6s' : '0s'
            }}
          />

          {/* Secondary Delicate Inner Dashed Circle for Depth */}
          <div
            className={`absolute inset-4 sm:inset-5 rounded-full border border-dashed transition-all ${
              isRunning ? 'border-[#00E5A3]/25 animate-spin duration-[16000ms]' : 'border-neutral-900'
            }`}
            style={{
              animationDirection: 'reverse',
              animationDuration: isRunning ? '14s' : '0s'
            }}
          />

          {/* Center Digital Display */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Live Status indicator */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  isRunning
                    ? 'bg-[#00E5A3] animate-ping'
                    : 'bg-neutral-600'
                }`}
              />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400">
                {isRunning ? 'Foco em Andamento' : seconds > 0 ? 'Foco Pausado' : 'Pronto para Estudar'}
              </span>
            </div>

            {/* Stopwatch Time */}
            <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              {formatTime(seconds)}
            </div>

            {/* Category / Session Subtitle */}
            <div className="text-xs text-neutral-400 font-medium mt-3 flex items-center gap-1.5">
              <span className="text-[#00E5A3]">●</span>
              <span>{selectedTopic}</span>
            </div>
          </div>
        </div>

        {/* 2 Control Buttons: Green Play/Pause Button + Reset Button */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10 w-full max-w-xs">
          {/* 1. Green Play/Pause Button with Stopwatch */}
          <button
            onClick={togglePlayPause}
            className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 cursor-pointer ${
              isRunning
                ? 'bg-[#00E5A3] text-black hover:bg-[#00c98f] shadow-[0_0_35px_rgba(0,229,163,0.4)]'
                : 'bg-[#00E5A3] text-black hover:bg-[#00c98f] shadow-[0_0_30px_rgba(0,229,163,0.3)] hover:shadow-[0_0_40px_rgba(0,229,163,0.5)]'
            }`}
            title={isRunning ? 'Pausar o cronômetro' : 'Iniciar o estudo focado'}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausar Foco</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <Clock className="w-4 h-4 opacity-80" />
                <span>{seconds > 0 ? 'Retomar' : 'Iniciar Foco'}</span>
              </>
            )}
          </button>

          {/* 2. Reset Button (Reiniciar o tempo) */}
          <button
            onClick={handleReset}
            disabled={seconds === 0}
            className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              seconds > 0
                ? 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 hover:bg-neutral-800'
                : 'bg-neutral-950 border-neutral-900 text-neutral-700 cursor-not-allowed'
            }`}
            title="Reiniciar cronômetro para 00:00:00"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Time Sync Badge */}
        <div className="mt-6 flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950 border border-neutral-900 px-4 py-2 rounded-full">
          <Clock className="w-3.5 h-3.5 text-[#00E5A3]" />
          <span>
            {sessionMinutes > 0
              ? `${sessionMinutes} min adicionados ao seu progresso de hoje`
              : 'O tempo é computado automaticamente no seu gráfico de progresso'}
          </span>
        </div>
      </div>

      {/* Bottom Minimalist Footer */}
      <div className="w-full max-w-xl mx-auto text-center pt-4 border-t border-neutral-900">
        <p className="text-xs text-neutral-500 italic">
          “A disciplina é a ponte entre suas metas e suas realizações na enfermagem.”
        </p>
      </div>
    </div>
  );
};
