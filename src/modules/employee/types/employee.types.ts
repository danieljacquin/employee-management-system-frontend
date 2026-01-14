export type EmployeeStatus = 'ACTIVE' | 'INACTIVE';

export const EMPLOYEE_COUNTRIES = ['COLOMBIA', 'UNITED STATES'] as const;
export type EmployeeCountry = (typeof EMPLOYEE_COUNTRIES)[number];

export const DEPARTMENTS = [
  'ADMIN',
  'FINANCE',
  'PROCUREMENT',
  'INFRASTRUCTURE',
  'OPERATIONS',
  'HR',
  'GENERAL_SERVICES',
] as const;

export type DepartmentType = (typeof DEPARTMENTS)[number];

export const DOCUMENT_TYPES = ['CC', 'CE', 'PASSPORT', 'PEP'] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export interface EmployeeBase {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  email: string;
  documentType: DocumentType;
  documentNumber: string;
  department: DepartmentType;
  employeeCountry: EmployeeCountry;
  status: EmployeeStatus;
  hireDate: string;
}

export interface Employee extends EmployeeBase {
  id: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export type CreateEmployeeDto = Omit<EmployeeBase, 'email' | 'status'>;
export type UpdateEmployeeDto = Partial<Omit<EmployeeBase, 'email' | 'status'>>;

interface Meta {
  limit: number;
  page: number;
  total: number;
}

export interface EmployeeListResponse {
  items: Employee[];
  meta: Meta;
}

/**
 * Filtros reales (lo que afecta el resultado)
 * ❌ No strings vacíos
 * ❌ No valores falsos
 */
export type EmployeeDomainFilters = Partial<
  Pick<EmployeeBase, 'firstName' | 'lastName' | 'email' | 'employeeCountry'>
>;

/**
 * Estado del formulario (UI)
 * ✅ Strings vacíos permitidos
 */
export type EmployeeFormFilters = {
  firstName: string;
  lastName: string;
  email: string;
  employeeCountry: EmployeeCountry | '';
};
