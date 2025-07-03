import { Contact, ContactFormData, ContactsResponseObject, TiedContact } from '@/types/sendContact';
import { getAuthToken } from '@/utils/auth';
import { useCallback, useState } from 'react';

interface ContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  has_tied_contact: boolean;
  tied_contacts?: TiedContact[];
  tags?: string[];
}

interface UseContactsReturn {
  // State
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  isSubmitting: boolean;

  // Actions
  fetchContacts: () => Promise<void>;
  createContact: (payload: ContactPayload) => Promise<boolean>;
  deleteContact: (contactId: number) => Promise<boolean>;
  deleteMultipleContacts: (contactIds: number[]) => Promise<boolean>;
  updateContact: (contactId: number, payload: Partial<ContactPayload>) => Promise<boolean>;

  // Utility functions
  validateContactData: (contactType: 'individual' | 'couple', formData: ContactFormData, tiedContacts: TiedContact[]) => { isValid: boolean; error?: string };
  buildContactPayload: (contactType: 'individual' | 'couple', formData: ContactFormData, tiedContacts: TiedContact[], tags: string[]) => ContactPayload;

  // Reset functions
  clearError: () => void;
  refreshContacts: () => Promise<void>;
}

export const useContacts = (): UseContactsReturn => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = getAuthToken();

  const fetchContacts = useCallback(async () => {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ContactsResponseObject = await response.json();
      setContacts(result.contacts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch contacts';
      setError(errorMessage);
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createContact = useCallback(async (payload: ContactPayload): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

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

      // Refresh contacts list after successful creation
      await fetchContacts();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create contact';
      setError(errorMessage);
      console.error('Error creating contact:', err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [token, fetchContacts]);

  const deleteContact = useCallback(async (contactId: number): Promise<boolean> => {
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete contact');
      }

      // Remove contact from local state
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete contact';
      setError(errorMessage);
      console.error('Error deleting contact:', err);
      return false;
    }
  }, [token]);

  const deleteMultipleContacts = useCallback(async (contactIds: number[]): Promise<boolean> => {
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/batch-delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contact_ids: contactIds })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete contacts');
      }

      // Remove contacts from local state
      setContacts(prev => prev.filter(contact => !contactIds.includes(contact.id)));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete contacts';
      setError(errorMessage);
      console.error('Error deleting multiple contacts:', err);
      return false;
    }
  }, [token]);

  const updateContact = useCallback(async (contactId: number, payload: Partial<ContactPayload>): Promise<boolean> => {
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contact');
      }

      // Refresh contacts list after successful update
      await fetchContacts();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update contact';
      setError(errorMessage);
      console.error('Error updating contact:', err);
      return false;
    }
  }, [token, fetchContacts]);

  const validateContactData = useCallback((
    contactType: 'individual' | 'couple',
    formData: ContactFormData,
    tiedContacts: TiedContact[]
  ): { isValid: boolean; error?: string } => {
    if (contactType === 'individual') {
      if (!formData.first_name.trim()) {
        return { isValid: false, error: 'First name is required' };
      }
      if (!formData.email.trim()) {
        return { isValid: false, error: 'Email is required' };
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
    } else {
      const validTiedContacts = tiedContacts.filter(contact =>
        contact.first_name.trim() && contact.email.trim()
      );

      if (validTiedContacts.length === 0) {
        return { isValid: false, error: 'At least one contact with first name and email is required' };
      }

      // Validate emails for tied contacts
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      for (const contact of validTiedContacts) {
        if (!emailRegex.test(contact.email.trim())) {
          return { isValid: false, error: `Please enter a valid email address for ${contact.first_name}` };
        }
      }
    }

    return { isValid: true };
  }, []);

  const buildContactPayload = useCallback((
    contactType: 'individual' | 'couple',
    formData: ContactFormData,
    tiedContacts: TiedContact[],
    tags: string[]
  ): ContactPayload => {
    if (contactType === 'individual') {
      return {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        has_tied_contact: false,
        tags: tags.length > 0 ? tags : undefined
      };
    } else {
      const validTiedContacts = tiedContacts.filter(contact =>
        contact.first_name.trim() && contact.email.trim()
      );

      const mainContact = validTiedContacts[0];
      const otherContacts = validTiedContacts.slice(1);

      return {
        first_name: mainContact.first_name.trim(),
        last_name: mainContact.last_name.trim(),
        email: mainContact.email.trim(),
        phone: mainContact.phone.trim(),
        has_tied_contact: otherContacts.length > 0,
        tied_contacts: otherContacts.length > 0 ? otherContacts.map(contact => ({
          first_name: contact.first_name.trim(),
          last_name: contact.last_name.trim(),
          email: contact.email.trim(),
          phone: contact.phone.trim()
        })) : undefined,
        tags: tags.length > 0 ? tags : undefined
      };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshContacts = useCallback(async () => {
    await fetchContacts();
  }, [fetchContacts]);

  return {
    // State
    contacts,
    loading,
    error,
    isSubmitting,

    // Actions
    fetchContacts,
    createContact,
    deleteContact,
    deleteMultipleContacts,
    updateContact,

    // Utility functions
    validateContactData,
    buildContactPayload,

    // Reset functions
    clearError,
    refreshContacts
  };
};