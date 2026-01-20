import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, UserCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  // Estado global del usuario usando Signals
  currentUser = signal<AuthResponse['user'] | null>(null);
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  login(credentials: UserCredentials) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: UserCredentials) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.token.set(null);
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.token.set(token);
      this.currentUser.set(JSON.parse(user));
    }
  }

  saveSession(response: AuthResponse) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));

    this.token.set(response.accessToken);
    this.currentUser.set(response.user);
  }
}
