import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { formatDateForInput } from '@/shared/utils/formatDate';
import { notify } from '@/shared/utils/toast';

import {
  EmployeeSchema,
  EmployeeSubmitSchema,
  type EmployeeFormData,
} from '../schema/employee.schema';
import {
  DEPARTMENTS,
  DOCUMENT_TYPES,
  EMPLOYEE_COUNTRIES,
  type CreateEmployeeDto,
  type Employee,
  type UpdateEmployeeDto,
  //type UpdateEmployeeDto,
} from '../types/employee.types';

type EmployeeFormProps = {
  onCreateEmployee: (formData: CreateEmployeeDto) => Promise<Employee>;
  onUpdateEmployee: (id: number, formData: UpdateEmployeeDto) => Promise<Employee>;
  onClose: () => void;
  isSubmitting: boolean;
  seletedEmployee: Employee | null;
  isEdit: boolean;
};

const initialValues: EmployeeFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  secondLastName: '',
  employeeCountry: undefined,
  documentType: undefined,
  documentNumber: '',
  hireDate: '',
  department: undefined,
};

const EmployeesForm = ({
  onCreateEmployee,
  onUpdateEmployee,
  onClose,
  isSubmitting,
  seletedEmployee,
  isEdit,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (isEdit)
      reset({
        ...seletedEmployee,
        hireDate: formatDateForInput(seletedEmployee!.hireDate),
        middleName: seletedEmployee?.middleName || undefined,
      });
  }, [isEdit, seletedEmployee, reset]);

  const onSubmit = async (formData: EmployeeFormData) => {
    const submitData = EmployeeSubmitSchema.parse(formData);
    const partialData: Record<string, unknown> = {};

    if (isEdit) {
      for (const element of Object.keys(dirtyFields) as (keyof UpdateEmployeeDto)[]) {
        partialData[element] = formData[element];
      }
      try {
        await onUpdateEmployee(seletedEmployee!.id, partialData);
        notify.success('updated Successfully!');
        reset({
          ...seletedEmployee,
          hireDate: formatDateForInput(seletedEmployee!.hireDate),
          ...partialData,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notify.error(error.response?.data.error);
        }
      }
    } else {
      try {
        await onCreateEmployee(submitData);
        notify.success('Saved Successfully!');
        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notify.error(error.response?.data.error);
        }
      }
    }
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastName" className="block mb-2.5 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName')}
            type="text"
            placeholder="Type Last Name"
            className="w-full px-3 py-2.5
         text-sm text-gray-800
         placeholder:text-gray-400
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="secondLastName"
            className="block mb-2.5 text-sm font-medium text-gray-700"
          >
            Second Last Name
          </label>
          <input
            {...register('secondLastName')}
            type="text"
            placeholder=" Type Second Last Name"
            className="w-full px-3 py-2.5
         text-sm text-gray-800
         placeholder:text-gray-400
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.secondLastName && (
            <p className="mt-1 text-xs text-red-600">{errors.secondLastName.message}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="firstName" className="block mb-2.5 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            placeholder=" Type First Name"
            className="w-full px-3 py-2.5
         text-sm text-gray-800
         placeholder:text-gray-400
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="middleName" className="block mb-2.5 text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            {...register('middleName')}
            type="text"
            placeholder="Type Middle Name"
            className="w-full px-3 py-2.5
         text-sm text-gray-800
         placeholder:text-gray-400
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.middleName && (
            <p className="mt-1 text-xs text-red-600">{errors.middleName.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="country" className="block mb-2.5 text-sm font-medium text-gray-700">
            Employee Country
          </label>
          <select
            {...register('employeeCountry', {
              setValueAs: (value) => (value === '' ? undefined : value),
            })}
            className="w-full col-span-2 px-3 py-2.5
         text-sm text-gray-800
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          >
            <option value="">Select Country</option>
            {EMPLOYEE_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.employeeCountry && (
            <p className="mt-1 text-xs text-red-600">{errors.employeeCountry.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="documentType" className="block mb-2.5 text-sm font-medium text-gray-700">
            Document Type
          </label>
          <select
            {...register('documentType', {
              setValueAs: (value) => (value === '' ? undefined : value),
            })}
            className="w-full col-span-2 px-3 py-2.5
         text-sm text-gray-800
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          >
            <option value="">Select Doucment Type</option>
            {DOCUMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.documentType && (
            <p className="mt-1 text-xs text-red-600">{errors.documentType.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="documentNumber"
            className="block mb-2.5 text-sm font-medium text-gray-700"
          >
            Document Number
          </label>
          <input
            {...register('documentNumber')}
            type="text"
            placeholder="Type Document Number"
            className="w-full col-span-2 px-3 py-2.5
         text-sm text-gray-800
         placeholder:text-gray-400
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.documentNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.documentNumber.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="hireDate" className="block mb-2.5 text-sm font-medium text-gray-700">
            Hire Date
          </label>
          <input
            {...register('hireDate')}
            type="date"
            className="w-full col-span-2 px-3 py-2.5
         text-sm text-gray-800
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
          {errors.hireDate && (
            <p className="mt-1 text-xs text-red-600">{errors.hireDate.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="department" className="block mb-2.5 text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            {...register('department', {
              setValueAs: (value) => (value === '' ? undefined : value),
            })}
            className="w-full col-span-2 px-3 py-2.5
         text-sm text-gray-800
         border border-gray-300
         rounded-lg
         shadow-sm
         focus:outline-none
         focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-600">{errors.department.message}</p>
          )}
        </div>

        <div className="col-span-2 flex justify-start gap-4 py-4">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEdit ? 'Update' : 'Register'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeesForm;
