import React, { useState, useEffect } from 'react';
import { PortalMode, AdminView, VendorView } from '../../types';
import { CANONICAL_MEDICINES, SELLER_APPLICANTS_LIST, PHARMACY_ORDERS } from '../../data/mockData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (portal: PortalMode, view?: AdminView | VendorView) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMeds = CANONICAL_MEDICINES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.bioequivalenceRef.toLowerCase().includes(query.toLowerCase()) ||
    m.ndc.includes(query)
  );

  const filteredSellers = SELLER_APPLICANTS_LIST.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.licenseNumber.toLowerCase().includes(query.toLowerCase())
  );

  const filteredOrders = PHARMACY_ORDERS.filter(o =>
    o.id.toLowerCase().includes(query.toLowerCase()) ||
    o.customerName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#bfc9c6]/50 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#bfc9c6]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006b5a] text-xl">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search screens, medicines, sellers, orders..."
            className="flex-1 text-sm font-medium text-[#0b1c30] placeholder-[#6f7977] focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#eff4ff] text-[#006b5a] rounded border border-[#dce9ff]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
          {/* Quick Nav Screens */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6f7977] px-2 block mb-1">
              Quick Navigation
            </span>
            <div className="space-y-1">
              <button
                onClick={() => { onNavigate('super-admin', 'overview-and-kpis'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">dashboard</span>
                  <span className="font-semibold">Platform Overview & KPIs</span>
                </div>
                <span className="text-[10px] text-[#6f7977]">Super Admin</span>
              </button>

              <button
                onClick={() => { onNavigate('super-admin', 'seller-verification-and-kyc'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">verified_user</span>
                  <span className="font-semibold">Seller Verification & KYC (Apex Care)</span>
                </div>
                <span className="text-[10px] text-[#ba1a1a] font-bold">7 Pending</span>
              </button>

              <button
                onClick={() => { onNavigate('super-admin', 'catalog-and-price-anomalies'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">tune</span>
                  <span className="font-semibold">Catalog Moderation & Price Guardrails</span>
                </div>
                <span className="text-[10px] text-[#93000a] font-bold">3 Anomalies</span>
              </button>

              <button
                onClick={() => { onNavigate('vendor', 'order-fulfillment-and-rx'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">local_pharmacy</span>
                  <span className="font-semibold">Pharmacy Fulfillment & Rx Workbench</span>
                </div>
                <span className="text-[10px] text-[#006b5a] font-bold">NY-104</span>
              </button>

              <button
                onClick={() => { onNavigate('vendor', 'inventory-and-bulk-upload'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">upload_file</span>
                  <span className="font-semibold">Bulk Catalog Import & NDC Sync</span>
                </div>
                <span className="text-[10px] text-[#6f7977]">2,850 SKUs</span>
              </button>

              <button
                onClick={() => { onNavigate('customer'); onClose(); }}
                className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5a]">shopping_cart</span>
                  <span className="font-semibold">Customer Marketplace & Price Comparison</span>
                </div>
                <span className="text-[10px] text-[#006b5a] font-bold">Consumer</span>
              </button>
            </div>
          </div>

          {/* Medicines matching search */}
          {filteredMeds.length > 0 && (
            <div className="pt-2 border-t border-[#eff4ff]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6f7977] px-2 block mb-1">
                Medicines & Formulations
              </span>
              <div className="space-y-1">
                {filteredMeds.map((med) => (
                  <button
                    key={med.id}
                    onClick={() => { onNavigate('customer'); onClose(); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
                  >
                    <div>
                      <p className="font-bold">{med.name} {med.strength}</p>
                      <p className="text-[10px] text-[#6f7977]">{med.bioequivalenceRef} • NDC: {med.ndc}</p>
                    </div>
                    <span className="font-mono font-bold text-[#00423d]">${med.lowestPrice.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sellers */}
          {filteredSellers.length > 0 && (
            <div className="pt-2 border-t border-[#eff4ff]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6f7977] px-2 block mb-1">
                Pharmacy Sellers & Applicants
              </span>
              <div className="space-y-1">
                {filteredSellers.map((seller) => (
                  <button
                    key={seller.id}
                    onClick={() => { onNavigate('super-admin', 'seller-verification-and-kyc'); onClose(); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
                  >
                    <div>
                      <p className="font-bold">{seller.name}</p>
                      <p className="text-[10px] text-[#6f7977]">License: {seller.licenseNumber} • {seller.stateCode}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#006b5a]">Trust {seller.trustIndex}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
