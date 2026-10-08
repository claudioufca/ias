import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PacienteProntuario, SessaoSOAP } from '../lib/types';
import { gerarResumoEvolucaoClinica } from '../lib/gemini';
import {
  FileHeart,
  Plus,
  Sparkles,
  Printer,
  Copy,
  Check,
  Search,
  BookOpen,
  Loader2,
  FileText
} from 'lucide-react';

export const ProntuarioView: React.FC = () => {
  const { pacientes, atualizarPaciente, adicionarSessaoSOAP, usuarioAtual } = useAuth();
  const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState<string>(pacientes[0]?.id || '');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [gerandoResumo, setGerandoResumo] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [modalNovaSessao, setModalNovaSessao] = useState(false);

  // Form nova sessão
  const [novaSessao, setNovaSessao] = useState({
    tipo: 'Individual' as SessaoSOAP['tipo'],
    subjetivo: '',
    objetivo: '',
    avaliacao: '',
    plano: '',
  });

  const pacienteSelecionado = pacientes.find((p) => p.id === pacienteSelecionadoId) || pacientes[0];

  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = filtroBusca.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.matricula.toLowerCase().includes(termo) ||
      p.setor.toLowerCase().includes(termo)
    );
  });

  const handleGerarResumoIA = async () => {
    if (!pacienteSelecionado) return;
    setGerandoResumo(true);
    try {
      const resultado = await gerarResumoEvolucaoClinica(pacienteSelecionado);
      atualizarPaciente({
        ...pacienteSelecionado,
        resumoIA: {
          conteudo: resultado.resumo,
          dataGeracao: new Date().toLocaleDateString('pt-BR'),
          geradoPor: usuarioAtual.nome,
        },
      });
    } catch (err) {
      console.error('Erro ao gerar resumo:', err);
    } finally {
      setGerandoResumo(false);
    }
  };

  const handleSalvarNovaSessao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteSelecionado || !novaSessao.subjetivo) return;

    adicionarSessaoSOAP(pacienteSelecionado.id, novaSessao);
    setNovaSessao({
      tipo: 'Individual',
      subjetivo: '',
      objetivo: '',
      avaliacao: '',
      plano: '',
    });
    setModalNovaSessao(false);
  };

  const handleCopiarResumo = () => {
    if (pacienteSelecionado?.resumoIA?.conteudo) {
      navigator.clipboard.writeText(pacienteSelecionado.resumoIA.conteudo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header - Conforme Seção 2.2 da Proposta Técnica */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Prontuário Eletrônico &bull; Anamnese & Evolução Clínica
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evolução por sessão em modelo <span translate="no" className="font-semibold text-slate-800">SOAP</span> (Subjetivo, Objetivo, Avaliação, Plano) com escalas integradas (PHQ-9, GAD-7, WHO-5, Maslach).
          </p>
        </div>

        <button
          onClick={() => setModalNovaSessao(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Sessão (SOAP)</span>
        </button>
      </div>

      {/* Main Grid: Lista de Pacientes + Detalhe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Lista de Pacientes (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={filtroBusca}
              onChange={(e) => setFiltroBusca(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100 max-h-[580px] overflow-y-auto">
            {pacientesFiltrados.map((paciente) => {
              const isSelected = paciente.id === pacienteSelecionado?.id;
              return (
                <button
                  key={paciente.id}
                  onClick={() => setPacienteSelecionadoId(paciente.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    isSelected ? 'bg-slate-100/90' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-xs text-slate-900 truncate">
                      {paciente.nome}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {paciente.matricula}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {paciente.cargo} &bull; {paciente.setor}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Risco {paciente.riscoGravidade}</span>
                    <span className="tabular-nums font-mono">
                      {paciente.sessoes.length} sessões
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Ficha do Colaborador (8 cols) */}
        {pacienteSelecionado && (
          <div className="lg:col-span-8 space-y-5">
            {/* Cabeçalho da Ficha */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-base font-bold text-slate-900">
                      {pacienteSelecionado.nome}
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {pacienteSelecionado.matricula}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {pacienteSelecionado.cargo} &bull; {pacienteSelecionado.setor} &bull; {pacienteSelecionado.idade} anos
                  </p>
                  <p className="text-xs text-slate-700 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong className="text-slate-900">Queixa:</strong> {pacienteSelecionado.queixaPrincipal}
                  </p>
                </div>

                {/* BOTÃO PRINCIPAL GEMINI IA */}
                <button
                  onClick={handleGerarResumoIA}
                  disabled={gerandoResumo}
                  className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg transition-colors shadow-2xs shrink-0 disabled:opacity-50"
                >
                  {gerandoResumo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analisando sessões SOAP...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Resumo de Evolução com IA</span>
                    </>
                  )}
                </button>
              </div>

              {/* Psicometria - Clean Tabular Metrics */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Burnout (MBI)</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {pacienteSelecionado.escalas.mbiBurnout}/100
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ansiedade (GAD-7)</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {pacienteSelecionado.escalas.ansiedadeGad7}/21
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Depressão (PHQ-9)</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {pacienteSelecionado.escalas.depressaoPhq9}/27
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estresse Percebido</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {pacienteSelecionado.escalas.estressePercebido}/40
                  </span>
                </div>
              </div>
            </div>

            {/* Parecer IA - Clean Document Style */}
            {pacienteSelecionado.resumoIA && (
              <div className="bg-white rounded-xl border border-purple-200 p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-700" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        Síntese de Evolução Clínica (Parecer Técnico)
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Gerado em {pacienteSelecionado.resumoIA.dataGeracao} &bull; Gemini 3.8 Flash
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopiarResumo}
                      className="p-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                    >
                      {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiado ? 'Copiado' : 'Copiar'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line bg-slate-50/50 p-3.5 rounded-lg border border-slate-100">
                  {pacienteSelecionado.resumoIA.conteudo}
                </div>
              </div>
            )}

            {/* Histórico SOAP */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Evolução por Sessão &bull; Modelo <span translate="no" className="font-mono">SOAP</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Subjetivo (relato), Objetivo (observação e psicometria), Avaliação (análise clínica) e Plano (conduta).
                  </p>
                </div>
              </div>

              {pacienteSelecionado.sessoes.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Nenhuma sessão registrada para este paciente ainda.
                </p>
              ) : (
                <div className="space-y-3">
                  {pacienteSelecionado.sessoes.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1.5 border-b border-slate-200/60">
                        <span className="font-semibold text-slate-900">
                          Sessão #{s.numero} &bull; {s.tipo}
                        </span>
                        <span>{s.data} &bull; {s.psicologo}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <strong className="text-slate-900 block mb-0.5">S (Subjetivo):</strong>
                          <p className="text-slate-600">{s.subjetivo}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-0.5">O (Objetivo):</strong>
                          <p className="text-slate-600">{s.objetivo}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-0.5">A (Avaliação):</strong>
                          <p className="text-slate-600">{s.avaliacao}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-0.5">P (Plano):</strong>
                          <p className="text-slate-600">{s.plano}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Nova Sessão SOAP */}
      {modalNovaSessao && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Registrar Evolução SOAP &bull; {pacienteSelecionado?.nome}
              </h3>
              <button
                onClick={() => setModalNovaSessao(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarNovaSessao} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Tipo:</label>
                <select
                  value={novaSessao.tipo}
                  onChange={(e: any) => setNovaSessao({ ...novaSessao, tipo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Individual">Individual (Consulta Psicológica)</option>
                  <option value="Plantão Psicológico">Plantão de Acolhimento</option>
                  <option value="Retorno">Retorno</option>
                  <option value="Pericial Ocupacional">Parecer Ocupacional SST</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  [S] Subjetivo (Relato do colaborador):
                </label>
                <textarea
                  required
                  rows={2}
                  value={novaSessao.subjetivo}
                  onChange={(e) => setNovaSessao({ ...novaSessao, subjetivo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  [O] Objetivo (Observações e dados observáveis):
                </label>
                <textarea
                  required
                  rows={2}
                  value={novaSessao.objetivo}
                  onChange={(e) => setNovaSessao({ ...novaSessao, objetivo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  [A] Avaliação (Análise clínica e fatores de trabalho):
                </label>
                <textarea
                  required
                  rows={2}
                  value={novaSessao.avaliacao}
                  onChange={(e) => setNovaSessao({ ...novaSessao, avaliacao: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  [P] Plano (Conduta, acordos e encaminhamentos):
                </label>
                <textarea
                  required
                  rows={2}
                  value={novaSessao.plano}
                  onChange={(e) => setNovaSessao({ ...novaSessao, plano: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalNovaSessao(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition"
                >
                  Salvar Sessão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
