import { create } from 'zustand';

export interface AuthStoreState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  token: null,
  login: (token: string) => set({ token }),
  logout: () => set({ token: null }),
}));