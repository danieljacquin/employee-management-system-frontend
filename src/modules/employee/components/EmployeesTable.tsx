import { useState } from 'react';

import { formatDate } from '@/shared/utils/formatDate';

import {
  EMPLOYEE_COUNTRIES,
  type Employee,
  type EmployeeCountry,
  type EmployeeFormFilters,
} from '../types/employee.types';

type EmployeesTableProps = {
  employees: Employee[];
  onPrev: () => void;
  onNext: () => void;
  page: number;
  meta?: { page: number; total: number; limit: number } | undefined;
  onDebouncedFilterChange: (filters: Partial<EmployeeFormFilters>) => void;
  onFilterChange: (filters: Partial<EmployeeFormFilters>) => void;
  onOpenModal: () => void;
  onSelectedEmployee: (emp: Employee) => void;
  onSelectedEmployeeId: (id: number) => void;
};

const columns = [
  'Id',
  'First Name',
  'Middle Name',
  'Last Name',
  'Second LastName',
  'Email',
  'Document Type',
  'Document Number',
  'Department',
  'Employee Country',
  'Status',
  'Hire Date',
  'Created At',
  'Updated At',
];

const EmployeesTable = ({
  employees,
  onPrev,
  onNext,
  page,
  meta,
  onDebouncedFilterChange,
  onFilterChange,
  onOpenModal,
  onSelectedEmployee,
  onSelectedEmployeeId,
}: EmployeesTableProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const isFirstPage = page === 1;
  const isLastPage = meta ? page === Math.ceil(meta.total / meta.limit) : false;
  const handleUpdate = (emp: Employee) => {
    onSelectedEmployee(emp);
  };

  const handleDelete = (emp: Employee) => {
    onSelectedEmployeeId(emp.id);
  };
  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4 px-5">
        <h2 className="text-lg font-semibold text-gray-800">Employees List</h2>

        <div className="space-x-2">
          <button
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onOpenModal}
          >
            Add New Employee
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="bg-gray-50 mx-5 p-4 rounded-md mb-4 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              className="border p-2 rounded border-gray-300"
              placeholder="First Name"
              onChange={(e) => onDebouncedFilterChange({ firstName: e.target.value })}
            />
            <input
              className="border p-2 rounded border-gray-300"
              placeholder="Last Name"
              onChange={(e) => onDebouncedFilterChange({ lastName: e.target.value })}
            />
            <input
              className="border p-2 rounded border-gray-300"
              placeholder="Email"
              onChange={(e) => onDebouncedFilterChange({ email: e.target.value })}
            />
            <select
              className="border p-2 rounded border-gray-300"
              onChange={(e) =>
                onFilterChange({ employeeCountry: e.target.value as EmployeeCountry | '' })
              }
            >
              <option value="">All Countries</option>
              {EMPLOYEE_COUNTRIES.map((emp_country) => (
                <option value={emp_country} key={emp_country}>
                  {emp_country}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="overflow-auto max-h-80">
        <table className="w-full m-5">
          <thead className="border-b border-gray-300 text-left whitespace-nowrap">
            <tr>
              {columns.map((column) => (
                <th
                  className="px-5 py-2 text-left text-sm font-semibold text-gray-700"
                  key={column}
                >
                  {column}
                </th>
              ))}
              <th className="px-5 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 whitespace-nowrap">
            {employees.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-gray-500 text-sm">No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr className="hover:bg-gray-50" key={emp.id}>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.firstName}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.middleName}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.lastName}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.secondLastName}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.email}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.documentType}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.documentNumber}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.department}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.employeeCountry}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{emp.status}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{formatDate(emp.hireDate)}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{formatDate(emp.createdAt)}</td>
                  <td className="px-5 py-3 text-sm text-gray-800">{formatDate(emp.updatedAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(emp)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-1 px-3 rounded transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 py-1 px-3 rounded transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          {meta && (
            <span className="text-sm text-gray-600">
              Showing {(page - 1) * meta.limit + 1} to {Math.min(page * meta.limit, meta.total)} of{' '}
              {meta.total} entries
            </span>
          )}
        </div>
        <div className="space-x-2">
          <button
            onClick={onPrev}
            disabled={isFirstPage}
            className="px-4 py-2 border rounded-md text-sm
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100"
          >
            ← Previous
          </button>

          <button
            onClick={onNext}
            disabled={isLastPage}
            className="px-4 py-2 border rounded-md text-sm
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
