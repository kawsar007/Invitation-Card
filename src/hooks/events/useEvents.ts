import { Event, EventApiResponse, FilterState } from "@/types/event";
import { getAuthToken } from "@/utils/auth";
import { useCallback, useState } from "react";


export const useEvents = () => {
  // State management
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const fetchEvents = useCallback(async (filters: Partial<FilterState>) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.append('search', filters.searchQuery);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.locationType) params.append('locationType', filters.locationType);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const token = getAuthToken();
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data: EventApiResponse = await response.json();

      if (data.success) {
        setEvents(data.data);
        setTotalPages(data.meta.pages);
        setTotalEvents(data.meta.total);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (eventId: string) => {
    setDeletingEventId(eventId);
    setError(null);

    try {
      const token = getAuthToken();
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 404) {
          throw new Error('Event not found');
        } else if (response.status === 403) {
          throw new Error('You do not have permission to delete this event');
        } else if (response.status === 401) {
          throw new Error('Authentication required');
        } else {
          throw new Error(`Failed to delete event: ${response.status} ${response.statusText}`);
        }
      }

      // Check if response has content
      let responseData = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      }

      if (responseData?.success) {
        setEvents(prevEvents => prevEvents.filter(event => event.id.toString() !== eventId));
      } else {
        throw new Error(responseData?.message || 'Failed to delete event');
      }

      // Update total count
      setTotalEvents(prevTotal => Math.max(0, prevTotal - 1));

      return {
        success: true,
        message: responseData?.message || 'Event deleted successfully'
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete event';
      setError(errorMessage);
      console.error('Error deleting event:', err);

      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setDeletingEventId(null);
    }
  }, []);

  // Helper function to check if a specific event is being deleted
  const isEventDeleting = useCallback((eventId: string) => {
    return deletingEventId === eventId;
  }, [deletingEventId]);

  // Reset error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    totalPages,
    totalEvents,
    deletingEventId,

    // Actions
    fetchEvents,
    deleteEvent,
    isEventDeleting,
    clearError
  };

}