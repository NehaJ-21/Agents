import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, RegistrationData, UserRole } from '../types';
import { MOCK_AVATAR } from '../data/mockData';

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'USR-ADMIN-01',
    name: 'Dr. Alena Vance, PharmD',
    email: 'admin@genericmed.com',
    role: 'super-admin',
    title: 'Chief Compliance Officer & Root Admin',
    organization: 'GenericMed Platform Operations',
    licenseNumber: 'NY-RPH-094182',
    avatar: MOCK_AVATAR,
    phone: '(212) 555-0100',
    joinedDate: 'Jan 15, 2024',
  },
  {
    id: 'USR-VENDOR-01',
    name: 'Dr. Marcus Vance, PharmD',
    email: 'marcus@apexcare.rx',
    role: 'vendor',
    title: 'Pharmacist-in-Charge',
    organization: 'Apex Care Pharmaceuticals LLC',
    licenseNumber: 'NY-LIC-8841',
    deaNumber: 'FA8940192',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    phone: '(518) 555-0192',
    joinedDate: 'Mar 10, 2024',
  },
  {
    id: 'USR-CUST-01',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@gmail.com',
    role: 'customer',
    title: 'Verified Patient',
    organization: 'Consumer Member',
    deliveryAddress: '450 Henry St, Brooklyn, NY 11201',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '(718) 555-0182',
    joinedDate: 'Aug 22, 2024',
  },
];

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegistrationData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchAccount: (user: AuthUser) => void;
  registeredUsers: AuthUser[];
  demoUsers: AuthUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_CURRENT_USER = 'genericmed_current_user_v1';
const STORAGE_KEY_ALL_USERS = 'genericmed_registered_users_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore parse errors
    }
    // Default to Super Admin for initial rich experience
    return DEMO_USERS[0];
  });

  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return DEMO_USERS;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch (err) {
      console.warn('Failed to save currentUser to localStorage', err);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(registeredUsers));
    } catch (err) {
      console.warn('Failed to save registeredUsers to localStorage', err);
    }
  }, [registeredUsers]);

  const login = async (
    email: string,
    password?: string,
    targetRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay for realistic UX
    await new Promise((res) => setTimeout(res, 350));

    const cleanEmail = email.trim().toLowerCase();
    
    // Look up in registered users or demo users
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && (!targetRole || u.role === targetRole)
    ) || DEMO_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail && (!targetRole || u.role === targetRole)
    );

    if (!matchedUser) {
      // Allow flexible quick login if user enters an unrecognized email by generating a profile
      if (cleanEmail.includes('@')) {
        const generatedUser: AuthUser = {
          id: `USR-${Date.now().toString().slice(-6)}`,
          name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: cleanEmail,
          role: targetRole || 'customer',
          title: targetRole === 'vendor' ? 'Pharmacist-in-Charge' : targetRole === 'super-admin' ? 'Compliance Staff' : 'Member Patient',
          deliveryAddress: 'Brooklyn, NY 11201',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setRegisteredUsers(prev => [generatedUser, ...prev]);
        setCurrentUser(generatedUser);
        return { success: true };
      }
      return { success: false, error: 'No account found with this email address.' };
    }

    // Basic password validation if provided
    if (password && password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    setCurrentUser(matchedUser);
    return { success: true };
  };

  const register = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 400));

    if (!data.name || !data.email || !data.password) {
      return { success: false, error: 'Please provide all required registration fields.' };
    }

    const cleanEmail = data.email.trim().toLowerCase();

    // Check duplicate in registered users
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newUser: AuthUser = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role,
      title:
        data.role === 'vendor'
          ? 'Registered Pharmacist-in-Charge'
          : data.role === 'super-admin'
          ? 'Platform Compliance Inspector'
          : 'Verified Patient',
      organization: data.organization || (data.role === 'vendor' ? 'Independent Community Pharmacy' : undefined),
      licenseNumber: data.licenseNumber,
      deaNumber: data.deaNumber,
      deliveryAddress: data.deliveryAddress || 'Brooklyn, NY 11201',
      phone: data.phone,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchAccount = (user: AuthUser) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchAccount,
        registeredUsers,
        demoUsers: DEMO_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
