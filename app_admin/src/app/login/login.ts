import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials: User = {
    email: '',
    password: ''
  };

  message = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.credentials);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      this.message = 'Login failed. Check the email and password.';
    }
  }
}
