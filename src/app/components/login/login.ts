import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, InputTextModule, PasswordModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  username = '';
  password = '';
  loading = signal(false);
  errorMessage = signal('');

  submit() {
    this.errorMessage.set('');
    this.loading.set(true);

    this.authService.login({
      userName: this.username,
      password: this.password
    }).subscribe({
      next: response => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        this.errorMessage.set('Invalid username or password.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
