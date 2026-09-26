import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudySummary } from '../../types';
import {
  FileText,
  Clock,
  CheckCircle,
  X,
  BookOpen,
  Sparkles,
  Printer,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

export const ResumosView: React.FC = () => {
  const {
    summaries,
    selectedSummaryId,
    setSelectedSummaryId,
    markSummaryAsRead
  } = useApp();

  const [copied, setCopied] = useState(false);

  const activeSummary = summaries.find(s => s.id === selectedSummaryId);

  const handleCopyNotes = (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20">
            Resumos Express Clicáveis
          </span>
          <span className="text-xs text-slate-400">
            • Conteúdo esquematizado com tabelas e mnemônicos
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Resumos Express de Enfermagem
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Clique em qualquer resumo para abrir o material de leitura rápida esquematizado com tabelas comparativas, diretrizes oficiais e regras de ouro para concursos.
        </p>
      </div>

      {/* Grid of clickable summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {summaries.map(summary => (
          <div
            key={summary.id}
            onClick={() => setSelectedSummaryId(summary.id)}
            className="bg-[#091526] border border-[#142A46] hover:border-[#00E5A3]/50 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 group shadow-xl hover:shadow-[0_0_30px_rgba(0,229,163,0.12)]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-[#00E5A3] bg-[#0F2642] px-2.5 py-0.5 rounded-lg border border-[#00E5A3]/20">
                  {summary.category}
                </span>

                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {summary.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#00E5A3] transition-colors leading-snug">
                {summary.title}
              </h3>

              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {summary.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#12243B] flex items-center justify-between">
              {summary.isRead ? (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Leitura Concluída</span>
                </span>
              ) : (
                <span className="text-xs text-slate-500">Pendente de leitura</span>
              )}

              <span className="text-xs font-bold text-[#00E5A3] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Abrir Resumo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL READER FOR CLICKABLE SUMMARY */}
      {activeSummary && (
        <div className="fixed inset-0 z-50 bg-[#040810]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#091526] border border-[#162D4A] rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#142A46]">
              <div>
                <span className="text-xs font-bold text-[#00E5A3] bg-[#0F2642] px-3 py-1 rounded-full border border-[#00E5A3]/20">
                  {activeSummary.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 leading-tight">
                  {activeSummary.title}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00E5A3]" />
                    {activeSummary.readTime}
                  </span>
                  <span>•</span>
                  <span>Enfermagem & Concursos</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSummaryId(null)}
                className="p-2 rounded-xl bg-[#0F2238] hover:bg-[#162D4A] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Introduction */}
            <div className="p-4 rounded-2xl bg-[#060D17] border border-[#142A46] text-sm text-slate-200 leading-relaxed">
              {activeSummary.content.introduction}
            </div>

            {/* Content points */}
            <div className="space-y-5">
              {activeSummary.content.points.map((point, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5A3]" />
                    {point.subtitle}
                  </h4>
                  <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-slate-300">
                    {point.details.map((d, dIdx) => (
                      <li key={dIdx} className="leading-relaxed list-disc marker:text-[#00E5A3]">
                        {d}
                      </li>
                    ))}
                  </ul>
                  {point.tip && (
                    <div className="mt-2 p-3 rounded-xl bg-[#0F2642] border border-[#00E5A3]/20 text-xs text-[#00E5A3] font-medium">
                      💡 {point.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Clinical table */}
            {activeSummary.content.tableData && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Tabela Esquematizada de Referência:</h4>
                <div className="overflow-x-auto rounded-2xl border border-[#142A46]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#060D17] text-[#00E5A3] font-bold border-b border-[#142A46]">
                      <tr>
                        {activeSummary.content.tableData.headers.map((h, i) => (
                          <th key={i} className="p-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#142A46] bg-[#0A1628]/60 text-slate-200">
                      {activeSummary.content.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#0D1E34] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Golden rule banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00E5A3]/15 to-[#0084FF]/15 border border-[#00E5A3]/40 text-xs sm:text-sm text-slate-200">
              <span className="font-bold text-[#00E5A3] block mb-1">
                ⭐ Regra de Ouro para a Prova:
              </span>
              {activeSummary.content.goldenRule}
            </div>

            {/* Modal actions footer */}
            <div className="pt-4 border-t border-[#142A46] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyNotes(JSON.stringify(activeSummary.content, null, 2))}
                  className="px-3.5 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#142A46] text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00E5A3]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Notas'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    markSummaryAsRead(activeSummary.id);
                    setSelectedSummaryId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-extrabold text-xs flex items-center gap-2 shadow-[0_2px_15px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Marcar como Lido (+Progresso)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
