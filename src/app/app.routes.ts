import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { Login } from './components/login/login';
import { UserList } from './components/user-list/user-list';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EmployeeList
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'users',
        component: UserList
    }
];
