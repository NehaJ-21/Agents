import React, { useState } from 'react';
import { PortalMode, AdminView, VendorView } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { OverviewKpis } from './components/admin/OverviewKpis';
import { SellerVerification } from './components/admin/SellerVerification';
import { CatalogModeration } from './components/admin/CatalogModeration';
import { DisputesView } from './components/admin/DisputesView';
import { AuditLedgerView } from './components/admin/AuditLedgerView';
import { NodeTopologyView } from './components/admin/NodeTopologyView';
import { OrderFulfillment } from './components/vendor/OrderFulfillment';
import { BulkCatalogImport } from './components/vendor/BulkCatalogImport';
import { StockPricingView } from './components/vendor/StockPricingView';
import { PayoutsView } from './components/vendor/PayoutsView';
import { CustomerApp } from './components/customer/CustomerApp';
import { ArchitectureDiagram } from './components/architecture/ArchitectureDiagram';
import { QuickSearchModal } from './components/common/QuickSearchModal';

function AppContent() {
  const [currentPortal, setCurrentPortal] = useState<PortalMode>('super-admin');
  const [adminView, setAdminView] = useState<AdminView>('overview-and-kpis');
  const [vendorView, setVendorView] = useState<VendorView>('order-fulfillment-and-rx');
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(true);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  const handlePortalChange = (portal: PortalMode) => {
    setCurrentPortal(portal);
  };

  const handleAdminViewChange = (view: AdminView) => {
    setAdminView(view);
  };

  const handleVendorViewChange = (view: VendorView) => {
    setVendorView(view);
  };

  const handleQuickNav = (portal: PortalMode, view?: AdminView | VendorView) => {
    setCurrentPortal(portal);
    if (portal === 'super-admin' && view) {
      setAdminView(view as AdminView);
    } else if (portal === 'vendor' && view) {
      setVendorView(view as VendorView);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter',sans-serif]">
      {/* Top Application Header */}
      <Header
        currentPortal={currentPortal}
        onSelectPortal={handlePortalChange}
        onPortalChange={handlePortalChange}
        isMobileDeviceView={isMobileDeviceView}
        onToggleMobileDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
        onOpenSearch={() => setIsQuickSearchOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {currentPortal === 'super-admin' && (
          <div className="flex-1 flex flex-col md:flex-row">
            <Sidebar
              currentPortal="super-admin"
              adminView={adminView}
              activeAdminView={adminView}
              onSelectAdminView={handleAdminViewChange}
              onAdminViewChange={handleAdminViewChange}
            />
            <main className="flex-1 overflow-y-auto bg-[#f8f9ff]">
              {adminView === 'overview-and-kpis' && (
                <OverviewKpis onNavigateToView={handleAdminViewChange} />
              )}
              {adminView === 'seller-verification-and-kyc' && <SellerVerification />}
              {adminView === 'catalog-and-price-anomalies' && <CatalogModeration />}
              {(adminView === 'disputes' || adminView === 'disputes-and-support') && <DisputesView />}
              {(adminView === 'audit-ledger' || adminView === 'audit-trail') && <AuditLedgerView />}
              {(adminView === 'node-topology' || adminView === 'multi-tenant-config') && <NodeTopologyView />}
            </main>
          </div>
        )}

        {currentPortal === 'vendor' && (
          <div className="flex-1 flex flex-col md:flex-row">
            <Sidebar
              currentPortal="vendor"
              vendorView={vendorView}
              activeVendorView={vendorView}
              onSelectVendorView={handleVendorViewChange}
              onVendorViewChange={handleVendorViewChange}
            />
            <main className="flex-1 overflow-y-auto bg-[#f8f9ff]">
              {vendorView === 'order-fulfillment-and-rx' && <OrderFulfillment />}
              {vendorView === 'inventory-and-bulk-upload' && <BulkCatalogImport />}
              {(vendorView === 'stock-and-pricing' || vendorView === 'inventory-and-pricing') && <StockPricingView />}
              {(vendorView === 'payouts' || vendorView === 'payouts-and-settlement') && <PayoutsView />}
            </main>
          </div>
        )}

        {currentPortal === 'customer' && (
          <main className="flex-1 overflow-y-auto bg-[#f8f9ff]">
            <CustomerApp
              isMobileDeviceView={isMobileDeviceView}
              onToggleMobileDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
            />
          </main>
        )}

        {currentPortal === 'architecture' && (
          <main className="flex-1 overflow-y-auto bg-[#f8f9ff]">
            <ArchitectureDiagram />
          </main>
        )}
      </div>

      {/* Quick Search & Command Palette Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onNavigate={handleQuickNav}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

