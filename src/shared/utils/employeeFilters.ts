import type {
  EmployeeDomainFilters,
  EmployeeFormFilters,
} from '@/modules/employee/types/employee.types';

export const toDomainFilters = (form: EmployeeFormFilters): EmployeeDomainFilters => {
  return {
    ...(form.firstName && { firstName: form.firstName }),
    ...(form.lastName && { lastName: form.lastName }),
    ...(form.email && { email: form.email }),
    ...(form.employeeCountry && { employeeCountry: form.employeeCountry }),
  };
};
