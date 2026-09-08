import React, { useState } from 'react';
import { CANONICAL_MEDICINES } from '../../data/mockData';

export const StockPricingView: React.FC = () => {
  const [stockItems, setStockItems] = useState(
    CANONICAL_MEDICINES.map((m, i) => ({
      id: m.id,
      name: m.name,
      strength: m.strength,
      ndc: m.ndc,
      price: m.lowestPrice * 1.05,
      quantity: 140 + i * 50,
      status: 'In Stock'
    }))
  );

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setStockItems(stockItems.map(item => item.id === id ? { ...item, price: newPrice } : item));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            APEX CARE PHARMACY / INVENTORY & REAL-TIME PRICING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            Stock & Live Pricing Management
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Real-time stock level updates, wholesale cost thresholds, and live marketplace buy-box positioning.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8f9ff] text-[#3f4947] border-b border-[#bfc9c6]/30 font-semibold">
            <tr>
              <th className="px-4 py-3">Medication</th>
              <th className="px-4 py-3">NDC Code</th>
              <th className="px-4 py-3">In Stock (Units)</th>
              <th className="px-4 py-3">Your Listing Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff4ff]">
            {stockItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#f8f9ff]">
                <td className="px-4 py-3 font-bold text-[#0b1c30]">{item.name} {item.strength}</td>
                <td className="px-4 py-3 font-mono text-[#6f7977]">{item.ndc}</td>
                <td className="px-4 py-3 font-mono font-semibold text-[#0b1c30]">{item.quantity} bottles</td>
                <td className="px-4 py-3 font-mono font-bold text-[#00423d]">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#76f5d9] text-[#00423d] text-[10px] font-bold">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleUpdatePrice(item.id, Number((item.price * 0.95).toFixed(2)))}
                    className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#00423d] hover:bg-[#00423d] hover:text-white font-semibold transition-colors"
                  >
                    Match Lowest (-5%)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
