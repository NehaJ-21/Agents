import React from 'react';
import { PortalMode, AdminView, VendorView } from '../../types';

interface SidebarProps {
  currentPortal: PortalMode;
  adminView?: AdminView;
  activeAdminView?: AdminView;
  onSelectAdminView?: (view: AdminView) => void;
  onAdminViewChange?: (view: AdminView) => void;
  vendorView?: VendorView;
  activeVendorView?: VendorView;
  onSelectVendorView?: (view: VendorView) => void;
  onVendorViewChange?: (view: VendorView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPortal,
  adminView: propAdminView,
  activeAdminView,
  onSelectAdminView,
  onAdminViewChange,
  vendorView: propVendorView,
  activeVendorView,
  onSelectVendorView,
  onVendorViewChange,
}) => {
  const adminView = propAdminView || activeAdminView || 'overview-and-kpis';
  const vendorView = propVendorView || activeVendorView || 'order-fulfillment-and-rx';

  const handleAdminSelect = (view: AdminView) => {
    if (typeof onSelectAdminView === 'function') {
      onSelectAdminView(view);
    } else if (typeof onAdminViewChange === 'function') {
      onAdminViewChange(view);
    }
  };

  const handleVendorSelect = (view: VendorView) => {
    if (typeof onSelectVendorView === 'function') {
      onSelectVendorView(view);
    } else if (typeof onVendorViewChange === 'function') {
      onVendorViewChange(view);
    }
  };
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-[#bfc9c6]/40 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-85px)] shadow-[1px_0_2px_rgba(0,0,0,0.02)]">
      <div className="p-4 space-y-6">
        {/* Portal-Specific Sections */}
        {currentPortal === 'super-admin' && (
          <>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] px-3 mb-2">
                Platform Operations
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => handleAdminSelect('overview-and-kpis')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'overview-and-kpis'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg">dashboard</span>
                    <span>Overview & KPIs</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    adminView === 'overview-and-kpis' ? 'bg-[#0f5b54] text-[#76f5d9]' : 'bg-[#eff4ff] text-[#006b5a]'
                  }`}>
                    Live
                  </span>
                </button>

                <button
                  onClick={() => handleAdminSelect('seller-verification-and-kyc')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'seller-verification-and-kyc'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                    <span>Seller Verification & KYC</span>
                  </div>
                  <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    7
                  </span>
                </button>

                <button
                  onClick={() => handleAdminSelect('catalog-and-price-anomalies')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'catalog-and-price-anomalies'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg">rule</span>
                    <span>Catalog & Price Anomalies</span>
                  </div>
                  <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    3 Flagged
                  </span>
                </button>

                <button
                  onClick={() => handleAdminSelect('disputes-and-support')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'disputes-and-support'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg">gavel</span>
                    <span>Disputes & Escalations</span>
                  </div>
                  <span className="text-[#6f7977] text-[10px]">2</span>
                </button>
              </nav>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] px-3 mb-2">
                System & Governance
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => handleAdminSelect('audit-trail')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'audit-trail'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">history_edu</span>
                  <span>Compliance Audit Ledger</span>
                </button>

                <button
                  onClick={() => handleAdminSelect('multi-tenant-config')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    adminView === 'multi-tenant-config'
                      ? 'bg-[#00423d] text-white'
                      : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">dns</span>
                  <span>Multi-Tenant Node Topology</span>
                </button>
              </nav>
            </div>
          </>
        )}

        {currentPortal === 'vendor' && (
          <div>
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#006b5a] text-white flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">Apex Care Pharmacy</p>
                  <p className="text-[10px] text-[#006b5a] font-medium">Licensed Dispenser #NY-104</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] px-3 mb-2">
              Pharmacy Desk
            </p>
            <nav className="space-y-1">
              <button
                onClick={() => handleVendorSelect('order-fulfillment-and-rx')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  vendorView === 'order-fulfillment-and-rx'
                    ? 'bg-[#00423d] text-white'
                    : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg">prescriptions</span>
                  <span>Fulfillment & Rx Workbench</span>
                </div>
                <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  4 Rx
                </span>
              </button>

              <button
                onClick={() => handleVendorSelect('inventory-and-bulk-upload')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  vendorView === 'inventory-and-bulk-upload'
                    ? 'bg-[#00423d] text-white'
                    : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg">upload_file</span>
                  <span>Bulk Catalog & NDC Sync</span>
                </div>
                <span className="bg-[#76f5d9] text-[#00423d] text-[10px] font-bold px-1.5 py-0.5 rounded">
                  2,850 SKUs
                </span>
              </button>

              <button
                onClick={() => handleVendorSelect('inventory-and-pricing')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  vendorView === 'inventory-and-pricing'
                    ? 'bg-[#00423d] text-white'
                    : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg">inventory_2</span>
                  <span>Stock & Live Pricing</span>
                </div>
              </button>

              <button
                onClick={() => handleVendorSelect('payouts-and-settlement')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  vendorView === 'payouts-and-settlement'
                    ? 'bg-[#00423d] text-white'
                    : 'text-[#3f4947] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg">payments</span>
                  <span>Payouts & Settlement</span>
                </div>
                <span className="text-[#006b5a] font-mono text-[11px] font-bold">
                  $14.8k
                </span>
              </button>
            </nav>
          </div>
        )}

        {/* Global Compliance & Status Footer */}
        <div className="pt-4 border-t border-[#bfc9c6]/30">
          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#bfc9c6]/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0b1c30] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006b5a]"></span>
                Compliance Health
              </span>
              <span className="font-mono text-xs font-bold text-[#006b5a]">99.8%</span>
            </div>
            <p className="text-[11px] text-[#6f7977]">
              Continuous OCR & DEA sanction checks active on all 42 registered dispensing partners.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#bfc9c6]/30 text-[11px] text-[#6f7977] space-y-1">
        <div className="flex items-center justify-between">
          <span>Tenant Partition:</span>
          <span className="font-mono text-[#00423d] font-bold">US-TENANT-01</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Data Isolation:</span>
          <span className="text-[#006b5a] font-medium">Schema-per-tenant</span>
        </div>
      </div>
    </aside>
  );
};
