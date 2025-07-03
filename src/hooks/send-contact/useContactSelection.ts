import { Contact } from '@/types/sendContact';
import { useCallback, useMemo, useState } from 'react';

export const useContactSelection = (contacts: Contact[]) => {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(checked ? contacts.map(c => c.id) : []);
  };

  const handleSelectContact = useCallback((id: number, checked: boolean) => {
    setSelectedContacts(prev =>
      checked ? [...prev, id] : prev.filter(contactId => contactId !== id)
    );
  }, []);

  const selectionState = useMemo(() => ({
    isAllSelected: selectedContacts.length === contacts.length,
    isIndeterminate: selectedContacts.length > 0 && selectedContacts.length < contacts.length,
    selectedCount: selectedContacts.length
  }), [selectedContacts.length, contacts.length]);

  const clearSelection = useCallback(() => {
    setSelectedContacts([]);
  }, []);

  return {
    selectedContacts,
    handleSelectAll,
    handleSelectContact,
    clearSelection,
    ...selectionState
  };
};