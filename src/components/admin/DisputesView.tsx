import React, { useState } from 'react';

export const DisputesView: React.FC = () => {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const disputes = [
    {
      id: 'DSP-8841',
      orderId: 'GM-88390',
      patient: 'Marcus Sterling',
      pharmacy: 'Apex Care Pharmacy',
      type: 'Courier Temperature Breach Claim',
      status: 'Escalated to Ops',
      details: 'Patient noted cold-pack was room temperature upon delivery. Insulin IoT sensor flagged 14°C excursion.',
      amount: '$45.20',
      time: '1 hour ago'
    },
    {
      id: 'DSP-8832',
      orderId: 'GM-88210',
      patient: 'Sophia Miller',
      pharmacy: 'QuickPharma LLC',
      type: 'Delayed Dispatch SLA Breach',
      status: 'Under Investigation',
      details: 'Order delayed by 48 hours without tracking number issuance. Consumer requested replacement.',
      amount: '$18.90',
      time: '4 hours ago'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">gavel</span>
            PLATFORM OPERATIONS / DISPUTES & ESCALATIONS / FR-OPS-09
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            Dispute Resolution & Courier Claims
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Arbitration for cold-chain excursions, SLA fulfillment violations, and consumer escrow releases.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => {
          const isResolved = resolvedIds.includes(d.id);

          return (
            <div key={d.id} className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#006b5a]">#{d.id}</span>
                    <span className="text-xs font-bold text-[#0b1c30]">{d.type}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a]">
                      {isResolved ? 'Resolved' : d.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6f7977] mt-0.5">
                    Order #{d.orderId} • Patient: {d.patient} • Pharmacy: {d.pharmacy}
                  </p>
                </div>
                <span className="font-mono font-bold text-sm text-[#0b1c30]">{d.amount}</span>
              </div>

              <p className="text-xs text-[#3f4947] bg-[#f8f9ff] p-3 rounded-xl border border-[#bfc9c6]/30">
                {d.details}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff]">
                <span className="text-[11px] text-[#6f7977]">{d.time}</span>
                {!isResolved && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setResolvedIds([...resolvedIds, d.id])}
                      className="px-3 py-1.5 rounded-lg bg-[#00423d] text-white text-xs font-semibold hover:bg-[#006b5a]"
                    >
                      Issue Full Refund & Reorder
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
