import React, { useState } from 'react';
import { PortalMode, AdminView, VendorView, CustomerView, UserRole } from '../../types';
import { MOCK_AVATAR } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

interface HeaderProps {
  currentPortal: PortalMode;
  onSelectPortal?: (portal: PortalMode) => void;
  onPortalChange?: (portal: PortalMode) => void;
  adminView?: AdminView;
  onSelectAdminView?: (view: AdminView) => void;
  vendorView?: VendorView;
  onSelectVendorView?: (view: VendorView) => void;
  customerView?: CustomerView;
  onSelectCustomerView?: (view: CustomerView) => void;
  isMobileDeviceView?: boolean;
  onToggleMobileDeviceView?: () => void;
  onOpenQuickSearch?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPortal,
  onSelectPortal,
  onPortalChange,
  isMobileDeviceView = true,
  onToggleMobileDeviceView = () => {},
  onOpenQuickSearch,
  onOpenSearch,
}) => {
  const { currentUser, isAuthenticated, logout, switchAccount, demoUsers } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('customer');

  const handleSelectPortal = (portal: PortalMode) => {
    if (typeof onSelectPortal === 'function') {
      onSelectPortal(portal);
    } else if (typeof onPortalChange === 'function') {
      onPortalChange(portal);
    }
  };

  const handleOpenSearch = () => {
    if (typeof onOpenQuickSearch === 'function') {
      onOpenQuickSearch();
    } else if (typeof onOpenSearch === 'function') {
      onOpenSearch();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#bfc9c6]/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Top Banner / System Telemetry Bar */}
      <div className="bg-[#00423d] text-white px-4 py-1.5 flex items-center justify-between text-xs tracking-wide">
        <div className="flex items-center gap-3 overflow-x-auto py-0.5">
          <div className="flex items-center gap-1.5 font-semibold text-[#8ed0c7]">
            <span className="w-2 h-2 rounded-full bg-[#59dbc0] animate-pulse"></span>
            <span>GENERICMED CLUSTER:</span>
            <span className="bg-[#0f5b54] px-1.5 py-0.5 rounded text-[11px] text-white font-mono">PROD-US-EAST-1</span>
          </div>
          <span className="text-[#8ed0c7]/40 hidden sm:inline">|</span>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <span>Dynamic Median Guardrail: <strong className="text-[#76f5d9]">±35%</strong></span>
            <span>•</span>
            <span>RxNorm Match: <strong className="text-[#76f5d9]">99.2%</strong></span>
            <span>•</span>
            <span>SLA On-Time: <strong className="text-[#76f5d9]">94.8%</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden lg:inline-flex items-center gap-1 text-white/70">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            FDA & DEA Cleared
          </span>
          <span className="bg-[#0f5b54] text-[#8ed0c7] px-2 py-0.5 rounded text-[11px] font-mono font-medium">
            v4.8.2-GA
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand + Environment */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSelectPortal('super-admin')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#006b5a] transition-colors">
              <span className="material-symbols-outlined text-[22px]">medication</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#0b1c30] tracking-tight">
                  Generic<span className="text-[#006b5a]">Med</span>
                </span>
                <span className="bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#dce9ff]">
                  CONSOLE
                </span>
              </div>
              <p className="text-[11px] text-[#6f7977] font-medium leading-none">
                Multi-Tenant Healthcare Platform
              </p>
            </div>
          </button>
        </div>

        {/* Center: Primary Role / Flow Switcher */}
        <nav className="hidden md:flex items-center bg-[#f8f9ff] p-1 rounded-xl border border-[#bfc9c6]/50 shadow-inner">
          <button
            onClick={() => handleSelectPortal('super-admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentPortal === 'super-admin'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'text-[#3f4947] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            Super Admin / Ops
          </button>

          <button
            onClick={() => handleSelectPortal('vendor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentPortal === 'vendor'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'text-[#3f4947] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-base">local_pharmacy</span>
            Pharmacy / Vendor
            <span className="ml-1 px-1.5 py-0.2 bg-[#76f5d9] text-[#00423d] rounded-full text-[10px] font-bold">
              NY-104
            </span>
          </button>

          <button
            onClick={() => handleSelectPortal('customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentPortal === 'customer'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'text-[#3f4947] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-base">shopping_cart</span>
            Customer Marketplace
            <span className="ml-1 px-1.5 py-0.2 bg-[#006b5a] text-white rounded-full text-[10px] font-bold">
              Live
            </span>
          </button>

          <button
            onClick={() => handleSelectPortal('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentPortal === 'architecture'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'text-[#3f4947] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-base">account_tree</span>
            System Architecture
          </button>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          {/* Customer View Mobile Device Toggle */}
          {currentPortal === 'customer' && (
            <button
              onClick={onToggleMobileDeviceView}
              title={isMobileDeviceView ? 'Switch to Fullscreen Desktop View' : 'Switch to Mobile Phone View'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[#bfc9c6] bg-white text-[#3f4947] hover:border-[#006b5a] hover:text-[#006b5a] transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                {isMobileDeviceView ? 'desktop_windows' : 'smartphone'}
              </span>
              <span>{isMobileDeviceView ? 'Fullscreen' : 'Mobile View'}</span>
            </button>
          )}

          {/* Quick Search trigger */}
          <button
            onClick={handleOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-[#eff4ff] text-[#3f4947] hover:bg-[#e5eeff] border border-[#dce9ff] transition-colors"
            title="Search medicines, sellers, orders (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-base text-[#006b5a]">search</span>
            <span className="hidden lg:inline text-xs font-medium text-[#6f7977]">Jump to medicine, seller...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-[#bfc9c6] text-[#6f7977]">
              ⌘K
            </kbd>
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#3f4947] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#bfc9c6]/60 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-[#bfc9c6]/30">
                  <div className="flex items-center gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">Platform Alerts</span>
                    <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      3 Urgent
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#6f7977] hover:text-[#0b1c30]"
                  >
                    Close
                  </button>
                </div>
                <div className="divide-y divide-[#eff4ff] text-xs max-h-80 overflow-y-auto mt-2">
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-base text-[#ba1a1a] mt-0.5">warning</span>
                    <div>
                      <p className="font-semibold text-[#0b1c30]">Price Deviation Flagged</p>
                      <p className="text-[#3f4947]">QuickPharma LLC posted Atorvastatin 20mg at $1.20 (-91.7% from median).</p>
                      <span className="text-[10px] text-[#6f7977]">12 mins ago • Catalog Guard</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-base text-[#006b5a] mt-0.5">verified_user</span>
                    <div>
                      <p className="font-semibold text-[#0b1c30]">New Seller KYC Pending</p>
                      <p className="text-[#3f4947]">Apex Care Pharmaceuticals LLC submitted cold-chain verification.</p>
                      <span className="text-[10px] text-[#6f7977]">2 hrs ago • Compliance Queue</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-base text-[#006b5a] mt-0.5">receipt_long</span>
                    <div>
                      <p className="font-semibold text-[#0b1c30]">New Rx Verification Required</p>
                      <p className="text-[#3f4947]">Order #GM-88412 waiting for licensed pharmacist review.</p>
                      <span className="text-[10px] text-[#6f7977]">4 mins ago • Pharmacy Desk</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Authentication & Profile Section */}
          {!isAuthenticated || !currentUser ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setShowAuthModal(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-[#bfc9c6] hover:border-[#00423d] text-xs font-bold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base text-[#006b5a]">login</span>
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('register');
                  setShowAuthModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#00423d] hover:bg-[#006b5a] text-xs font-bold text-white shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>Register</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full border border-[#bfc9c6]/60 hover:border-[#00423d] transition-colors bg-[#eff4ff]/60"
              >
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-[#0b1c30] leading-none">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-[#006b5a] font-semibold leading-none capitalize">
                    {currentUser.role === 'super-admin'
                      ? 'Super Admin'
                      : currentUser.role === 'vendor'
                      ? 'Pharmacy Desk'
                      : 'Customer'}
                  </span>
                </div>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#006b5a]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#bfc9c6]/60 p-3.5 z-50 text-xs animate-in fade-in">
                  <div className="pb-2.5 mb-2.5 border-b border-[#eff4ff]">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#0b1c30] text-sm truncate">{currentUser.name}</p>
                      <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase tracking-wider bg-[#eff4ff] text-[#00423d]">
                        {currentUser.role}
                      </span>
                    </div>
                    <p className="text-[#6f7977] text-[11px] font-mono truncate">{currentUser.email}</p>
                    {currentUser.title && (
                      <p className="text-[#3f4947] text-[11px] mt-0.5">{currentUser.title}</p>
                    )}
                    {currentUser.organization && (
                      <p className="text-[10px] text-[#006b5a] font-semibold mt-0.5">
                        {currentUser.organization}
                      </p>
                    )}
                    {currentUser.licenseNumber && (
                      <p className="text-[10px] text-[#6f7977] font-mono mt-0.5">
                        License: {currentUser.licenseNumber}
                      </p>
                    )}
                  </div>

                  {/* Fast Account Switcher */}
                  <div className="space-y-1.5 pb-2.5 mb-2.5 border-b border-[#eff4ff]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#6f7977] uppercase tracking-wider px-1">
                      <span>Switch Demo Profile</span>
                      <span className="material-symbols-outlined text-xs text-[#006b5a]">sync_alt</span>
                    </div>
                    {demoUsers.map((user) => {
                      const isSelected = currentUser.id === user.id;
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => {
                            switchAccount(user);
                            setShowProfileMenu(false);
                            if (user.role === 'super-admin') handleSelectPortal('super-admin');
                            else if (user.role === 'vendor') handleSelectPortal('vendor');
                            else if (user.role === 'customer') handleSelectPortal('customer');
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#eff4ff] text-[#00423d] font-bold'
                              : 'hover:bg-[#f8f9ff] text-[#3f4947]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006b5a]" />
                            <span className="truncate text-[11px]">{user.name.split(',')[0]}</span>
                          </div>
                          <span className="text-[9.5px] uppercase font-mono text-[#6f7977]">
                            {user.role === 'super-admin' ? 'Admin' : user.role === 'vendor' ? 'Vendor' : 'Patient'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('register');
                        setShowAuthModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#3f4947] flex items-center gap-2 font-medium"
                    >
                      <span className="material-symbols-outlined text-base text-[#006b5a]">person_add</span>
                      <span>Register Another Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center gap-2 font-semibold"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Portal Selection Bar (Visible only on small screens) */}
      <div className="flex md:hidden items-center justify-around bg-[#eff4ff] border-t border-[#dce9ff] px-2 py-1.5 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => handleSelectPortal('super-admin')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentPortal === 'super-admin' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
        >
          Ops Admin
        </button>
        <button
          onClick={() => handleSelectPortal('vendor')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentPortal === 'vendor' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
        >
          Pharmacy Desk
        </button>
        <button
          onClick={() => handleSelectPortal('customer')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentPortal === 'customer' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
        >
          Customer App
        </button>
        <button
          onClick={() => handleSelectPortal('architecture')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentPortal === 'architecture' ? 'bg-[#00423d] text-white' : 'text-[#3f4947]'}`}
        >
          Architecture
        </button>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
        initialRole={authModalRole}
        onNavigatePortal={handleSelectPortal}
      />
    </header>
  );
};
