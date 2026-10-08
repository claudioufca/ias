import React from 'react';
import { useAuth } from '../context/AuthContext';
import { METRICAS_SST_GERAL } from '../lib/data';
import {
  TrendingDown,
  HeartPulse,
  AlertTriangle,
  ShieldCheck,
  Brain,
  Sparkles,
  ArrowRight,
  Calendar,
  Briefcase,
  MessageSquareHeart,
  FileHeart,
  DollarSign
} from 'lucide-react';

interface DashboardProps {
  setTelaAtiva: (tela: string) => void;
}

export const DashboardSST: React.FC<DashboardProps> = ({ setTelaAtiva }) => {
  const { pacientes, riscosNR01, vagas, agendamentos, usuarioAtual } = useAuth();

  const totalAcompanhamentos = pacientes.filter((p) => p.status === 'Em Acompanhamento').length;
  const riscosCriticos = riscosNR01.filter((r) => r.nivelRiscoCalculado === 'Crítico').length;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header - Conforme Proposta Técnica IAS Conecta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Dashboard Executivo &bull; IAS Conecta
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Instituto de Autodesenvolvimento e Saúde &bull; Gestão de Riscos NR-01 (Portaria MTE nº 1.419/2024) e Cuidado ao Trabalhador
          </p>
        </div>

        {/* Quick jump to Financeiro & Acolhimento */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setTelaAtiva('financeiro')}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 transition-colors shadow-2xs"
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Módulo Financeiro</span>
          </button>
          <button
            onClick={() => setTelaAtiva('acolhimento')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Canal de Acolhimento (EAP)</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics - Clean, tabular, zero pill boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Taxa de Absenteísmo</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {METRICAS_SST_GERAL.taxaAbsenteismo}%
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" />
              -0.7%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Meta: &lt; 2.5% ao mês</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Colaboradores Acompanhados</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {totalAcompanhamentos}
            </span>
            <span className="text-xs text-slate-500">
              de {pacientes.length} ativos
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Prontuários SOAP com sigilo</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Riscos Críticos no PGR</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {riscosCriticos}
            </span>
            <span className="text-xs text-slate-500">
              de {riscosNR01.length} mapeados
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Planos de ação em execução</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Conformidade NR-01 GRO</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 tabular-nums">
              {METRICAS_SST_GERAL.conformidadeNR01Geral}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Auditável</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Inventário e plano 3 níveis</p>
        </div>
      </div>

      {/* Recurso de IA Integrados - 4 cards organizados e sem poluição */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Recursos de Inteligência Artificial Gemini
            </h2>
            <p className="text-xs text-slate-500">
              Acesso rápido às 4 ferramentas assistivas da plataforma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* IA 1: Resumo Clínico */}
          <button
            onClick={() => setTelaAtiva('prontuarios')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                Resumo Clínico SOAP
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Síntese longitudinal de sessões e escalas psicométricas para prontuário.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-purple-700">
              <span>Acessar</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* IA 2: Match Vagas */}
          <button
            onClick={() => setTelaAtiva('vagas')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Match Candidato × Vaga
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Aderência percentual, pontos fortes, lacunas e fit psicossocial.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-blue-700">
              <span>Acessar</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* IA 3: Análise NR-01 */}
          <button
            onClick={() => setTelaAtiva('nr01')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                Análise NR-01 / PGR
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                3 riscos prioritários e plano de prevenção primária, secundária e terciária.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-amber-800">
              <span>Acessar</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* IA 4: Chat Acolhimento */}
          <button
            onClick={() => setTelaAtiva('acolhimento')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <MessageSquareHeart className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Chat de Acolhimento
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Escuta qualificada de triagem, limites éticos e apoio imediato CVV 188.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-emerald-700">
              <span>Acessar</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Matriz de Riscos & Sessões Agendadas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tabela de Riscos GRO (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Inventário de Riscos Psicossociais (NR-01)
              </h2>
              <p className="text-xs text-slate-500">
                Fatores de tensão monitorados no Programa de Gerenciamento de Riscos
              </p>
            </div>
            <button
              onClick={() => setTelaAtiva('nr01')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
            >
              Ver todos ({riscosNR01.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {riscosNR01.slice(0, 4).map((risco) => {
              const score = risco.probabilidade * risco.severidade;
              const isCritico = risco.nivelRiscoCalculado === 'Crítico';

              return (
                <div
                  key={risco.id}
                  className="py-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {risco.titulo}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {risco.setor} &bull; {risco.categoria}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <span className="font-mono text-slate-600 tabular-nums">
                      P{risco.probabilidade} × S{risco.severidade} ({score})
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isCritico ? 'text-rose-600 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {risco.nivelRiscoCalculado}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agenda Próxima & Plantão (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Próximas Sessões</h2>
              <button
                onClick={() => setTelaAtiva('agendamentos')}
                className="text-xs text-purple-700 hover:underline font-medium"
              >
                Ver agenda
              </button>
            </div>

            <div className="space-y-2.5">
              {agendamentos.slice(0, 3).map((ag) => (
                <div
                  key={ag.id}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span className="truncate">{ag.pacienteNome}</span>
                    <span className="font-mono tabular-nums text-slate-500 shrink-0">
                      {ag.horario.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {ag.tipo} &bull; {ag.data}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Psicóloga Ivna</span>
            <span className="text-slate-400">Instituto de Autodesenvolvimento e Saúde</span>
          </div>
        </div>
      </div>

      {/* Resumo Administrativo & Financeiro B2B (Seções 2.6 e 7 da Proposta) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Gestão Administrativa & Financeira (B2B)
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Seções 2.6 e 7 da Proposta
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Receita Recorrente: <strong className="text-slate-800">R$ 9.955/mês</strong> &bull; 348 vidas cobertas (R$ 28/vida) &bull; Repasses da equipe clínica integrados
            </p>
          </div>
        </div>

        <button
          onClick={() => setTelaAtiva('financeiro')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>Abrir Módulo Financeiro & Contratos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
