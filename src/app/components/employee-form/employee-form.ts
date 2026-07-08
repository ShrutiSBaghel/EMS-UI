import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService';
import { Employee } from '../../models/employee';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employee-form',
  imports: [ButtonModule, FormsModule, InputTextModule],
  standalone: true,
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  constructor(private employeeService: EmployeeService) {}

  @Output() employeeSaved = new EventEmitter<Employee>();
  @Output() cancelled = new EventEmitter<void>();

  name: string = '';
  department: string = '';
  saving = signal(false);

  submit() {
    const employee: Employee = {
      name: this.name.trim(),
      department: this.department.trim()
    };

    this.saving.set(true);
    this.employeeService.addEmployees(employee).subscribe({
      next: () => {
        this.employeeSaved.emit(employee);
        this.resetForm();
      },
      error: err => {
        console.error(err);
        this.saving.set(false);
      },
      complete: () => this.saving.set(false)
    });
  }

  cancel() {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm() {
    this.name = '';
    this.department = '';
  }
}
