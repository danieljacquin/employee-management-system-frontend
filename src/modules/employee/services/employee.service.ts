import { apiClient } from '@/shared/api/axiosInstace';

import type {
  CreateEmployeeDto,
  Employee,
  EmployeeBase,
  EmployeeDomainFilters,
  EmployeeListResponse,
  UpdateEmployeeDto,
} from '../types/employee.types';

export const getAll = async (
  page: number,
  filters: EmployeeDomainFilters,
  signal?: AbortSignal
): Promise<EmployeeListResponse> => {
  const params = new URLSearchParams();
  if (page) {
    params.set('page', page.toString());
  }

  if (filters.firstName) {
    params.set('firstName', filters.firstName.toString());
  }

  if (filters.lastName) {
    params.set('lastName', filters.lastName.toString());
  }

  if (filters.email) {
    params.set('email', filters.email.toString());
  }

  if (filters.employeeCountry) {
    params.set('employeeCountry', filters.employeeCountry.toString());
  }

  const response = await apiClient.get<EmployeeListResponse>('/employee', { params, signal });
  return response.data;
};

export const create = async (employeeData: CreateEmployeeDto): Promise<Employee> => {
  const response = await apiClient.post<Employee>('/employee', employeeData);
  return response.data;
};

export const update = async (id: number, employeeData: UpdateEmployeeDto): Promise<Employee> => {
  const response = await apiClient.patch<Employee>(`employee/${id}`, employeeData);
  return response.data;
};

export const drop = async (id: number): Promise<EmployeeBase> => {
  const response = await apiClient.delete<EmployeeBase>(`employee/${id}`);
  return response.data;
};
