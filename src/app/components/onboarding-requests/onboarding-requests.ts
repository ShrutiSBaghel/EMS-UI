import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Employee } from '../../models/employee';

interface OnboardingRequest {
  requestId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  manager: string;
  joiningDate: string;
  requestedBy: string;
  createdDate: string;
  status: string;
  currentApprover: string;
  priority: 'High' | 'Medium' | 'Low';
}

@Component({
  selector: 'app-onboarding-requests',
  imports: [ButtonModule, DialogModule, FormsModule, InputTextModule, TableModule],
  templateUrl: './onboarding-requests.html',
  styleUrl: './onboarding-requests.css',
})
export class OnboardingRequests {
  @Output() requestApproved = new EventEmitter<Employee>();

  selectedRequest: OnboardingRequest | null = null;
  viewDialogVisible = false;
  editMode = false;

  requests: OnboardingRequest[] = [
    {
      requestId: 'ONB-1001',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      department: 'Engineering',
      designation: 'Software Engineer',
      manager: 'Priya Menon',
      joiningDate: '2026-08-03',
      requestedBy: 'Rohan Mehta',
      createdDate: '2026-07-01',
      status: 'Pending Manager Review',
      currentApprover: 'Priya Menon',
      priority: 'High'
    },
    {
      requestId: 'ONB-1002',
      name: 'Isha Verma',
      email: 'isha.verma@example.com',
      department: 'Human Resources',
      designation: 'HR Associate',
      manager: 'Nikhil Rao',
      joiningDate: '2026-08-10',
      requestedBy: 'Kavya Iyer',
      createdDate: '2026-07-03',
      status: 'Submitted',
      currentApprover: 'Nikhil Rao',
      priority: 'Medium'
    },
    {
      requestId: 'ONB-1003',
      name: 'Kabir Gupta',
      email: 'kabir.gupta@example.com',
      department: 'Finance',
      designation: 'Financial Analyst',
      manager: 'Anita Das',
      joiningDate: '2026-08-17',
      requestedBy: 'Meera Nair',
      createdDate: '2026-07-05',
      status: 'Awaiting HR Approval',
      currentApprover: 'Kavya Iyer',
      priority: 'Low'
    },
    {
      requestId: 'ONB-1004',
      name: 'Diya Patel',
      email: 'diya.patel@example.com',
      department: 'Product',
      designation: 'Product Designer',
      manager: 'Arjun Reddy',
      joiningDate: '2026-08-24',
      requestedBy: 'Saanvi Khan',
      createdDate: '2026-07-08',
      status: 'In Progress',
      currentApprover: 'Arjun Reddy',
      priority: 'High'
    }
  ];

  openViewDialog(request: OnboardingRequest) {
    this.selectedRequest = request;
    this.editMode = false;
    this.viewDialogVisible = true;
  }

  closeViewDialog() {
    this.viewDialogVisible = false;
    this.selectedRequest = null;
    this.editMode = false;
  }

  approveRequest(request: OnboardingRequest) {
    this.requestApproved.emit({
      name: request.name,
      department: request.department
    });
    this.removeRequest(request);
  }

  rejectRequest(request: OnboardingRequest) {
    this.removeRequest(request);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  private removeRequest(request: OnboardingRequest) {
    this.requests = this.requests.filter(currentRequest => currentRequest.requestId !== request.requestId);

    if (this.selectedRequest?.requestId === request.requestId) {
      this.closeViewDialog();
    }
  }
}
