import React, { useState } from 'react';
import { CANONICAL_MEDICINES } from '../../data/mockData';
import { CanonicalMedicine } from '../../types';

export const CatalogModeration: React.FC = () => {
  const [selectedMedId, setSelectedMedId] = useState<string>('MED-ATOR-20');
  const [filterType, setFilterType] = useState<'all' | 'negative' | 'positive' | 'formulation'>('all');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [quarantinedSellers, setQuarantinedSellers] = useState<string[]>([]);
  const [adjustedPrices, setAdjustedPrices] = useState<Record<string, number>>({});

  const selectedMed: CanonicalMedicine = CANONICAL_MEDICINES.find(m => m.id === selectedMedId) || CANONICAL_MEDICINES[0];

  const handleUnitAdjust = (sellerId: string) => {
    setAdjustedPrices({ ...adjustedPrices, [sellerId]: 12.00 });
    setActionNotice(`Successfully normalized unit-of-measure for ${sellerId}. Price adjusted from $1.20 to $12.00 / 30-tab bottle.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleQuarantine = (sellerId: string) => {
    setQuarantinedSellers([...quarantinedSellers, sellerId]);
    setActionNotice(`Listing for ${sellerId} quarantined under FR-CORE-05. Hidden from consumer marketplace.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleApproveOverride = (sellerId: string) => {
    setActionNotice(`Admin override granted for ${sellerId}. Verified clearance discount published.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">tune</span>
            PLATFORM OPERATIONS / CATALOG MODERATION & CANONICAL MEDICINE MAPPING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] tracking-tight">
            Catalog Moderation & Price Guardrails
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Algorithmic price anomaly detection (FR-CORE-05), dosage standardization, and canonical drug grouping engine (FR-CAT-04).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-[#eff4ff] text-[#00423d] border border-[#dce9ff] rounded-xl text-xs font-semibold font-mono">
            FR-CORE-05 GUARD: ACTIVE
          </span>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#76f5d9] text-[#00423d] text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b5a]">check_circle</span>
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-xs font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Flagged In Review</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#ba1a1a] flex items-center justify-between">
            <span>3 Critical</span>
            <span className="material-symbols-outlined text-xl text-[#ba1a1a]">warning</span>
          </div>
          <span className="text-xs text-[#6f7977]">Needs Pharmacist Audit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Total Canonical SKUs</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] flex items-center justify-between">
            <span>1,420</span>
            <span className="material-symbols-outlined text-xl text-[#006b5a]">medication</span>
          </div>
          <span className="text-xs text-[#006b5a] font-semibold">99.4% RxNorm Mapped</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Active Seller Listings</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] flex items-center justify-between">
            <span>14,892</span>
            <span className="material-symbols-outlined text-xl text-[#00423d]">storefront</span>
          </div>
          <span className="text-xs text-[#6f7977]">Across 42 Verified Pharmacies</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Dynamic Median Guardrail</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006b5a] flex items-center justify-between">
            <span>±35%</span>
            <span className="material-symbols-outlined text-xl text-[#006b5a]">shield</span>
          </div>
          <span className="text-xs text-[#6f7977]">Automatic Quarantine Trigger</span>
        </div>
      </div>

      {/* Critical Severity Alert Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#ffdad6]/60 via-white to-white border-2 border-[#ffdad6] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">priority_high</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#93000a] uppercase tracking-wider">
                  Critical Severity Anomaly • Action Required
                </span>
                <span className="px-2 py-0.2 rounded bg-[#ba1a1a] text-white text-[10px] font-bold">
                  FR-CORE-05 TRIGGERED
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] mt-0.5">
                QuickPharma LLC (#S-104) — Atorvastatin Calcium 20mg Tab (30 ct)
              </h3>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-1 rounded-lg self-start sm:self-center">
            -91.7% Deviation from Median
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#ffdad6]/60 text-xs">
          <div>
            <span className="text-[#6f7977] block text-[11px]">Proposed Listing Price:</span>
            <span className="text-base font-mono font-bold text-[#ba1a1a]">
              ${adjustedPrices['S-104'] ? adjustedPrices['S-104'].toFixed(2) : '1.20'} ($0.04/pill)
            </span>
          </div>
          <div>
            <span className="text-[#6f7977] block text-[11px]">Category 30-Day Median:</span>
            <span className="text-base font-mono font-bold text-[#0b1c30]">$14.50 ($0.48/pill)</span>
          </div>
          <div>
            <span className="text-[#6f7977] block text-[11px]">Algorithmic Diagnostic:</span>
            <span className="font-semibold text-[#0b1c30]">Suspected Unit Mismatch (Per-pill price entered instead of 30-tab pack)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 flex-wrap">
          <button
            onClick={() => handleUnitAdjust('S-104')}
            className="px-4 py-2 rounded-xl bg-[#00423d] text-white text-xs font-bold hover:bg-[#006b5a] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">auto_fix_high</span>
            <span>Unit Adjust ($0.04/pill → $12.00 bottle)</span>
          </button>
          <button
            onClick={() => handleQuarantine('S-104')}
            disabled={quarantinedSellers.includes('S-104')}
            className="px-4 py-2 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-bold transition-all disabled:opacity-50"
          >
            {quarantinedSellers.includes('S-104') ? 'Quarantined' : 'Reject & Quarantine Listing'}
          </button>
          <button
            onClick={() => handleApproveOverride('S-104')}
            className="px-4 py-2 rounded-xl border border-[#bfc9c6] bg-white text-[#3f4947] hover:bg-[#eff4ff] text-xs font-semibold transition-all"
          >
            Approve Clearance Override
          </button>
        </div>
      </div>

      {/* Split View: Left Queue Table, Right Canonical SKU Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Moderation & Pricing Inspection Queue */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                Pricing & Catalog Anomaly Inspection Queue
              </h3>
              <p className="text-xs text-[#6f7977]">
                Live feed of listings outside standard deviation thresholds
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterType === 'all' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
              >
                All (3)
              </button>
              <button
                onClick={() => setFilterType('negative')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterType === 'negative' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
              >
                Drops
              </button>
              <button
                onClick={() => setFilterType('positive')}
                className={`px-2.5 py-1 rounded-lg transition-all ${filterType === 'positive' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
              >
                Surges
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div 
              onClick={() => setSelectedMedId('MED-ATOR-20')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedMedId === 'MED-ATOR-20'
                  ? 'border-[#00423d] bg-[#eff4ff]/30 ring-1 ring-[#00423d]'
                  : 'border-[#bfc9c6]/40 hover:border-[#006b5a]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b1c30]">Atorvastatin Calcium 20mg Tab (30 ct)</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                      -91.7% Low
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6f7977] font-mono mt-0.5">QuickPharma LLC (#S-104) • NY-LIC-99014</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#ba1a1a]">$1.20</span>
              </div>
              <p className="text-xs text-[#3f4947] mt-2">
                Diagnostic: Packaging mismatch. Entered $0.04/tab as total 30-tab wholesale lot.
              </p>
            </div>

            {/* Item 2 */}
            <div 
              onClick={() => setSelectedMedId('MED-AMOX-500')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedMedId === 'MED-AMOX-500'
                  ? 'border-[#00423d] bg-[#eff4ff]/30 ring-1 ring-[#00423d]'
                  : 'border-[#bfc9c6]/40 hover:border-[#006b5a]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b1c30]">Amoxicillin Trihydrate 500mg (30 ct)</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                      +241.5% Surge
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6f7977] font-mono mt-0.5">MediSource Lab Ltd (#S-210) • NJ-LIC-3392</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#ba1a1a]">$52.90</span>
              </div>
              <p className="text-xs text-[#3f4947] mt-2">
                Diagnostic: Price surge exceeds +35% dynamic median threshold. Flagged for price gouging prevention.
              </p>
            </div>

            {/* Item 3 */}
            <div 
              onClick={() => setSelectedMedId('MED-METF-500')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedMedId === 'MED-METF-500'
                  ? 'border-[#00423d] bg-[#eff4ff]/30 ring-1 ring-[#00423d]'
                  : 'border-[#bfc9c6]/40 hover:border-[#006b5a]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b1c30]">Metformin HCl ER 500mg (60 ct)</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold">
                      -28.5% Optimal
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6f7977] font-mono mt-0.5">Apex Care Pharmacy (#S-104-APEX)</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#006b5a]">$3.40</span>
              </div>
              <p className="text-xs text-[#3f4947] mt-2">
                Diagnostic: Verified lowest price within safety tolerance. Clear to serve as lead offer.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Canonical SKU Inspector */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm p-5 space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] block">
              Canonical SKU Inspector
            </span>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                {selectedMed.name} {selectedMed.strength}
              </h3>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#00423d] text-[11px] font-bold">
                {selectedMed.orangeBookRating.split(' ')[0]}
              </span>
            </div>
            <p className="text-xs text-[#6f7977]">
              NDC: <strong className="font-mono text-[#0b1c30]">{selectedMed.ndc}</strong> • {selectedMed.bioequivalenceRef}
            </p>
          </div>

          {/* 30-Day Category Median Band Visualization */}
          <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#bfc9c6]/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0b1c30]">30-Day Category Median Band</span>
              <span className="font-mono font-bold text-[#006b5a]">${selectedMed.brandMedianPrice.toFixed(2)} Median</span>
            </div>

            {/* Visual Band */}
            <div className="relative pt-6 pb-2">
              <div className="w-full h-3 bg-[#eff4ff] rounded-full relative">
                {/* Permitted ±35% band */}
                <div
                  className="absolute top-0 bottom-0 bg-[#76f5d9]/60 rounded-full"
                  style={{ left: '25%', width: '50%' }}
                  title="±35% Permitted Guardrail"
                ></div>
                {/* Category Median tick */}
                <div
                  className="absolute -top-1 bottom-0 w-1 bg-[#00423d] rounded"
                  style={{ left: '50%' }}
                  title="Category Median"
                ></div>
                {/* Anomaly Outlier Dot */}
                <div
                  className="absolute -top-1.5 w-4 h-4 bg-[#ba1a1a] rounded-full border-2 border-white shadow-md animate-pulse"
                  style={{ left: '5%' }}
                  title="QuickPharma $1.20 Anomaly"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-[#6f7977] mt-2 font-mono">
                <span>$1.20 (Flagged)</span>
                <span>$9.42 (-35%)</span>
                <span className="font-bold text-[#00423d]">$14.50 (Median)</span>
                <span>$19.58 (+35%)</span>
              </div>
            </div>
          </div>

          {/* Competing Seller Listings Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30]">
              <span>Competing Seller Offers ({selectedMed.competingOffers.length})</span>
              <span className="text-[11px] text-[#6f7977]">Ranked by Verified Price</span>
            </div>

            <div className="divide-y divide-[#eff4ff] text-xs">
              {selectedMed.competingOffers.map((offer) => {
                const isQuarantined = quarantinedSellers.includes(offer.sellerId);
                const displayPrice = adjustedPrices[offer.sellerId] || offer.price;

                return (
                  <div key={offer.sellerId} className="py-2.5 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0b1c30]">#{offer.rank} {offer.sellerName}</span>
                        {offer.isLowest && (
                          <span className="px-1.5 py-0.2 rounded bg-[#76f5d9] text-[#00423d] text-[10px] font-bold">
                            Lowest
                          </span>
                        )}
                        {isQuarantined && (
                          <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                            Quarantined
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6f7977]">{offer.deliverySpeed}</p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-[#00423d]">
                        ${displayPrice.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-[#6f7977]">
                        ${(displayPrice / 30).toFixed(2)}/pill
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
