import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Share2,
  PlusSquare,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Download,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { promptPwaInstall, canInstallPwa } = useApp();
  const [activeTab, setActiveTab] = useState<'auto' | 'ios' | 'android'>('auto');
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIosDevice);

    // Detect if already running in standalone mode (already installed)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isInStandaloneMode);

    if (isIosDevice) {
      setActiveTab('ios');
    } else if (canInstallPwa) {
      setActiveTab('auto');
    } else {
      setActiveTab('android');
    }
  }, [canInstallPwa]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#040810]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0A1424] border border-[#162942] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#10243C] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5A3] to-[#0084FF] p-[2px] shadow-[0_0_20px_rgba(0,229,163,0.3)] shrink-0">
            <div className="w-full h-full bg-[#060D17] rounded-[14px] flex items-center justify-center text-[#00E5A3]">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Adicionar à Tela Inicial
            </h3>
            <p className="text-xs text-slate-400">
              Instale o NEXTENF no seu celular ou computador sem ocupar espaço
            </p>
          </div>
        </div>

        {/* Standalone notice if already installed */}
        {isStandalone ? (
          <div className="p-4 rounded-2xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 text-xs text-[#00E5A3] flex items-start gap-3 mb-5">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-white block text-sm mb-1">
                Aplicativo já instalado!
              </strong>
              Você já está utilizando o NEXTENF na tela inicial em tela cheia com acesso instantâneo aos seus estudos.
            </div>
          </div>
        ) : null}

        {/* Tabs selector */}
        <div className="flex rounded-xl bg-[#060D17] p-1 border border-[#142A46] mb-6">
          {canInstallPwa && (
            <button
              type="button"
              onClick={() => setActiveTab('auto')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'auto'
                  ? 'bg-[#00E5A3] text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Clique
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-[#00E5A3] text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            iPhone (Safari / iOS)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-[#00E5A3] text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Android (Chrome)
          </button>
        </div>

        {/* TAB 1: AUTO 1-CLICK PROMPT (Chrome, Android, Edge) */}
        {activeTab === 'auto' && canInstallPwa && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0F2238] border border-[#1C3658] text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 flex items-center justify-center text-[#00E5A3]">
                <Download className="w-7 h-7 animate-bounce" />
              </div>
              <h4 className="font-bold text-white text-base">Instalação Direta Disponível!</h4>
              <p className="text-xs text-slate-300">
                Seu navegador suporta a instalação imediata do ícone do aplicativo com um único toque.
              </p>

              <button
                type="button"
                onClick={async () => {
                  await promptPwaInstall();
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00E5A3] to-[#00C2FF] text-[#060D17] font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_25px_rgba(0,229,163,0.35)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Instalar Agora na Tela Inicial</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: iOS SAFARI STEP-BY-STEP */}
        {activeTab === 'ios' && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-300 mb-2">
              No <strong>iPhone / iPad</strong> usando o navegador <strong>Safari</strong>:
            </p>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0084FF]/20 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Toque no botão Compartilhar</span>
                Localizado na <strong>barra inferior do Safari</strong> (o ícone de quadrado com a seta para cima <Share2 className="w-3.5 h-3.5 inline text-[#38BDF8]" />).
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Adicionar à Tela de Início</span>
                Role o menu para baixo e selecione a opção <strong>"Adicionar à Tela de Início"</strong> (ícone com o sinal de mais <PlusSquare className="w-3.5 h-3.5 inline text-[#00E5A3]" />).
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Toque em "Adicionar"</span>
                Confirme no canto superior direito para fixar o ícone oficial do NEXTENF na sua tela inicial!
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANDROID CHROME STEP-BY-STEP */}
        {activeTab === 'android' && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-300 mb-2">
              No <strong>Android</strong> usando o navegador <strong>Google Chrome</strong>:
            </p>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0084FF]/20 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Abra as opções do navegador</span>
                Toque no menu de <strong>três pontinhos (⋮)</strong> no canto superior direito do Chrome.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Instalar aplicativo</span>
                Selecione a opção <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#162942] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div className="text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Confirme a instalação</span>
                O app será adicionado com ícone próprio e abrirá em tela cheia sem barras de endereço.
              </div>
            </div>
          </div>
        )}

        {/* Benefits list */}
        <div className="mt-6 pt-5 border-t border-[#162942] grid grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0" />
            <span>Tela cheia sem barras</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0" />
            <span>Memória 100% preservada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0" />
            <span>Acesso rápido em 1 toque</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0" />
            <span>Sem ocupar espaço/RAM</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-[#10243C] text-white font-bold text-xs hover:bg-[#163050] transition-colors cursor-pointer"
          >
            Fechar Instruções
          </button>
        </div>
      </div>
    </div>
  );
};
