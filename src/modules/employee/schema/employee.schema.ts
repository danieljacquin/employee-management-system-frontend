import Dayjs from 'dayjs';
import * as z from 'zod';

import { DEPARTMENTS, DOCUMENT_TYPES, EMPLOYEE_COUNTRIES } from '../types/employee.types';

const CountrySchema = z.enum(EMPLOYEE_COUNTRIES);
const DocumentTypeSchema = z.enum(DOCUMENT_TYPES);
const DepartmentSchema = z.enum(DEPARTMENTS);

export const EmployeeSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'First Name must be at most 20 characters')
    .regex(/^[A-Z]+$/, 'First Name can only contain letters'),
  middleName: z
    .string()
    .max(50, 'Middle Name must be at most 50 characters')
    .regex(/^[A-Z ]*$/, 'Middle Name can only contain letters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(20, 'Last Name must be at most 20 characters')
    .regex(/^[A-Z]+$/, 'Last Name can only contain letters'),
  secondLastName: z
    .string()
    .min(1, 'Second Last Name is required')
    .max(20, 'Second Last Name must be at most 20 characters')
    .regex(/^[A-Z]*$/, 'Second Last Name can only contain letters'),
  employeeCountry: CountrySchema.optional().refine(Boolean, {
    message: 'Country is required',
  }),
  documentType: DocumentTypeSchema.optional().refine(Boolean, {
    message: 'Document type is required',
  }),
  documentNumber: z
    .string()
    .min(1, 'Document Number is required')
    .max(20, 'Document Number must be at most 20 characters')
    .regex(/^[a-zA-Z0-9-]+$/, 'Document Number can only contain letters and numbers'),
  hireDate: z
    .string()
    .min(1, 'Date of Hire is required')
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid Date of Hire' })
    .refine(
      (val) => {
        const substractedDate = Dayjs().subtract(1, 'month');
        return Dayjs(val).isSame(substractedDate) || Dayjs(val).isAfter(substractedDate);
      },
      { message: 'Hire Date can not be more than one month before today' }
    )
    .refine(
      (val) => {
        const today = Dayjs();
        return Dayjs(val).isBefore(today);
      },
      { message: 'Hire Date can not be in the future' }
    ),
  department: DepartmentSchema.optional().refine(Boolean, {
    message: 'Department is required',
  }),
});

export const EmployeeSubmitSchema = EmployeeSchema.transform((data) => {
  return {
    ...data,
    middleName: data.middleName || undefined,
    employeeCountry: data.employeeCountry!, // Elimina undefined
    documentType: data.documentType!,
    department: data.department!,
  };
});

export type EmployeeFormData = z.infer<typeof EmployeeSchema>;
/*export const EmployeeUpdateSchema = EmployeeSchema.extend({
  id: z.string(),
});*/
