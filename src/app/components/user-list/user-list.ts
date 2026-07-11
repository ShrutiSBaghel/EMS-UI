import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  imports: [ButtonModule, DialogModule, FormsModule, InputTextModule, PasswordModule, TableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  users: User[] = [];
  loading = signal(true);
  saving = signal(false);
  createUserDialogVisible = false;

  userName = '';
  email = '';
  password = '';
  role = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);

    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  displayName(user: User) {
    return user.name || user.userName || '-';
  }

  openCreateUserDialog() {
    this.createUserDialogVisible = true;
  }

  closeCreateUserDialog() {
    this.createUserDialogVisible = false;
    this.resetForm();
  }

  createUser() {
    this.saving.set(true);

    this.authService.register({
      userName: this.userName.trim(),
      email: this.email.trim() || undefined,
      password: this.password,
      role: this.role.trim() || undefined
    }).subscribe({
      next: () => {
        this.closeCreateUserDialog();
        this.loadUsers();
      },
      error: err => {
        console.error(err);
        this.saving.set(false);
      },
      complete: () => this.saving.set(false)
    });
  }

  resetForm() {
    this.userName = '';
    this.email = '';
    this.password = '';
    this.role = '';
  }
}
