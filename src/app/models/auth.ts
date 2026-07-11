export interface LoginRequest {
  userName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  userName: string;
  email?: string;
  password: string;
  role?: string;
}
