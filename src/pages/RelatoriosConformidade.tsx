import React from 'react';
import { useAuth } from '../context/AuthContext';
import { METRICAS_SST_GERAL } from '../lib/data';
import {
  FileCheck2,
  Printer,
  Download,
  ShieldCheck,
  Building,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export const RelatoriosConformidade: React.FC = () => {
  const { riscosNR01, pacientes, usuarioAtual } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Relatórios & Conformidade SST / eSocial
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dossiê de conformidade para auditoria fiscal da NR-01 (GRO / PGR Psicossocial)
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs"
        >
          <Printer className="w-4 h-4" />
          Imprimir Dossiê Completo
        </button>
      </div>

      {/* Cartão de Resumo Executivo da Auditoria */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase tracking-wider">
                Auditoria Regular
              </span>
              <span className="text-xs text-slate-400">Emissão: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Relatório de Gerenciamento de Riscos Ocupacionais (GRO / NR-01)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Instituto de Autodesenvolvimento e Saúde (IAS) &bull; Preparado para: <strong>Psicóloga Ivna</strong> &bull; Portaria MTE nº 1.419/2024
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Índice de Conformidade
              </span>
              <span className="text-2xl font-black text-emerald-700">
                {METRICAS_SST_GERAL.conformidadeNR01Geral}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Itens Verificados na Norma NR-01 */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900">
            Checklist de Obrigações Legais da NR-01 (Portaria MTE nº 1.419/2024)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">1.5.3.1 Identificação de Perigos Psicossociais</p>
                <p className="text-[11px] text-emerald-900 mt-0.5">
                  Mapeamento de demandas excessivas, baixa autonomia, assédio, jornadas e liderança conforme a proposta técnica.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">1.5.4 Avaliação de Riscos Ocupacionais (Matriz)</p>
                <p className="text-[11px] text-emerald-900 mt-0.5">
                  Critérios objetivos de Severidade × Probabilidade aplicados em 100% dos setores monitorados.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">1.5.5 Controle dos Riscos (Plano 3 Níveis)</p>
                <p className="text-[11px] text-emerald-900 mt-0.5">
                  Planos de ação corretivos contemplando Prevenção Primária, Secundária e Terciária.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">1.5.6 Acompanhamento da Saúde dos Trabalhadores</p>
                <p className="text-[11px] text-emerald-900 mt-0.5">
                  Prontuários SOAP com instrumentos validados (PHQ-9, GAD-7, WHO-5, Maslach) sob sigilo ético estrito.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quadro Consolidado 5W2H */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              Plano de Ação 5W2H Consolidado (Auditoria PGR)
            </h3>
            <span className="text-xs text-slate-500">
              {riscosNR01.length} ações vinculadas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200/80">
                <tr>
                  <th className="py-2 px-3">O quê (What)</th>
                  <th className="py-2 px-3">Por quê (Why)</th>
                  <th className="py-2 px-3">Quem (Who)</th>
                  <th className="py-2 px-3">Onde (Where)</th>
                  <th className="py-2 px-3">Quando (When)</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {riscosNR01.map((r, i) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {r.acoesPreventivas.primaria[0] || 'Revisão de processos'}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Mitigar {r.titulo.toLowerCase()}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      Comitê de SST & Liderança
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {r.setor}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      {r.prazoRevisao}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                        Em Dia
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assinaturas Técnicas */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
          <div className="space-y-1">
            <div className="w-48 border-b border-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Psicóloga Ivna</p>
            <p className="text-[11px] text-slate-500">
              Responsável Técnica &bull; Instituto de Autodesenvolvimento e Saúde (IAS)
            </p>
          </div>

          <div className="space-y-1">
            <div className="w-48 border-b border-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Comitê de Gestão NR-01 & SST</p>
            <p className="text-[11px] text-slate-500">
              Gerenciamento de Riscos Ocupacionais &bull; Portaria MTE nº 1.419/2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
