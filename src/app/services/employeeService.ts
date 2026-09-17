import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { runtimeConfig } from '../config/runtime-config';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private httpClient: HttpClient){}

  private apiUrl = `${runtimeConfig.apiBaseUrl}/employees`;

  getEmployees() {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  addEmployees(employee: Employee) {
    return this.httpClient.post<void>(this.apiUrl, employee);
  }

  updateEmployee(employeeId: number, employee: Employee) {
    return this.httpClient.put<void>(`${this.apiUrl}/${employeeId}`, employee);
  }

  removeEmployee(employeeId: number) {
    return this.httpClient.delete<void>(this.apiUrl, {body: employeeId});
  }
}
