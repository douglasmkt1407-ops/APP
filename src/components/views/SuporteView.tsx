import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Send,
  CheckCircle2,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const SuporteView: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SUPPORT_EMAIL = 'douglasofc11@gmail.com';

  const faqs = [
    {
      q: 'Como funciona o sistema de repetição dos Flashcards?',
      a: 'Os flashcards utilizam metodologia de repetição espaçada. Cartões marcados como "Dominado" são consolidados, enquanto os marcados como "Aprendendo" retornam para reforço até a sua completa fixação.'
    },
    {
      q: 'Como são distribuídas as questões nos 10 Simulados?',
      a: 'Cada um dos 10 simulados possui rigorosamente 10 questões, balanceadas em: 2 questões de nível fácil (fixação conceitual), 3 questões de nível médio (aplicação clínica) e 5 questões de nível difícil (casos complexos das bancas FGV, Cebraspe, FCC e IBFC).'
    },
    {
      q: 'Como recebo as notificações de estudo no meu navegador?',
      a: 'Acesse a aba "Configurações" e ative o botão de notificações. O navegador solicitará permissão para emitir os lembretes nos horários matutino, vespertino ou noturno selecionados por você.'
    },
    {
      q: 'Como posso zerar todos os meus dados e histórico?',
      a: 'Você pode zerar a qualquer momento acessando a aba "Configurações" e clicando em "Zerar Todos os Dados", ou diretamente no botão "Zerar dados de estudo" na tela inicial.'
    },
    {
      q: 'Como entrar em contato com o suporte pedagógico ou técnico?',
      a: 'O canal exclusivo de suporte oficial é através do e-mail douglasofc11@gmail.com. Você pode nos enviar uma mensagem diretamente pelo formulário abaixo ou pelo seu cliente de e-mail preferido.'
    }
  ];

  const handleCopyEmail = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SUPPORT_EMAIL);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = SUPPORT_EMAIL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setSentSuccess(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setSentSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Central de Ajuda & Atendimento Oficial
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Suporte ao Aluno NEXTENF
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Atendimento exclusivo para alunos e futuros aprovados. Tire dúvidas técnicas, informe melhorias ou solicite orientações.
        </p>
      </div>

      {/* Official Single Support Channel: E-mail only */}
      <div className="bg-gradient-to-r from-[#09172B] to-[#0A1F36] border border-[#183659] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 flex items-center justify-center text-[#00E5A3] shrink-0 shadow-[0_0_20px_rgba(0,229,163,0.2)]">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00E5A3]">Canal Oficial de Atendimento</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3]" />
                <span className="text-[11px] text-slate-400">Resposta Rápida</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 font-mono select-all">
                {SUPPORT_EMAIL}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Envie suas dúvidas, comprovantes, sugestões ou suporte para o nosso e-mail oficial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#162D4A] text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">E-mail Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copiar E-mail</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Suporte%20NEXTENF%20-%20T%C3%A9cnico%20em%20Foco`}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_2px_15px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Escrever E-mail</span>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FileQuestion className="w-4 h-4 text-[#00E5A3]" />
          Dúvidas Frequentes (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#142A46] bg-[#060D17] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-[#00E5A3] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#00E5A3] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-[#142A46]/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact ticket form */}
      <form
        onSubmit={handleSubmitTicket}
        className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#142A46]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-[#00E5A3]" />
            Enviar Mensagem Direta para a Equipe
          </h2>

          {sentSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Mensagem enviada para {SUPPORT_EMAIL}!
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Assunto da Mensagem
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Dúvida sobre o gabarito do Simulado 03 ou sugestão"
              value={ticketSubject}
              onChange={e => setTicketSubject(e.target.value)}
              className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Descrição Detalhada
            </label>
            <textarea
              rows={4}
              required
              placeholder="Descreva aqui sua mensagem ou solicitação..."
              value={ticketMessage}
              onChange={e => setTicketMessage(e.target.value)}
              className="w-full bg-[#060D17] border border-[#142A46] rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00E5A3]" />
            <span>As mensagens são encaminhadas diretamente para <strong>{SUPPORT_EMAIL}</strong>.</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_2px_12px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Mensagem</span>
          </button>
        </div>
      </form>
    </div>
  );
};
