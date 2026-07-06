import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EmployeeList
    },
    {
        path: 'employees/new',
        component: EmployeeForm
    }
];
