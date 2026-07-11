import { Component, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employeeService';
import { Employee } from '../../models/employee';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { EmployeeForm } from '../employee-form/employee-form';
import { EmployeeEdit } from '../employee-edit/employee-edit';
import { UserList } from '../user-list/user-list';

@Component({
  selector: 'app-employee-list',
  imports: [ButtonModule, DialogModule, EmployeeEdit, EmployeeForm, InputTextModule, TableModule, TabsModule, UserList],
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees: Employee[] = [];
  loading = signal(true);
  addEmployeeDialogVisible = false;
  editEmployeeDialogVisible = false;
  deleteEmployeeDialogVisible = false;
  selectedEmployee: Employee | null = null;
  employeePendingDelete: Employee | null = null;

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employees = data;
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  addEmployee() {
    this.addEmployeeDialogVisible = true;
  }

  closeAddEmployeeDialog() {
    this.addEmployeeDialogVisible = false;
  }

  handleEmployeeSaved() {
    this.addEmployeeDialogVisible = false;
    this.loadEmployees();
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.editEmployeeDialogVisible = true;
  }

  closeEditEmployeeDialog() {
    this.editEmployeeDialogVisible = false;
    this.selectedEmployee = null;
  }

  handleEmployeeUpdated(employee: Employee) {
    const previousEmployeeId = this.selectedEmployee?.id;

    this.employees = this.employees.map(currentEmployee => {
      if (currentEmployee.id === previousEmployeeId || currentEmployee.id === employee.id) {
        return employee;
      }

      return currentEmployee;
    });

    this.editEmployeeDialogVisible = false;
    this.selectedEmployee = null;
    this.loadEmployees();
  }

  confirmRemoveEmployee(employee: Employee) {
    this.employeePendingDelete = employee;
    this.deleteEmployeeDialogVisible = true;
  }

  closeDeleteEmployeeDialog() {
    this.deleteEmployeeDialogVisible = false;
    this.employeePendingDelete = null;
  }

  removeEmployee() {
    if (!this.employeePendingDelete) {
      return;
    }

    const employeeId = this.employeePendingDelete.id!;
    this.employeeService.removeEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== employeeId);
      this.closeDeleteEmployeeDialog();
      this.loadEmployees();
    });
  }
}
