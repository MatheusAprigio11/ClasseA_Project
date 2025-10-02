export interface LoginResponse {
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type AuthFunction<T> = (data: T) => Promise<void>;

export interface AuthState {
  readonly token: string | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  login: AuthFunction<LoginData>;
  register: AuthFunction<RegisterData>;
  forgotPassword: AuthFunction<ForgotPasswordData>;
  resetPassword: AuthFunction<ResetPasswordData>;
  logout: () => void;
  clearError: () => void;
}