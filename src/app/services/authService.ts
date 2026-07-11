import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenStorageKey = 'ems_auth_token';

  constructor(private httpClient: HttpClient) {}

  register(request: RegisterRequest) {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest) {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, request);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenStorageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenStorageKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenStorageKey);
  }
}
