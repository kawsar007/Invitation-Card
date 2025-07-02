import { ContactFormData, ContactType, TiedContact } from '@/types/sendContact';
import { useState } from 'react';

const initialFormData: ContactFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: ''
};

const initialTiedContacts: TiedContact[] = [
  { first_name: '', last_name: '', email: '', phone: '' },
  { first_name: '', last_name: '', email: '', phone: '' }
];

export const useContactForm = () => {
  const [contactType, setContactType] = useState<ContactType>('individual');
  const [groupSize, setGroupSize] = useState(2);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [tiedContacts, setTiedContacts] = useState<TiedContact[]>(initialTiedContacts);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coupleGreeting, setCoupleGreeting] = useState('');
  const [plusOneCount, setPlusOneCount] = useState(5);

  const handleFormDataChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTiedContactChange = (index: number, field: keyof TiedContact, value: string) => {
    setTiedContacts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    })
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }

  const resetForm = () => {
    setFormData(initialFormData);
    setTiedContacts(initialTiedContacts);
    setCoupleGreeting('');
    setTags([]);
    setNewTag('');
    setContactType('individual');
    setGroupSize(2);
    setPlusOneCount(5);
  }

  const validateForm = (): string | null => {
    if (contactType === 'individual') {
      if (!formData.first_name.trim() || !formData.email.trim()) {
        return 'First name and email are required';
      }
    } else {
      const validTiedContacts = tiedContacts.filter(contact =>
        contact.first_name.trim() && contact.email.trim()
      )

      if (validTiedContacts.length === 0) {
        return 'At least one contact with first name and email is required';
      }
    }
    return null;
  }

  const buildPayload = () => {
    if (contactType === 'individual') {
      return {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        has_tied_contact: false,
        tags: tags.length > 0 ? tags : undefined
      }
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
      }

    }
  };

  return {
    contactType,
    setContactType,
    groupSize,
    setGroupSize,
    formData,
    tiedContacts,
    setTiedContacts,
    tags,
    newTag,
    setNewTag,
    coupleGreeting,
    setCoupleGreeting,
    plusOneCount,
    setPlusOneCount,
    handleFormDataChange,
    handleTiedContactChange,
    handleAddTag,
    handleRemoveTag,
    resetForm,
    validateForm,
    buildPayload
  };
}