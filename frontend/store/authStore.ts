import { create } from 'zustand';
import { decodeJwt } from "@/utils/jwtUtils";

export interface AuthStoreState {
  token: string | null;
  name: string | null;
  email: string | null;
  userRole: string | null;

  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  token: null,
  name: null,
  email: null,
  userRole: null,

  login: (token: string) => {
    const claims = decodeJwt(token);
    console.log(claims)
    set({
      token,
      name: claims?.name || null,
      email: claims?.email || null,
      userRole: claims?.userRole || null,
    });
  },

  logout: () =>
    set({
      token: null,
      name: null,
      email: null,
      userRole: null,
    }),
}));