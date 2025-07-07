import { Contact, ContactFormData, TiedContact } from '@/types/sendContact';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseContactFormProps {
  contactType: 'individual' | 'couple';
  groupSize: number;
  editingContact?: Contact | null; // Contact to edit (null for create mode)
  onUpdateComplete?: () => void; // Callback when update is complete
}

export const useContactForm = ({ contactType, groupSize, editingContact = null,
  onUpdateComplete }: UseContactFormProps) => {
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
  const [isEditMode, setIsEditMode] = useState(false);

  // Use ref to track previous values and prevent unnecessary updates
  const prevContactTypeRef = useRef(contactType);
  const prevGroupSizeRef = useRef(groupSize);

  // Initialize form with editing contact data
  useEffect(() => {
    if (editingContact) {
      setIsEditMode(true);
      setFormData({
        first_name: editingContact.first_name || '',
        last_name: editingContact.last_name || '',
        email: editingContact.email || '',
        phone: editingContact.phone || ''
      });

      // If editing contact has tied contacts, populate them
      if (editingContact.tied_contacts && editingContact.tied_contacts.length > 0) {
        setTiedContacts(editingContact.tied_contacts);
      }

      setCoupleGreeting(editingContact.couple_greeting || '');
      setPlusOneCount(editingContact.plus_one_count || 5);
      setTags(editingContact.tags || []);
    } else {
      setIsEditMode(false);
      resetForm();
    }
  }, [editingContact]);

  // Update tied contacts when contact type or group size changes
  // Remove tiedContacts from dependencies to prevent circular updates
  useEffect(() => {
    const contactTypeChanged = prevContactTypeRef.current !== contactType;
    const groupSizeChanged = prevGroupSizeRef.current !== groupSize;

    if (contactType === 'couple' && (contactTypeChanged || groupSizeChanged)) {
      setTiedContacts(prevTiedContacts => {
        const newTiedContacts = Array.from({ length: groupSize }, (_, index) =>
          prevTiedContacts[index] || { first_name: '', last_name: '', email: '', phone: '' }
        );
        return newTiedContacts;
      });
    }

    // Update refs after processing
    prevContactTypeRef.current = contactType;
    prevGroupSizeRef.current = groupSize;
  }, [contactType, groupSize]); // Removed tiedContacts from dependencies

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

  // Get complete contact data for submission
  const getContactData = useCallback(() => {
    const baseData = {
      ...formData,
      contactType: contactType,
      plus_one_count: plusOneCount,
      tags,
      ...(contactType === 'couple' && {
        tied_contacts: tiedContacts.filter(contact => contact.first_name.trim() || contact.last_name.trim() ||
          contact.email.trim() || contact.phone.trim()
        ),
        couple_greeting: coupleGreeting,
        group_size: groupSize
      })
    };

    if (isEditMode && editingContact) {
      return { ...baseData, id: editingContact.id };
    }
    return baseData;
  }, [contactType, coupleGreeting, editingContact, formData, groupSize, isEditMode, plusOneCount, tags, tiedContacts])

  // Exit edit mode
  const exitEditMode = useCallback(() => {
    setIsEditMode(false);
    resetForm();

    if (onUpdateComplete) {
      onUpdateComplete()
    }
  }, [onUpdateComplete, resetForm]);

  // Check if form has been modified (useful for showing unsaved changes warning)
  const isFormModified = useCallback(() => {
    if (!editingContact) return false;

    const currentData = getContactData();
    return (
      currentData.first_name !== editingContact.first_name ||
      currentData.last_name !== editingContact.last_name ||
      currentData.email !== editingContact.email ||
      currentData.phone !== editingContact.phone ||
      currentData.plus_one_count !== editingContact.plus_one_count ||
      JSON.stringify(currentData.tags) !== JSON.stringify(editingContact.tags) ||
      currentData.couple_greeting !== editingContact.couple_greeting
    );
  }, [getContactData, editingContact]);

  return {
    formData,
    tiedContacts,
    coupleGreeting,
    plusOneCount,
    tags,
    newTag,

    isEditMode,
    editingContact,

    handleFormDataChange,
    handleTiedContactChange,
    handleAddTag,
    handleRemoveTag,
    resetForm,
    setCoupleGreeting,
    setPlusOneCount,
    setNewTag,

    getContactData,
    exitEditMode,
    isFormModified
  };
};