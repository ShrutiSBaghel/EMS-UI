import { Component, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employeeService';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employee-list',
  imports: [ButtonModule, InputTextModule, TableModule],
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit{
  constructor(private employeeService: EmployeeService, 
    private router: Router
  ) {}

  employees: Employee[] = [];
  loading = signal(true);

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({next: data => {
      this.employees = data;
      this.loading.set(false);
    },
  error: err => {
    console.error(err);
    this.loading.set(false);
  }}
  )}

  addEmployee() {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(employee: Employee) {
    console.log('Edit employee selected:', employee);
  }

  removeEmployee(id: number) {
    this.employeeService.removeEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== id);
    })
  }
}
