export interface JwtClaims {
  sub?: string;
  userRole?: string;
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
}

export const decodeJwt = (token: string): JwtClaims | null => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar JWT:", error);
    return null;
  }
};