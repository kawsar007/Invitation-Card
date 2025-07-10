import { Event } from '@/types/event';
import { getAuthToken } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define TypeScript interfaces for type safety
// interface EventData {
//   name: string;
//   date: string;
//   eventLocation: string;
//   location_type: string;
//   virtual_link?: string;
//   venue_address?: string;
//   // Add other event properties as needed
// }

interface EventResponseObject {
  success: boolean;
  data?: Event;
  message?: string;
}

interface EventDetailsHook {
  event: Event | null;
  loading: boolean;
  error: string | null;
}

const useEventDetails = (eventId: string | undefined): EventDetailsHook => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    // Only fetch if eventId is provided
    if (!eventId) {
      setEvent(null);
      setError('No event ID provided');
      return;
    }

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken(); // Assuming getAuthToken is defined elsewhere
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const result: EventResponseObject = await response.json();

        if (result.success && result.data) {
          setEvent(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch event');
        }
      } catch (err) {
        const errorMessage = err.message || 'Failed to fetch event';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]); // Re-run when eventId changes

  return { event, loading, error };
};

export default useEventDetails;