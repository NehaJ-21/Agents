import React, { useState } from 'react';
import { CATALOG_ANOMALY_ROWS } from '../../data/mockData';
import { CatalogAnomalyRow } from '../../types';

export const BulkCatalogImport: React.FC = () => {
  const [rows, setRows] = useState<CatalogAnomalyRow[]>(CATALOG_ANOMALY_ROWS);
  const [autoMapNdc, setAutoMapNdc] = useState(true);
  const [strictPriceGuardrail, setStrictPriceGuardrail] = useState(true);
  const [overwriteQuantities, setOverwriteQuantities] = useState(false);
  const [batchNotice, setBatchNotice] = useState<string | null>(null);
  const [committed, setCommitted] = useState(false);

  const handleCommitBatch = () => {
    setCommitted(true);
    setBatchNotice('Batch biogen_generic_manifest_q4_2026.csv committed! 2,826 SKUs published to live regional marketplace. 24 flagged anomalies isolated in quarantine.');
    setTimeout(() => setBatchNotice(null), 7000);
  };

  const handleFixRow = (rowNumber: number) => {
    setRows(rows.map(r => r.rowNumber === rowNumber ? { ...r, status: 'Valid & Mapped', statusSeverity: 'success', diagnostic: 'Manual pharmacist correction verified. Ingestion validated.' } : r));
    setBatchNotice(`Row #${rowNumber} corrected and verified.`);
    setTimeout(() => setBatchNotice(null), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">cloud_upload</span>
            BULK INGESTION ENGINE / NDC NORMALIZATION / FR-CAT-01
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] tracking-tight">
            Manufacturer Bulk Catalog Import & NDC Sync
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Ingest large-scale inventory CSV/TSV manifests, normalize against FDA NDC & RxNorm canonical schemas, and flag pricing anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-[#eff4ff] text-[#00423d] border border-[#dce9ff] rounded-xl text-xs font-semibold font-mono">
            SPL / RXNORM ENGINE: ONLINE
          </span>
        </div>
      </div>

      {/* Batch Notification Toast */}
      {batchNotice && (
        <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#76f5d9] text-[#00423d] text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b5a]">verified</span>
            <span>{batchNotice}</span>
          </div>
          <button onClick={() => setBatchNotice(null)} className="text-xs font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Last Batch Ingestion</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            1,420 / 1,450
          </div>
          <span className="text-xs text-[#006b5a] font-semibold">97.9% Automated Resolution</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Catalog Footprint</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            8,419 SKUs
          </div>
          <span className="text-xs text-[#6f7977]">Apex Care Active Formulary</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Staged / Flagged Rows</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#ba1a1a]">
            24 Pending
          </div>
          <span className="text-xs text-[#93000a]">3 Price Anomalies • 21 NDC Flags</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Canonical Match Rate</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006b5a]">
            99.2%
          </div>
          <span className="text-xs text-[#6f7977]">FDA SPL & RxNorm Verified</span>
        </div>
      </div>

      {/* File Staging Zone */}
      <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#bfc9c6] shadow-sm text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#eff4ff] text-[#006b5a] flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">upload_file</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0b1c30]">
            Upload or Drop Drug Catalog Manifest
          </h3>
          <p className="text-xs text-[#6f7977] mt-0.5">
            Supported formats: CSV, TSV, XLSX with standard National Drug Code (NDC) & package quantity columns.
          </p>
        </div>

        {/* Active Staged File Card */}
        <div className="max-w-xl mx-auto p-3.5 bg-[#f8f9ff] rounded-xl border border-[#bfc9c6]/50 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00423d] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0b1c30] font-mono">
                biogen_generic_manifest_q4_2026.csv
              </p>
              <p className="text-[11px] text-[#6f7977]">
                14.2 MB • 2,850 SKUs • Uploaded 12m ago by Inventory Mgr
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#eff4ff] text-[#006b5a]">
            Staged Ready
          </span>
        </div>
      </div>

      {/* Validation Rules & Pipeline State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ingestion Rules */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
            Validation & Ingestion Guardrails
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoMapNdc}
                  onChange={(e) => setAutoMapNdc(e.target.checked)}
                  className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                />
                <div>
                  <p className="font-semibold text-[#0b1c30]">Auto-Map NDC to RxNorm CUIs</p>
                  <p className="text-[11px] text-[#6f7977]">Automatically link 10 & 11-digit NDCs to standardized clinical formulations.</p>
                </div>
              </div>
              <span className="font-bold text-[#006b5a]">ON</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={strictPriceGuardrail}
                  onChange={(e) => setStrictPriceGuardrail(e.target.checked)}
                  className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                />
                <div>
                  <p className="font-semibold text-[#0b1c30]">Strict Price Anomaly Guardrail (FR-CORE-05)</p>
                  <p className="text-[11px] text-[#6f7977]">Quarantine rows deviating &gt;35% from regional 30-day category median.</p>
                </div>
              </div>
              <span className="font-bold text-[#006b5a]">±35%</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={overwriteQuantities}
                  onChange={(e) => setOverwriteQuantities(e.target.checked)}
                  className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                />
                <div>
                  <p className="font-semibold text-[#0b1c30]">Overwrite Live Inventory Quantities</p>
                  <p className="text-[11px] text-[#6f7977]">Update existing stock counts directly without zeroing pending orders.</p>
                </div>
              </div>
              <span className="text-[#6f7977]">{overwriteQuantities ? 'YES' : 'NO'}</span>
            </label>
          </div>
        </div>

        {/* Pipeline State Steps */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
            Pipeline Ingestion Progress
          </h3>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#006b5a] text-white flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#0b1c30]">Step 1: Manifest Upload</p>
                <p className="text-[11px] text-[#6f7977]">2,850 records parsed cleanly from CSV</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#006b5a] text-white flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#0b1c30]">Step 2: Schema Mapping & Header Parsing</p>
                <p className="text-[11px] text-[#6f7977]">100% columns matched to canonical database fields</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-xs animate-pulse">
                3
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#0b1c30]">Step 3: Validation & Anomaly Detection</p>
                <p className="text-[11px] text-[#ba1a1a] font-semibold">2,826 passed • 24 quarantined in review ledger</p>
              </div>
            </div>

            <div className="flex items-center gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-[#bfc9c6] text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#0b1c30]">Step 4: Catalog Publishing</p>
                <p className="text-[11px] text-[#6f7977]">Awaiting pharmacist commit action below</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row-Level Ingestion Ledger */}
      <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#bfc9c6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
              Row-Level Ingestion & Anomaly Ledger
            </h3>
            <p className="text-xs text-[#6f7977]">
              Inspect, override, or edit quarantined records prior to live catalog synchronization
            </p>
          </div>
          <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-1 rounded-lg">
            24 Quarantined
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f9ff] text-[#3f4947] font-semibold border-b border-[#bfc9c6]/30">
              <tr>
                <th className="px-4 py-3">Row #</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">NDC Code</th>
                <th className="px-4 py-3">Medicine & Dosage</th>
                <th className="px-4 py-3">Proposed Price</th>
                <th className="px-4 py-3">Median Price</th>
                <th className="px-4 py-3">Diagnostic & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {rows.map((row) => (
                <tr key={row.rowNumber} className="hover:bg-[#f8f9ff]/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#0b1c30]">
                    #{row.rowNumber}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        row.statusSeverity === 'error'
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : row.statusSeverity === 'warning'
                          ? 'bg-[#fff8e1] text-[#e65100]'
                          : row.statusSeverity === 'info'
                          ? 'bg-[#eff4ff] text-[#00423d]'
                          : 'bg-[#76f5d9] text-[#00423d]'
                      }`}
                    >
                      {row.status} {row.statusPercent ? `(${row.statusPercent})` : ''}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[#0b1c30]">
                    {row.ndc}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0b1c30]">
                    {row.medicine}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-[#00423d]">
                    ${row.wholesalePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-mono text-[#6f7977]">
                    ${row.medianPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] text-[#3f4947] max-w-xs truncate" title={row.diagnostic}>
                        {row.diagnostic}
                      </span>
                      {row.statusSeverity !== 'success' && (
                        <button
                          onClick={() => handleFixRow(row.rowNumber)}
                          className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#00423d] hover:bg-[#00423d] hover:text-white font-semibold transition-colors whitespace-nowrap"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Commit Bottom Action Banner */}
      <div className="p-5 bg-gradient-to-r from-[#00423d] to-[#0f5b54] rounded-2xl text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#76f5d9]">publish</span>
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans']">
              Commit & Publish 2,826 Validated SKUs
            </h3>
          </div>
          <p className="text-xs text-[#8ed0c7] mt-0.5">
            24 flagged rows will remain quarantined in safe staging until pharmacist resolution.
          </p>
          <span className="text-[10px] text-white/50 font-mono block mt-1">
            Audit Digest SHA-256: 9f8a201b4c9e8841fd2a01b0928f01c89284ba102948cba12
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setBatchNotice('Anomaly report downloaded to biogen_manifest_anomalies_2026.csv');
              setTimeout(() => setBatchNotice(null), 4000);
            }}
            className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Download CSV Report
          </button>
          <button
            onClick={handleCommitBatch}
            disabled={committed}
            className="px-5 py-2.5 rounded-xl bg-[#76f5d9] text-[#00423d] hover:bg-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            <span>{committed ? 'Batch Published Live' : 'Commit & Publish Batch'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
