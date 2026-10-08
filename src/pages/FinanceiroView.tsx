import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CONTRATOS_INICIAIS, REPASSES_INICIAIS } from '../lib/data';
import {
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  CreditCard,
  Plus,
  Calculator,
  FileText,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface FinanceiroProps {
  setTelaAtiva?: (tela: string) => void;
}

export const FinanceiroView: React.FC<FinanceiroProps> = ({ setTelaAtiva }) => {
  const { usuarioAtual } = useAuth();
  const [contratos, setContratos] = useState(CONTRATOS_INICIAIS);
  const [repasses, setRepasses] = useState(REPASSES_INICIAIS);

  // Simulador comercial interativo (Seção 7 da Proposta)
  const [simuladorVidas, setSimuladorVidas] = useState(100);
  const [simuladorValorVida, setSimuladorValorVida] = useState(25); // faixa R$ 15 a R$ 40

  // Modal novo contrato
  const [modalNovoContrato, setModalNovoContrato] = useState(false);
  const [novoContrato, setNovoContrato] = useState({
    empresa: '',
    cnpj: '',
    plano: 'Integral NR-01 + EAP' as const,
    vidasCobertas: 50,
    valorPorVida: 25,
  });

  // Métricas financeiras calculadas
  const mrrTotal = contratos.reduce((acc, c) => acc + c.mensalidadeTotal, 0);
  const totalVidas = contratos.reduce((acc, c) => acc + c.vidasCobertas, 0);
  const totalRepassesMes = repasses.reduce((acc, r) => acc + r.totalRepasse, 0);
  const margemBrutaEstimada = mrrTotal - totalRepassesMes;

  const handleSalvarContrato = (e: React.FormEvent) => {
    e.preventDefault();
    const novo = {
      id: `cnt-${Date.now()}`,
      empresa: novoContrato.empresa,
      cnpj: novoContrato.cnpj,
      plano: novoContrato.plano,
      vidasCobertas: novoContrato.vidasCobertas,
      valorPorVida: novoContrato.valorPorVida,
      mensalidadeTotal: novoContrato.vidasCobertas * novoContrato.valorPorVida,
      dataInicio: new Date().toLocaleDateString('pt-BR'),
      status: 'Ativo' as const,
      vencimento: 'Todo dia 10',
    };
    setContratos([novo, ...contratos]);
    setModalNovoContrato(false);
    setNovoContrato({
      empresa: '',
      cnpj: '',
      plano: 'Integral NR-01 + EAP',
      vidasCobertas: 50,
      valorPorVida: 25,
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          {setTelaAtiva && (
            <button
              onClick={() => setTelaAtiva('dashboard')}
              className="text-xs text-slate-500 hover:text-slate-800 mb-1 inline-flex items-center gap-1 font-medium transition-colors"
            >
              ← Voltar ao Dashboard
            </button>
          )}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Administrativo & Financeiro
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Gestão de assinaturas corporativas, faturamento e repasses clínicos da plataforma (Seções 2.6 e 7 da Proposta).
          </p>
        </div>

        <button
          onClick={() => setModalNovoContrato(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Contrato Corporativo</span>
        </button>
      </div>

      {/* 4 Cards de Métricas Financeiras */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Receita Recorrente (MRR)</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              R$ {mrrTotal.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            +18% no trimestre
          </p>
        </div>

        {/* Vidas Cobertas */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Colaboradores Cobertos</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {totalVidas} vidas
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Média: R$ {(mrrTotal / (totalVidas || 1)).toFixed(2)} / vida / mês
          </p>
        </div>

        {/* Repasses */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Repasses Clínicos</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-900 tabular-nums">
              R$ {totalRepassesMes.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            47 sessões executadas
          </p>
        </div>

        {/* Margem Bruta Operacional */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <p className="text-xs font-medium text-slate-500">Resultado Operacional</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 tabular-nums">
              R$ {margemBrutaEstimada.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            Margem de 51%
          </p>
        </div>
      </div>

      {/* Modelos de Monetização (Seção 7 da Proposta Oficial) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-900">
          Fontes de Receita Previstas na Proposta Técnica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">1. Assinatura Mensal B2B</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              R$ 15 a R$ 40 por colaborador/mês (cobre EAP, gestão NR-01 e Academia IAS).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">2. Taxa por Vaga Preenchida</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              10% a 15% do salário de contratação ou valor fixo pelo recrutamento psicológico.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">3. Terapias Avulsas (B2C)</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sessões particulares ou pacotes adicionais além da cota corporativa contratada.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">4. Academia & Mentorias</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Venda avulsa de trilhas premium e mentorias executivas de carreira e liderança.
            </p>
          </div>
        </div>
      </div>

      {/* Contratos Corporativos Ativos */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Contratos Corporativos Ativos ({contratos.length})
            </h2>
            <p className="text-xs text-slate-500">
              Empresas atendidas pelo Instituto de Autodesenvolvimento e Saúde (IAS)
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {contratos.map((c) => (
            <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-900">{c.empresa}</p>
                <p className="text-[11px] text-slate-500">
                  CNPJ: {c.cnpj} &bull; Plano: <strong className="text-slate-700">{c.plano}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 sm:text-right">
                <div>
                  <span className="font-mono text-slate-600 block tabular-nums">
                    {c.vidasCobertas} vidas &times; R$ {c.valorPorVida}/mês
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    R$ {c.mensalidadeTotal.toLocaleString('pt-BR')} / mês
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dois Painéis: Repasses da Equipe e Simulador Comercial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Repasses (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Repasses da Equipe de Psicologia
            </h2>
            <span className="text-xs text-slate-500">Competência Atual</span>
          </div>

          <div className="divide-y divide-slate-100">
            {repasses.map((r) => (
              <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{r.psicologoNome}</p>
                  <p className="text-[11px] text-slate-500">
                    {r.totalSessoes} sessões &times; R$ {r.valorPorSessao}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 font-mono tabular-nums block">
                    R$ {r.totalRepasse.toLocaleString('pt-BR')}
                  </span>
                  <span className={`text-[10px] font-medium ${r.status === 'Pago' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulador Comercial de Vidas B2B (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Simulador de Proposta Comercial B2B
              </h2>
              <p className="text-xs text-slate-500">
                Parâmetros definidos na Seção 7 da Proposta Técnica
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-700">
                <span>Número de Colaboradores:</span>
                <strong className="font-mono tabular-nums">{simuladorVidas} vidas</strong>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={simuladorVidas}
                onChange={(e) => setSimuladorVidas(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-700">
                <span>Valor por Colaborador/mês:</span>
                <strong className="font-mono tabular-nums">R$ {simuladorValorVida},00 (Faixa: R$ 15 - R$ 40)</strong>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={simuladorValorVida}
                onChange={(e) => setSimuladorValorVida(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between pt-3">
              <div>
                <span className="text-[11px] text-slate-500 block">Mensalidade Proposta:</span>
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  R$ {(simuladorVidas * simuladorValorVida).toLocaleString('pt-BR')} / mês
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Contrato Anual (12m):</span>
                <span className="text-xs font-bold text-emerald-700 font-mono tabular-nums">
                  R$ {(simuladorVidas * simuladorValorVida * 12).toLocaleString('pt-BR')} / ano
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Novo Contrato */}
      {modalNovoContrato && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Cadastrar Contrato de Empresa Cliente
              </h3>
              <button
                onClick={() => setModalNovoContrato(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarContrato} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Razão Social / Nome:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Indústria Paulista de Alimentos Ltda"
                  value={novoContrato.empresa}
                  onChange={(e) => setNovoContrato({ ...novoContrato, empresa: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">CNPJ:</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000/0001-00"
                  value={novoContrato.cnpj}
                  onChange={(e) => setNovoContrato({ ...novoContrato, cnpj: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Plano Contratado:</label>
                <select
                  value={novoContrato.plano}
                  onChange={(e: any) => setNovoContrato({ ...novoContrato, plano: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Essencial EAP">Essencial EAP</option>
                  <option value="Integral NR-01 + EAP">Integral NR-01 + EAP</option>
                  <option value="Enterprise Completo">Enterprise Completo (com R&S e Academia)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Vidas Cobertas:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={novoContrato.vidasCobertas}
                    onChange={(e) => setNovoContrato({ ...novoContrato, vidasCobertas: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Valor/Vida (R$):</label>
                  <input
                    type="number"
                    min="15"
                    max="40"
                    required
                    value={novoContrato.valorPorVida}
                    onChange={(e) => setNovoContrato({ ...novoContrato, valorPorVida: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between text-xs">
                <span>Mensalidade Estimada:</span>
                <strong className="font-mono">
                  R$ {(novoContrato.vidasCobertas * novoContrato.valorPorVida).toLocaleString('pt-BR')} / mês
                </strong>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalNovoContrato(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition"
                >
                  Ativar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
