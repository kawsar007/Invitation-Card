import { ContactFormData, TiedContact } from '@/types/sendContact';
import { useCallback, useEffect, useState } from 'react';

interface UseContactFormProps {
  contactType: 'individual' | 'couple';
  groupSize: number;
}

export const useContactForm = ({ contactType, groupSize }: UseContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  const [tiedContacts, setTiedContacts] = useState<TiedContact[]>([
    { first_name: '', last_name: '', email: '', phone: '' },
    { first_name: '', last_name: '', email: '', phone: '' }
  ]);

  const [coupleGreeting, setCoupleGreeting] = useState('');
  const [plusOneCount, setPlusOneCount] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Update tied contacts when group size changes
  useEffect(() => {
    if (contactType === 'couple') {
      const newTiedContacts = Array.from({ length: groupSize }, (_, index) =>
        tiedContacts[index] || { first_name: '', last_name: '', email: '', phone: '' }
      );
      setTiedContacts(newTiedContacts);
    }
  }, [contactType, groupSize, tiedContacts]);

  const handleFormDataChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTiedContactChange = useCallback((index: number, field: keyof TiedContact, value: string) => {
    setTiedContacts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ first_name: '', last_name: '', email: '', phone: '' });
    setTiedContacts([
      { first_name: '', last_name: '', email: '', phone: '' },
      { first_name: '', last_name: '', email: '', phone: '' }
    ]);
    setCoupleGreeting('');
    setTags([]);
    setNewTag('');
    setPlusOneCount(5);
  }, []);

  return {
    formData,
    tiedContacts,
    coupleGreeting,
    plusOneCount,
    tags,
    newTag,
    handleFormDataChange,
    handleTiedContactChange,
    handleAddTag,
    handleRemoveTag,
    resetForm,
    setCoupleGreeting,
    setPlusOneCount,
    setNewTag
  };
};