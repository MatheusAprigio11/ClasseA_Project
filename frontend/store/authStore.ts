import { create } from 'zustand';

type AuthStore = {
  token: string,
  login: (token: string) => void
  logout: () => void
}


export const useAuthStore = create<AuthStore> () ((set) => ({
  token: "",
  login: (token) => set(() => ({ token: token })),
  logout: () => set(() => ({ token: "" }))
}));
