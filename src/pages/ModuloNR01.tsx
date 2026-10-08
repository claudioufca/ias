import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RiscoNR01, AnaliseNR01Resultado } from '../lib/types';
import { analisarNR01PGR } from '../lib/gemini';
import {
  ShieldAlert,
  Sparkles,
  Plus,
  Printer,
  Loader2,
  FileText,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const ModuloNR01: React.FC = () => {
  const { riscosNR01, adicionarRiscoNR01 } = useAuth();
  const [setorSelecionado, setSetorSelecionado] = useState('Tecnologia da Informação & Engenharia');
  const [analisandoPGR, setAnalisandoPGR] = useState(false);
  const [resultadoAnalise, setResultadoAnalise] = useState<AnaliseNR01Resultado | null>(null);
  const [modalNovoRisco, setModalNovoRisco] = useState(false);

  const setoresDisponiveis = [
    'Tecnologia da Informação & Engenharia',
    'Atendimento ao Cliente & Suporte Técnico (SAC)',
    'Logística & Expedição Fabril',
    'Administrativo & Finanças',
  ];

  // Novo risco
  const [novoRisco, setNovoRisco] = useState({
    titulo: '',
    setor: setorSelecionado,
    cargo: '',
    categoria: 'Organização do Trabalho' as RiscoNR01['categoria'],
    fatorEstressor: '',
    consequenciasPossiveis: '',
    probabilidade: 3,
    severidade: 3,
    statusControle: 'Pendente' as RiscoNR01['statusControle'],
    acoesPreventivas: {
      primaria: ['Revisão de fluxos e limites operacionais'],
      secundaria: ['Treinamento de equipe em gestão de estresse'],
      terciaria: ['Canal de escuta psicológica IAS Conecta'],
    },
    prazoRevisao: '30/06/2026',
  });

  const riscosDoSetor = riscosNR01.filter((r) => r.setor.includes(setorSelecionado.split(' ')[0]));

  const handleExecutarAnaliseIA = async () => {
    setAnalisandoPGR(true);
    try {
      const dadosSetor = {
        setor: setorSelecionado,
        totalColaboradores: 45,
        taxaAbsenteismo: '2.1%',
        queixasFrequentes: 'Sobrecarga, prazos comprimidos e cansaço visual',
      };

      const resultado = await analisarNR01PGR(setorSelecionado, dadosSetor, riscosDoSetor);
      setResultadoAnalise(resultado);
    } catch (err) {
      console.error('Erro na análise NR-01:', err);
    } finally {
      setAnalisandoPGR(false);
    }
  };

  const handleSalvarRisco = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(novoRisco.probabilidade);
    const s = Number(novoRisco.severidade);
    const score = p * s;

    let nivel: RiscoNR01['nivelRiscoCalculado'] = 'Moderado';
    if (score >= 16) nivel = 'Crítico';
    else if (score >= 10) nivel = 'Substancial';
    else if (score <= 4) nivel = 'Tolerável';

    const riscoCriado: RiscoNR01 = {
      id: `rsk-${Date.now()}`,
      titulo: novoRisco.titulo,
      setor: novoRisco.setor,
      cargo: novoRisco.cargo,
      categoria: novoRisco.categoria,
      fatorEstressor: novoRisco.fatorEstressor,
      consequenciasPossiveis: novoRisco.consequenciasPossiveis,
      probabilidade: p,
      severidade: s,
      nivelRiscoCalculado: nivel,
      statusControle: novoRisco.statusControle,
      acoesPreventivas: novoRisco.acoesPreventivas,
      prazoRevisao: novoRisco.prazoRevisao,
    };

    adicionarRiscoNR01(riscoCriado);
    setModalNovoRisco(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Módulo NR-01: Riscos Psicossociais & PGR
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Gerenciamento de Riscos Ocupacionais (GRO) e planos de prevenção em 3 níveis.
          </p>
        </div>

        <button
          onClick={() => setModalNovoRisco(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Risco</span>
        </button>
      </div>

      {/* Seletor de Setor e Ação IA */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {setoresDisponiveis.map((setor) => {
              const isSelected = setor === setorSelecionado;
              return (
                <button
                  key={setor}
                  onClick={() => {
                    setSetorSelecionado(setor);
                    setResultadoAnalise(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {setor.split('&')[0].trim()}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleExecutarAnaliseIA}
            disabled={analisandoPGR}
            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors shadow-2xs shrink-0 disabled:opacity-50"
          >
            {analisandoPGR ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Analisando PGR com Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>🧠 Análise NR-01 com IA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RELATÓRIO IA GERADO */}
      {resultadoAnalise && (
        <div className="bg-white rounded-xl border border-amber-200 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Parecer Técnico NR-01 GRO & 3 Riscos Prioritários
              </h2>
              <p className="text-xs text-slate-500">
                Setor: {setorSelecionado} &bull; Diretrizes da Portaria MTE nº 4.219
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>

          {/* Diagnóstico Geral */}
          <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed border border-slate-100">
            <strong className="text-slate-900 block mb-1">Diagnóstico Geral:</strong>
            <p>{resultadoAnalise.diagnosticoGeral}</p>
          </div>

          {/* Top 3 Riscos */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Os 3 Riscos Prioritários Identificados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {resultadoAnalise.riscosPrioritarios.map((risco, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-white space-y-2 text-xs"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono font-bold text-[10px] text-slate-400">
                      R-0{idx + 1}
                    </span>
                    <span className="font-semibold text-rose-700 text-[11px]">
                      {risco.nivelRisco}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 leading-snug">
                    {risco.titulo}
                  </p>

                  <p className="text-[11px] text-slate-500">
                    {risco.categoria} &bull; Severidade: {risco.severidade}
                  </p>

                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                    {risco.justificativa}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Plano 3 Níveis */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Plano de Ação Estruturado (3 Níveis)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Nível 1 */}
              <div className="space-y-2">
                <strong className="text-emerald-800 text-xs block">
                  1. Prevenção Primária (Origem)
                </strong>
                {resultadoAnalise.planoAcao.prevencaoPrimaria.map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <p className="font-semibold text-slate-900">{item.acao}</p>
                    <p className="text-[11px] text-slate-500">
                      Resp: {item.responsavel} &bull; Prazo: {item.prazo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Nível 2 */}
              <div className="space-y-2">
                <strong className="text-blue-800 text-xs block">
                  2. Prevenção Secundária (Suporte)
                </strong>
                {resultadoAnalise.planoAcao.prevencaoSecundaria.map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <p className="font-semibold text-slate-900">{item.acao}</p>
                    <p className="text-[11px] text-slate-500">
                      Resp: {item.responsavel} &bull; Prazo: {item.prazo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Nível 3 */}
              <div className="space-y-2">
                <strong className="text-purple-800 text-xs block">
                  3. Prevenção Terciária (Cuidado)
                </strong>
                {resultadoAnalise.planoAcao.prevencaoTerciaria.map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <p className="font-semibold text-slate-900">{item.acao}</p>
                    <p className="text-[11px] text-slate-500">
                      Resp: {item.responsavel} &bull; Prazo: {item.prazo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabela do Inventário de Riscos Geral */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Inventário de Riscos Cadastrados ({riscosNR01.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {riscosNR01.map((r) => {
            const score = r.probabilidade * r.severidade;
            return (
              <div key={r.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{r.titulo}</p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {r.setor} &bull; {r.cargo}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-right">
                  <span className="font-mono text-slate-600 tabular-nums">
                    P{r.probabilidade} × S{r.severidade} ({score})
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {r.nivelRiscoCalculado}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Cadastro de Risco */}
      {modalNovoRisco && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Cadastrar Fator de Risco Psicossocial (NR-01)
              </h3>
              <button
                onClick={() => setModalNovoRisco(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarRisco} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Título:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sobrecarga mental por prazos concorrentes"
                  value={novoRisco.titulo}
                  onChange={(e) => setNovoRisco({ ...novoRisco, titulo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Setor:</label>
                  <select
                    value={novoRisco.setor}
                    onChange={(e) => setNovoRisco({ ...novoRisco, setor: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {setoresDisponiveis.map((s) => (
                      <option key={s} value={s}>{s.split('&')[0].trim()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Cargo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Analistas"
                    value={novoRisco.cargo}
                    onChange={(e) => setNovoRisco({ ...novoRisco, cargo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Fator Estressor:</label>
                <textarea
                  required
                  rows={2}
                  value={novoRisco.fatorEstressor}
                  onChange={(e) => setNovoRisco({ ...novoRisco, fatorEstressor: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Probabilidade (1-5):</label>
                  <select
                    value={novoRisco.probabilidade}
                    onChange={(e) => setNovoRisco({ ...novoRisco, probabilidade: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value={1}>1 - Rara</option>
                    <option value={2}>2 - Pouco Provável</option>
                    <option value={3}>3 - Provável</option>
                    <option value={4}>4 - Frequente</option>
                    <option value={5}>5 - Muito Frequente</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Severidade (1-5):</label>
                  <select
                    value={novoRisco.severidade}
                    onChange={(e) => setNovoRisco({ ...novoRisco, severidade: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value={1}>1 - Leve</option>
                    <option value={2}>2 - Moderada</option>
                    <option value={3}>3 - Relevante</option>
                    <option value={4}>4 - Grave</option>
                    <option value={5}>5 - Catastrófica</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalNovoRisco(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition"
                >
                  Salvar Risco
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
