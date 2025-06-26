import { FilterState } from "@/types/event";
import { useCallback, useEffect, useState } from "react";

const defaultFilters: FilterState = {
  searchQuery: '',
  startDate: '',
  endDate: '',
  locationType: '',
  page: 1,
  limit: 10
};

export const useUrlState = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Initialize from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setFilters({
      searchQuery: urlParams.get('search') || '',
      startDate: urlParams.get('startDate') || '',
      endDate: urlParams.get('endDate') || '',
      locationType: urlParams.get('locationType') || '',
      page: parseInt(urlParams.get('page') || '1', 10),
      limit: parseInt(urlParams.get('limit') || '10', 10)
    });
  }, []);

  // Update URL when filters change
  const updateUrl = useCallback((newFilters: Partial<FilterState>) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== defaultFilters[key as keyof FilterState]) {
        params.set(key === 'searchQuery' ? 'search' : key, value.toString());
      } else {
        params.delete(key === 'searchQuery' ? 'search' : key);
      }
    });

    window.history.replaceState({}, '', url.toString());

  }, [])

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    updateUrl(newFilters);
  }, [updateUrl]);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters
  };
};