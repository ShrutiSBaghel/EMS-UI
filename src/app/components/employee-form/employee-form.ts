import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
}) 
export class EmployeeForm {
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
    private router: Router
  ) {}

  id: number = 0;
  name: string = '';
  department: string = '';

  // employeeForm = this.formBuilder.group({
  //   name: [''],
  //   department: ['']
  // });

  submit() {
    // if (this.employeeForm.valid) {
    //   console.log(1, this.employeeForm.value);
    //   const emp = this.employeeForm.getRawValue() as unknown as Employee;
    //   this.employeeService.addEmployees(emp);
    // }
    let emp: Employee = {id: this.id, name: this.name, department: this.department}
    this.employeeService.addEmployees(emp).subscribe({next: data => {
      console.log('check');
      try {
        this.router.navigate(['/']).then(result => {
          console.log('navigation');
          
        });
      } catch (error) {
        console.error(error);
        
      }
    }, error: err => {
      console.log('error');
    }, complete: () => {
      console.log('coming here');
      
      this.router.navigate(['']);
    }});
  }

  testNavigation() {
    this.router.navigate(['/']);

  }
}
