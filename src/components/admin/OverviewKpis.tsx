import React, { useState } from 'react';
import { AdminView } from '../../types';
import { CANONICAL_MEDICINES } from '../../data/mockData';

interface OverviewKpisProps {
  onNavigateToView?: (view: AdminView) => void;
}

export const OverviewKpis: React.FC<OverviewKpisProps> = ({ onNavigateToView }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeAnomalyModal, setActiveAnomalyModal] = useState<string | null>(null);

  const handleNavigate = (view: AdminView) => {
    if (typeof onNavigateToView === 'function') {
      onNavigateToView(view);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">hub</span>
            PLATFORM OPERATIONS / EXECUTIVE TELEMETRY & KPI HUB
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] tracking-tight">
            Marketplace Overview & Health
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Real-time telemetry, market efficiency, price dispersion, and operational queues across all 42 licensed pharmacy nodes.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-[#bfc9c6]/60 text-xs text-[#3f4947] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006b5a]"></span>
            <span>Mesh Gateway: <strong className="text-[#0b1c30]">99.98%</strong></span>
            <span className="text-[#bfc9c6]">|</span>
            <span>Redis Cache p99: <strong className="text-[#006b5a]">142ms</strong></span>
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white rounded-xl border border-[#bfc9c6]/60 text-xs font-semibold text-[#0b1c30] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006b5a]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days (Q3 2026)</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year-to-Date</option>
          </select>
        </div>
      </div>

      {/* North Star Metric Banner */}
      <div className="bg-gradient-to-br from-[#00423d] to-[#0f5b54] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-[#76f5d9]/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#76f5d9]/20 text-[#76f5d9] text-xs font-bold tracking-wide">
              <span className="material-symbols-outlined text-sm">stars</span>
              NORTH STAR KPI • MARKET EFFICIENCY INDEX
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight">
                18,420
              </h2>
              <p className="text-sm sm:text-base text-[#8ed0c7] font-medium mt-0.5">
                Weekly Orders Fulfilled at Verified Lowest Price
              </p>
            </div>
            <p className="text-xs text-white/80 max-w-xl leading-relaxed">
              84.6% of all orders placed this week automatically secured the absolute lowest market price across our licensed seller network, delivering transparent consumer savings.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#8ed0c7]">Lowest Market Price Fulfillment</span>
              <span className="text-[#76f5d9] font-mono text-sm">84.6%</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#76f5d9] h-full rounded-full transition-all duration-1000" style={{ width: '84.6%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-white/60 block text-[11px]">Week-over-Week</span>
                <span className="text-[#76f5d9] font-bold text-sm flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-base">trending_up</span>
                  +14.2% DoD
                </span>
              </div>
              <div>
                <span className="text-white/60 block text-[11px]">Audit Conformance</span>
                <span className="text-white font-bold text-sm">100% Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Supporting Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">Gross Marketplace Vol</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            $1,482,900
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eff4ff]">
            <span className="text-[#006b5a] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              +8.4%
            </span>
            <span className="text-[#6f7977]">vs prev 30 days</span>
          </div>
        </div>

        {/* Avg Savings */}
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">Avg Savings / Rx</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">savings</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            $18.45
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eff4ff]">
            <span className="text-[#006b5a] font-bold">$339,849 Total Saved</span>
            <span className="text-[#6f7977]">78.4% avg drop</span>
          </div>
        </div>

        {/* Search to Compare */}
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">Search-to-Compare</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">compare_arrows</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            72.4%
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eff4ff]">
            <span className="text-[#006b5a] font-bold">≥3 Sellers Compared</span>
            <span className="text-[#6f7977]">high engagement</span>
          </div>
        </div>

        {/* Seller SLA */}
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">Seller SLA Adherence</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">schedule</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            94.8%
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eff4ff]">
            <span className="text-[#006b5a] font-bold">&lt;24h Dispatch</span>
            <span className="text-[#6f7977]">42 active pharmacies</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Price Variation Chart & Real-time Throughput */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Price Variation by Therapeutic Class */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                Price Variation & Savings by Therapeutic Class
              </h3>
              <p className="text-xs text-[#6f7977]">
                Average generic price discount relative to originator brand-name benchmark
              </p>
            </div>
            <span className="bg-[#eff4ff] text-[#006b5a] text-xs font-bold px-2.5 py-1 rounded-lg border border-[#dce9ff]">
              Originator vs Generic
            </span>
          </div>

          {/* Therapeutic Breakdown Bars */}
          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#0b1c30]">Cardiovascular (Atorvastatin, Lisinopril, Amlodipine)</span>
                <span className="font-bold text-[#006b5a]">-68.4% avg savings</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-3 rounded-full overflow-hidden flex">
                <div className="bg-[#00423d] h-full rounded-full" style={{ width: '68.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#0b1c30]">Antibiotics & Antivirals (Amoxicillin, Cefuroxime)</span>
                <span className="font-bold text-[#006b5a]">-74.2% avg savings</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-3 rounded-full overflow-hidden flex">
                <div className="bg-[#006b5a] h-full rounded-full" style={{ width: '74.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#0b1c30]">Endocrine & Diabetes (Metformin ER, Glimepiride)</span>
                <span className="font-bold text-[#006b5a]">-81.3% avg savings</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-3 rounded-full overflow-hidden flex">
                <div className="bg-[#0f5b54] h-full rounded-full" style={{ width: '81.3%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#0b1c30]">Gastrointestinal (Omeprazole DR, Pantoprazole)</span>
                <span className="font-bold text-[#006b5a]">-62.1% avg savings</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-3 rounded-full overflow-hidden flex">
                <div className="bg-[#59dbc0] h-full rounded-full" style={{ width: '62.1%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#bfc9c6]/30 flex items-center justify-between text-xs">
            <span className="text-[#3f4947]">Maximum observed consumer savings:</span>
            <span className="font-bold text-[#006b5a]">$13.30 per 30-tab bottle (Atorvastatin 20mg)</span>
          </div>
        </div>

        {/* Right: Operations & Compliance Queues */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
              Priority Operations Queues
            </h3>
            <span className="text-xs text-[#6f7977]">Active Backlog</span>
          </div>

          <div className="space-y-3">
            {/* Queue 1: KYC */}
            <div 
              onClick={() => handleNavigate('seller-verification-and-kyc')}
              className="p-3.5 rounded-xl border border-[#bfc9c6]/50 hover:border-[#006b5a] hover:bg-[#eff4ff]/40 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">badge</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Pharmacy License & KYC Reviews</h4>
                  <p className="text-[11px] text-[#6f7977]">7 applications awaiting pharmacist inspection</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ba1a1a] text-white">
                  7 Pending
                </span>
                <span className="block text-[10px] text-[#6f7977] mt-0.5">Top: Apex Care</span>
              </div>
            </div>

            {/* Queue 2: Catalog Anomalies */}
            <div 
              onClick={() => handleNavigate('catalog-and-price-anomalies')}
              className="p-3.5 rounded-xl border border-[#bfc9c6]/50 hover:border-[#006b5a] hover:bg-[#eff4ff]/40 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">warning</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Price Deviations & NDC Flags</h4>
                  <p className="text-[11px] text-[#6f7977]">3 critical pricing outliers outside ±35% band</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#ffdad6] text-[#93000a]">
                  3 Critical
                </span>
                <span className="block text-[10px] text-[#6f7977] mt-0.5">S-104 QuickPharma</span>
              </div>
            </div>

            {/* Queue 3: Disputes */}
            <div 
              onClick={() => handleNavigate('disputes-and-support')}
              className="p-3.5 rounded-xl border border-[#bfc9c6]/50 hover:border-[#006b5a] hover:bg-[#eff4ff]/40 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] text-[#2f3a4d] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Urgent Dispute Escalations</h4>
                  <p className="text-[11px] text-[#6f7977]">2 courier delivery delay claims under review</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#eff4ff] text-[#00423d]">
                  2 Open
                </span>
                <span className="block text-[10px] text-[#6f7977] mt-0.5">USPS Handover</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Flagged Deviations Table */}
      <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#bfc9c6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                Auto-Flagged Price Deviations & Catalog Anomalies
              </h3>
              <span className="bg-[#ffdad6] text-[#93000a] text-xs font-bold px-2 py-0.5 rounded-full">
                FR-CORE-05 Active
              </span>
            </div>
            <p className="text-xs text-[#6f7977] mt-0.5">
              Automated algorithmic guardrail flagging listings deviating &gt;35% from category median
            </p>
          </div>

          <button
            onClick={() => handleNavigate('catalog-and-price-anomalies')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00423d] text-white text-xs font-semibold hover:bg-[#006b5a] transition-colors"
          >
            <span>Open Moderation Queue</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f9ff] text-[#3f4947] font-semibold border-b border-[#bfc9c6]/30">
              <tr>
                <th className="px-4 py-3">Medicine & Strength</th>
                <th className="px-4 py-3">Seller ID & License</th>
                <th className="px-4 py-3">Proposed Price</th>
                <th className="px-4 py-3">Catalog Median</th>
                <th className="px-4 py-3">Deviation</th>
                <th className="px-4 py-3">Severity & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              <tr className="hover:bg-[#f8f9ff]/80 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#0b1c30]">
                  Atorvastatin Calcium 20mg Tab (30 ct)
                  <span className="block text-[11px] text-[#6f7977] font-mono">NDC: 68180-478-06</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-[#0b1c30]">QuickPharma LLC</span>
                  <span className="block text-[11px] text-[#6f7977] font-mono">Seller #S-104 (NY-LIC-99014)</span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-[#ba1a1a]">
                  $1.20 ($0.04/pill)
                </td>
                <td className="px-4 py-3 font-mono text-[#0b1c30]">
                  $14.50 ($0.48/pill)
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ffdad6] text-[#93000a]">
                    -91.7% Below Median
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleNavigate('catalog-and-price-anomalies')}
                    className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#00423d] hover:bg-[#00423d] hover:text-white font-semibold transition-colors"
                  >
                    Inspect Unit Error
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-[#f8f9ff]/80 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#0b1c30]">
                  Amoxicillin Trihydrate 500mg (30 ct)
                  <span className="block text-[11px] text-[#6f7977] font-mono">NDC: 00781-1506-10</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-[#0b1c30]">MediSource Lab Ltd</span>
                  <span className="block text-[11px] text-[#6f7977] font-mono">Seller #S-210 (NJ-LIC-3392)</span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-[#ba1a1a]">
                  $52.90 ($1.76/cap)
                </td>
                <td className="px-4 py-3 font-mono text-[#0b1c30]">
                  $15.50 ($0.51/cap)
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ffdad6] text-[#93000a]">
                    +241.5% Surge Anomaly
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleNavigate('catalog-and-price-anomalies')}
                    className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#00423d] hover:bg-[#00423d] hover:text-white font-semibold transition-colors"
                  >
                    Cap at +35%
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-[#f8f9ff]/80 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#0b1c30]">
                  Sertraline HCl 50mg Tab (30 ct)
                  <span className="block text-[11px] text-[#6f7977] font-mono">NDC: 00093-7182-01</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-[#0b1c30]">Apex Care Pharmacy</span>
                  <span className="block text-[11px] text-[#6f7977] font-mono">Seller #S-104 (NY-LIC-8841)</span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-[#006b5a]">
                  $0.38 ($0.01/tab)
                </td>
                <td className="px-4 py-3 font-mono text-[#0b1c30]">
                  $3.80 ($0.12/tab)
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#eff4ff] text-[#00423d]">
                    -89.1% Decimal Shift
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleNavigate('catalog-and-price-anomalies')}
                    className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#00423d] hover:bg-[#00423d] hover:text-white font-semibold transition-colors"
                  >
                    Review Shift
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Generics Leaderboard */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
              Top Performing Generic Molecules (Weekly Volume)
            </h3>
            <p className="text-xs text-[#6f7977]">
              Ranked by consumer transaction volume, verified savings, and seller inventory depth
            </p>
          </div>
          <span className="text-xs font-semibold text-[#006b5a]">All 1,420 Canonical SKUs Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CANONICAL_MEDICINES.slice(0, 3).map((med, idx) => (
            <div key={med.id} className="p-4 rounded-xl border border-[#eff4ff] bg-[#f8f9ff] flex items-start gap-3">
              <img
                src={med.image}
                alt={med.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#bfc9c6]/30 bg-white"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#006b5a]">#{idx + 1} By Volume</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#76f5d9] text-[#00423d]">
                    Save {med.savingsPercentage}%
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30] truncate mt-0.5">{med.name} {med.strength}</h4>
                <p className="text-[11px] text-[#6f7977]">{med.bioequivalenceRef}</p>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-[#bfc9c6]/20">
                  <span className="font-mono font-bold text-[#00423d]">${med.lowestPrice.toFixed(2)}</span>
                  <span className="text-[10px] text-[#6f7977]">{med.listingsCount} Verified Sellers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
