import { Injectable } from '@angular/core';

import { AuthResponse, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public async login(user: User): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json() as AuthResponse;
    this.saveToken(data.token);
  }

  public async register(user: User): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`Register failed: ${response.status}`);
    }

    const data = await response.json() as AuthResponse;
    this.saveToken(data.token);
  }
}
