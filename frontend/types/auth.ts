export interface LoginResponse {
  token?: string
}

export interface LoginData {
  email?: string;
  password?: string;
}

export interface RegisterData extends LoginData {
  name?: string;
  confirmPassword?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
