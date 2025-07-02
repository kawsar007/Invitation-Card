import { Contact, ContactsResponseObject } from '@/types/sendContact';
import { getAuthToken } from '@/utils/auth';
import { useCallback, useState } from 'react';


export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getAuthToken();

  const fetchContactsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const result: ContactsResponseObject = await response.json();
      setContacts(result.contacts);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createContact = useCallback(async (payload: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create contact');
      }

      await fetchContactsList();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create contact'
      };
    } finally {
      setLoading(false);
    }
  }, [token, fetchContactsList]);

  return {
    contacts,
    loading,
    error,
    fetchContactsList,
    createContact
  };
};