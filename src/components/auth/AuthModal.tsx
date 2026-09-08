import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, PortalMode } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  onNavigatePortal?: (portal: PortalMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'customer',
  onNavigatePortal,
}) => {
  const { login, register, demoUsers, currentUser, switchAccount } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  
  // Login Form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Registration Form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regLicense, setRegLicense] = useState('');
  const [regDea, setRegDea] = useState('');
  const [regAddress, setRegAddress] = useState('Brooklyn, NY 11201');
  const [regPhone, setRegPhone] = useState('');
  const [regConsent, setRegConsent] = useState(true);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Empty', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-red-400' };
    if (score === 2 || score === 3) return { score: 2, text: 'Moderate', color: 'bg-amber-400' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const handleQuickDemoLogin = (user: typeof demoUsers[0]) => {
    switchAccount(user);
    if (onNavigatePortal) {
      if (user.role === 'super-admin') onNavigatePortal('super-admin');
      else if (user.role === 'vendor') onNavigatePortal('vendor');
      else if (user.role === 'customer') onNavigatePortal('customer');
    }
    onClose();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    const res = await login(loginEmail, loginPassword, selectedRole);
    setLoading(false);

    if (res.success) {
      if (onNavigatePortal) {
        if (selectedRole === 'super-admin') onNavigatePortal('super-admin');
        else if (selectedRole === 'vendor') onNavigatePortal('vendor');
        else if (selectedRole === 'customer') onNavigatePortal('customer');
      }
      onClose();
    } else {
      setErrorMessage(res.error || 'Login failed. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    if (!regConsent) {
      setErrorMessage('Please accept the Terms of Service & Healthcare Privacy agreement.');
      return;
    }

    setLoading(true);
    const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: selectedRole,
      organization: regOrg,
      licenseNumber: regLicense,
      deaNumber: regDea,
      deliveryAddress: regAddress,
      phone: regPhone,
    });
    setLoading(false);

    if (res.success) {
      if (onNavigatePortal) {
        if (selectedRole === 'super-admin') onNavigatePortal('super-admin');
        else if (selectedRole === 'vendor') onNavigatePortal('vendor');
        else if (selectedRole === 'customer') onNavigatePortal('customer');
      }
      onClose();
    } else {
      setErrorMessage(res.error || 'Registration failed. Please try again.');
    }
  };

  const strength = getPasswordStrength(regPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-[#bfc9c6]/60 w-full max-w-lg max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="p-5 border-b border-[#bfc9c6]/30 flex items-center justify-between bg-gradient-to-r from-[#eff4ff] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-lg shadow-sm">
              <span className="material-symbols-outlined text-xl">
                {mode === 'login' ? 'login' : 'person_add'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0b1c30]">
                {mode === 'login' ? 'Sign In to GenericMed' : 'Create GenericMed Account'}
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Multi-Tenant Healthcare Platform & Rx Marketplace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#6f7977] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* 1-Click Demo Profiles Shortcut */}
        <div className="px-5 pt-4 pb-2 bg-[#f8f9ff] border-b border-[#bfc9c6]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#6f7977] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#006b5a]">flash_on</span>
              <span>Quick 1-Click Demo Logins</span>
            </span>
            <span className="text-[10px] text-[#006b5a] font-semibold">Instant Switching</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {demoUsers.map((user) => {
              const isActive = currentUser?.id === user.id;
              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickDemoLogin(user)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-[#00423d] ring-2 ring-[#00423d]/20 shadow-sm'
                      : 'bg-white/80 border-[#bfc9c6]/50 hover:border-[#006b5a] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#00423d]">
                      {user.role === 'super-admin' ? 'Super Admin' : user.role === 'vendor' ? 'Pharmacy' : 'Customer'}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#006b5a]" title="Current User" />
                    )}
                  </div>
                  <p className="font-bold text-[#0b1c30] truncate mt-1 text-[11px]">{user.name.split(',')[0]}</p>
                  <p className="text-[9.5px] text-[#6f7977] truncate font-mono">{user.email}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-[#bfc9c6]/40 text-xs font-semibold px-5 pt-3 bg-white">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`pb-2.5 px-4 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              mode === 'login'
                ? 'border-[#00423d] text-[#00423d]'
                : 'border-transparent text-[#6f7977] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            className={`pb-2.5 px-4 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              mode === 'register'
                ? 'border-[#00423d] text-[#00423d]'
                : 'border-transparent text-[#6f7977] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Create Account</span>
          </button>
        </div>

        {/* Role Picker for Context */}
        <div className="px-5 pt-3">
          <label className="block text-[11px] font-bold text-[#6f7977] uppercase tracking-wider mb-1.5">
            Select Account Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                selectedRole === 'customer'
                  ? 'bg-[#00423d] text-white border-[#00423d] shadow-sm'
                  : 'bg-[#eff4ff]/60 border-[#bfc9c6]/40 text-[#3f4947] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('vendor')}
              className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                selectedRole === 'vendor'
                  ? 'bg-[#00423d] text-white border-[#00423d] shadow-sm'
                  : 'bg-[#eff4ff]/60 border-[#bfc9c6]/40 text-[#3f4947] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">local_pharmacy</span>
              <span>Pharmacy</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('super-admin')}
              className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                selectedRole === 'super-admin'
                  ? 'bg-[#00423d] text-white border-[#00423d] shadow-sm'
                  : 'bg-[#eff4ff]/60 border-[#bfc9c6]/40 text-[#3f4947] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              <span>Ops Admin</span>
            </button>
          </div>
        </div>

        {/* Error / Notification Banner */}
        {errorMessage && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-[#ffdad6] border border-[#ffb4ab] text-[#93000a] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-[#e8f5e9] border border-[#a5d6a7] text-[#1b5e20] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0">info</span>
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Tab 1: Sign In Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                Work or Personal Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-[#6f7977]">
                  mail
                </span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'super-admin'
                      ? 'admin@genericmed.com'
                      : selectedRole === 'vendor'
                      ? 'marcus@apexcare.rx'
                      : 'sarah.jenkins@gmail.com'
                  }
                  required
                  className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30] placeholder-[#6f7977] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#0b1c30]">Password</label>
                <button
                  type="button"
                  onClick={() => setInfoMessage('Password reset link sent to demo email address.')}
                  className="text-[11px] text-[#006b5a] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-[#6f7977]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full pl-9 pr-10 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30] placeholder-[#6f7977] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#6f7977] hover:text-[#0b1c30]"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6f7977]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#00423d] focus:ring-[#006b5a]"
                />
                <span>Remember session</span>
              </label>
              <span className="font-mono text-[10px]">TLS 1.3 AES-256</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#00423d] hover:bg-[#006b5a] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Sign In as {selectedRole === 'super-admin' ? 'Super Admin' : selectedRole === 'vendor' ? 'Pharmacy Desk' : 'Customer'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Full Name / Contact *
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Evans"
                  required
                  className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white"
                />
              </div>
            </div>

            {/* Role specific input fields */}
            {selectedRole === 'vendor' && (
              <div className="space-y-3 p-3 bg-[#eff4ff]/60 rounded-xl border border-[#dce9ff]">
                <span className="text-[10px] font-bold text-[#006b5a] uppercase tracking-wider block">
                  Pharmacy Regulatory Credentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0b1c30] mb-0.5">
                      Facility / Pharmacy Name
                    </label>
                    <input
                      type="text"
                      value={regOrg}
                      onChange={(e) => setRegOrg(e.target.value)}
                      placeholder="e.g. MetroCare Chemists LLC"
                      className="w-full px-3 py-1.5 bg-white border border-[#bfc9c6]/60 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0b1c30] mb-0.5">
                      State Dispensing License #
                    </label>
                    <input
                      type="text"
                      value={regLicense}
                      onChange={(e) => setRegLicense(e.target.value)}
                      placeholder="e.g. DL-NY-2026-9901"
                      className="w-full px-3 py-1.5 bg-white border border-[#bfc9c6]/60 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0b1c30] mb-0.5">
                      DEA Registration #
                    </label>
                    <input
                      type="text"
                      value={regDea}
                      onChange={(e) => setRegDea(e.target.value)}
                      placeholder="e.g. FA9921402"
                      className="w-full px-3 py-1.5 bg-white border border-[#bfc9c6]/60 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0b1c30] mb-0.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-1.5 bg-white border border-[#bfc9c6]/60 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedRole === 'customer' && (
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Prescription Delivery Address
                </label>
                <input
                  type="text"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Street, City, State, Zip (e.g. Brooklyn, NY 11201)"
                  className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30]"
                />
              </div>
            )}

            {selectedRole === 'super-admin' && (
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Department & Security Clearance Key
                </label>
                <input
                  type="text"
                  placeholder="Platform Ops • Code: SEC-AUTH-ROOT"
                  className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 8 characters..."
                  required
                  className="w-full px-3 pr-10 py-2 bg-[#f8f9ff] border border-[#bfc9c6]/60 rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-[#6f7977] hover:text-[#0b1c30]"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Password strength bar */}
              {regPassword && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                  </div>
                  <span className="text-[10px] font-semibold text-[#6f7977]">{strength.text}</span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2 text-xs text-[#3f4947] cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={regConsent}
                onChange={(e) => setRegConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#00423d] focus:ring-[#006b5a]"
              />
              <span>
                I agree to the <strong>Terms of Service</strong>, HIPAA data security protocols, and licensed healthcare marketplace guidelines.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#00423d] hover:bg-[#006b5a] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>Create {selectedRole === 'super-admin' ? 'Admin' : selectedRole === 'vendor' ? 'Pharmacy' : 'Patient'} Account</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
