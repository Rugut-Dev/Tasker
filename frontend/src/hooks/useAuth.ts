import { create } from 'zustand';
import { auth } from '@/lib/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: auth.isAuthenticated(),
  
  login: async (email: string, password: string) => {
    try {
      await auth.login({ email, password });
      set({ isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      await auth.register({ username, email, password });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    auth.logout();
    set({ isAuthenticated: false });
  }
})); 