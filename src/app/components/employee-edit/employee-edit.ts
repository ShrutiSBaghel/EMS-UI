import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employeeService';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employee-edit',
  imports: [ButtonModule, FormsModule, InputTextModule],
  standalone: true,
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit {
  constructor(private employeeService: EmployeeService) {}

  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() cancelled = new EventEmitter<void>();

  editingEmployee: Employee = {
    id: 0,
    name: '',
    department: ''
  };
  originalEmployeeId: number = 0;
  saving = signal(false);

  @Input() set employee(employee: Employee | null) {
    if (!employee) {
      this.resetForm();
      return;
    }

    this.editingEmployee = { ...employee };
    this.originalEmployeeId = employee.id!;
  }

  submit() {
    const employee: Employee = {
      name: this.editingEmployee.name.trim(),
      department: this.editingEmployee.department.trim()
    };

    this.saving.set(true);
    this.employeeService.updateEmployee(this.originalEmployeeId, employee).subscribe({
      next: () => {
        this.employeeUpdated.emit(employee);
      },
      error: err => {
        console.error(err);
        this.saving.set(false);
      },
      complete: () => this.saving.set(false)
    });
  }

  cancel() {
    this.cancelled.emit();
  }

  private resetForm() {
    this.editingEmployee = {
      id: 0,
      name: '',
      department: ''
    };
  }
}
