import { useState } from 'react';

import DeleteConfirmation from '@/shared/components/ui/DeleteConfirmation';
import Modal from '@/shared/components/ui/Modal';
import { notify } from '@/shared/utils/toast';

import EmployeesForm from '../components/EmployeesForm';
import EmployeesTable from '../components/EmployeesTable';
import { useEmployeeMutation } from '../hooks/employee.mutations';
import { useEmployeesQuery } from '../hooks/employee.queries';

import type { CreateEmployeeDto, Employee, UpdateEmployeeDto } from '../types/employee.types';

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const isEdit = selectedEmployee !== null ? true : false;
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const {
    data,
    error,
    isLoading,
    goToPreviousPage,
    goToNextPage,
    page,
    debouncedUpdateFilters,
    updateFilters,
  } = useEmployeesQuery();

  const { CreateMutation, UpdateMutation, DeleteMutation } = useEmployeeMutation();

  const createEmployee = async (formData: CreateEmployeeDto) => {
    return CreateMutation.mutateAsync(formData);
  };

  const updateEmployee = (id: number, formData: UpdateEmployeeDto) => {
    return UpdateMutation.mutateAsync({ id, formData });
  };

  const deleteEmployee = () => {
    return DeleteMutation.mutate(selectedEmployeeId!, {
      onSuccess: () => {
        notify.success('Deleted Successfully');
        handleCloseModalDelete();
      },
      onError: () => {
        notify.error('Error Deleting');
      },
    });
  };

  const handleSelectedEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setOpen(true);
  };

  const handleSelectedEmployeeId = (id: number) => {
    setOpenDelete(true);
    setSelectedEmployeeId(id);
  };

  const handleCloseMOdal = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading employees.</div>;
  }
  return (
    <div>
      <EmployeesTable
        employees={data?.items ?? []}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
        page={page}
        meta={data?.meta}
        onDebouncedFilterChange={debouncedUpdateFilters}
        onFilterChange={updateFilters}
        onOpenModal={() => setOpen(true)}
        onSelectedEmployee={handleSelectedEmployee}
        onSelectedEmployeeId={handleSelectedEmployeeId}
      />
      <Modal
        isOpen={open}
        onClose={handleCloseMOdal}
        title={isEdit ? 'Update Employee' : 'Create new Employee'}
        size="md"
      >
        <EmployeesForm
          onCreateEmployee={createEmployee}
          onUpdateEmployee={updateEmployee}
          onClose={handleCloseMOdal}
          isSubmitting={CreateMutation.isPending}
          seletedEmployee={selectedEmployee}
          isEdit={isEdit}
        />
      </Modal>
      <Modal isOpen={openDelete} onClose={handleCloseModalDelete} size="sm">
        <DeleteConfirmation onClose={handleCloseModalDelete} onDelete={deleteEmployee} />
      </Modal>
    </div>
  );
};

export default Employees;
