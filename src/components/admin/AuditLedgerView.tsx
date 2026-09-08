import React from 'react';

export const AuditLedgerView: React.FC = () => {
  const auditLogs = [
    {
      id: 'LOG-99201',
      action: 'PHARMACIST_OVERRIDE_APPROVED',
      actor: 'Chief Medical Officer (cmo@genericmed.io)',
      target: 'QuickPharma LLC (#S-104)',
      digest: 'sha256:4f90...810a',
      time: '12 minutes ago',
      level: 'INFO'
    },
    {
      id: 'LOG-99198',
      action: 'PRICE_GUARDRAIL_QUARANTINE_TRIGGERED',
      actor: 'System Daemon (FR-CORE-05 Algorithmic Check)',
      target: 'Atorvastatin 20mg Tab (NDC 68180-478-06)',
      digest: 'sha256:1a82...389c',
      time: '34 minutes ago',
      level: 'WARNING'
    },
    {
      id: 'LOG-99192',
      action: 'KYC_LICENSE_VERIFIED_AUTOMATED',
      actor: 'State Board OCR Validator v4.1',
      target: 'Apex Care Pharmacy (License NY-PHA-88410)',
      digest: 'sha256:9c01...d831',
      time: '2 hours ago',
      level: 'SUCCESS'
    },
    {
      id: 'LOG-99180',
      action: 'DEA_REGISTRY_CROSS_REFERENCE',
      actor: 'DEA CSOS Synchronizer',
      target: 'Schedule II-IV Formulary Auditing',
      digest: 'sha256:0b38...481e',
      time: '6 hours ago',
      level: 'INFO'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">security</span>
            SECURITY & COMPLIANCE / TAMPER-PROOF AUDIT LEDGER
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            Cryptographic Audit Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Immutable log of state pharmacy board inspections, DEA license inquiries, and pricing overrides.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8f9ff] text-[#3f4947] border-b border-[#bfc9c6]/30 font-semibold">
            <tr>
              <th className="px-4 py-3">Log ID</th>
              <th className="px-4 py-3">Event Action</th>
              <th className="px-4 py-3">Actor / Entity</th>
              <th className="px-4 py-3">Target Scope</th>
              <th className="px-4 py-3">Audit Digest</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff4ff]">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[#f8f9ff]">
                <td className="px-4 py-3 font-mono font-bold text-[#006b5a]">{log.id}</td>
                <td className="px-4 py-3 font-semibold text-[#0b1c30]">{log.action}</td>
                <td className="px-4 py-3 text-[#3f4947]">{log.actor}</td>
                <td className="px-4 py-3 text-[#3f4947]">{log.target}</td>
                <td className="px-4 py-3 font-mono text-[#6f7977]">{log.digest}</td>
                <td className="px-4 py-3 text-[#6f7977]">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
