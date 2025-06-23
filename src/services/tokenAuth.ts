import { jwtDecode } from 'jwt-decode';

export interface DecodedProps {
  id: number;
  role: string;
  exp: number;
}

export function getDecodedToken(token: string): DecodedProps | null {
  try {
    return jwtDecode<DecodedProps>(token);
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = getDecodedToken(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
}
