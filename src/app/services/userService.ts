import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { runtimeConfig } from '../config/runtime-config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${runtimeConfig.apiBaseUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
