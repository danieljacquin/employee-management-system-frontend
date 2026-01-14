import { useMutation, useQueryClient } from '@tanstack/react-query';

import { create, drop, update } from '../services/employee.service';

import type { UpdateEmployeeDto } from '../types/employee.types';

export const useEmployeeMutation = () => {
  const queryClient = useQueryClient();

  const CreateMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const UpdateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: UpdateEmployeeDto }) =>
      update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const DeleteMutation = useMutation({
    mutationFn: drop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    CreateMutation,
    UpdateMutation,
    DeleteMutation,
  };
};
