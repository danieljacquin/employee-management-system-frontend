import { keepPreviousData, useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import { toDomainFilters } from '@/shared/utils/employeeFilters';

import { getAll } from '../services/employee.service';

import type { EmployeeFormFilters } from '../types/employee.types';

export const useEmployeesQuery = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<EmployeeFormFilters>({
    firstName: '',
    lastName: '',
    email: '',
    employeeCountry: '',
  });

  const DomainFilters = useMemo(() => {
    return toDomainFilters(filters);
  }, [filters]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['employees', { page, ...DomainFilters }],
    queryFn: ({ signal }) => getAll(page, DomainFilters, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
  });

  const goToPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const updateFilters = (filter: Partial<EmployeeFormFilters>) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const debouncedUpdateFilters = useMemo(() => {
    return debounce(updateFilters, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedUpdateFilters.cancel();
    };
  }, [debouncedUpdateFilters]);

  return {
    data,
    error,
    isLoading,
    page,
    goToPreviousPage,
    goToNextPage,
    debouncedUpdateFilters,
    updateFilters,
  };
};
