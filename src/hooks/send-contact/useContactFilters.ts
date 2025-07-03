import { useMemo, useState } from 'react';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export const useContactFilters = (contacts) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Unsent' | 'Unopened' | 'Opened'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [contacts, searchTerm]);

  const tabs = useMemo(() => [
    { key: 'All', label: 'All', count: contacts.length },
    { key: 'Unsent', label: 'Unsent', count: 2 },
    { key: 'Unopened', label: 'Unopened', count: 0 },
    { key: 'Opened', label: 'Opened', count: 0 }
  ], [contacts.length]);

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    filteredContacts,
    tabs
  };
};