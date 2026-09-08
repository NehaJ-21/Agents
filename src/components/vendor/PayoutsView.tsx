import React from 'react';

export const PayoutsView: React.FC = () => {
  const settlements = [
    { id: 'SET-9921', date: 'Sep 05, 2026', ordersCount: 42, grossAmount: '$2,840.10', platformFee: '$142.00', netPayout: '$2,698.10', status: 'Deposited (ACH Chase ••9912)' },
    { id: 'SET-9892', date: 'Aug 29, 2026', ordersCount: 51, grossAmount: '$3,410.50', platformFee: '$170.52', netPayout: '$3,239.98', status: 'Deposited (ACH Chase ••9912)' },
    { id: 'SET-9840', date: 'Aug 22, 2026', ordersCount: 38, grossAmount: '$2,210.00', platformFee: '$110.50', netPayout: '$2,099.50', status: 'Deposited (ACH Chase ••9912)' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">payments</span>
            APEX CARE PHARMACY / ESCROW & REVENUE SETTLEMENTS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            Pharmacy Payouts & Escrow Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Automated weekly ACH transfers upon order dispatch and courier confirmation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">Available for Next Settlement</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#00423d]">$14,840.50</div>
          <span className="text-xs text-[#006b5a]">Scheduled for Friday, Sep 12</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">In Escrow (Awaiting Delivery)</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">$3,120.40</div>
          <span className="text-xs text-[#6f7977]">18 packages in transit</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">YTD Net Disbursed</span>
          <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">$184,920.00</div>
          <span className="text-xs text-[#006b5a]">Verified 1099-K compliant</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8f9ff] text-[#3f4947] border-b border-[#bfc9c6]/30 font-semibold">
            <tr>
              <th className="px-4 py-3">Settlement Batch</th>
              <th className="px-4 py-3">Settlement Date</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Gross Sales</th>
              <th className="px-4 py-3">Platform Fee (5%)</th>
              <th className="px-4 py-3">Net Payout</th>
              <th className="px-4 py-3">Transfer Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff4ff]">
            {settlements.map((s) => (
              <tr key={s.id} className="hover:bg-[#f8f9ff]">
                <td className="px-4 py-3 font-mono font-bold text-[#006b5a]">{s.id}</td>
                <td className="px-4 py-3 text-[#0b1c30]">{s.date}</td>
                <td className="px-4 py-3 font-semibold text-[#0b1c30]">{s.ordersCount} orders</td>
                <td className="px-4 py-3 font-mono text-[#0b1c30]">{s.grossAmount}</td>
                <td className="px-4 py-3 font-mono text-[#6f7977]">{s.platformFee}</td>
                <td className="px-4 py-3 font-mono font-bold text-[#00423d]">{s.netPayout}</td>
                <td className="px-4 py-3 text-[#006b5a] font-medium">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
