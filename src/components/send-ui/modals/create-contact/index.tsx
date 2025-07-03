import { ContactFormData, TiedContact } from '@/types/sendContact';
import React from 'react';
import { ContactTypeSelector } from './ContactTypeSelector';
import { CoupleContactForm } from './CoupleContactForm';
import { IndividualContactForm } from './IndividualContactForm';
import { ModalActions } from './ModalActions';
import { ModalHeader } from './ModalHeader';
import { PlusOneSelector } from './PlusOneSelector';
import { TagsSection } from './TagsSection';


interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactType: 'individual' | 'couple';
  setContactType: (type: 'individual' | 'couple') => void;
  groupSize: number;
  setGroupSize: (size: number) => void;
  formData: ContactFormData;
  tiedContacts: TiedContact[];
  coupleGreeting: string;
  setCoupleGreeting: (greeting: string) => void;
  plusOneCount: number;
  setPlusOneCount: (count: number) => void;
  tags: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  onFormDataChange: (field: keyof ContactFormData, value: string) => void;
  onTiedContactChange: (index: number, field: keyof TiedContact, value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSubmit: (saveAndAddAnother: boolean) => void;
  onReset: () => void;
  isSubmitting: boolean;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  contactType,
  setContactType,
  groupSize,
  setGroupSize,
  formData,
  tiedContacts,
  coupleGreeting,
  setCoupleGreeting,
  plusOneCount,
  setPlusOneCount,
  tags,
  newTag,
  setNewTag,
  onFormDataChange,
  onTiedContactChange,
  onAddTag,
  onRemoveTag,
  onSubmit,
  onReset,
  isSubmitting
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    onReset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <ModalHeader onClose={handleClose} />

        <ContactTypeSelector
          contactType={contactType}
          setContactType={setContactType}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
        />

        {contactType === 'couple' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couple/Family Greeting
            </label>
            <textarea
              rows={3}
              value={coupleGreeting}
              onChange={(e) => setCoupleGreeting(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter greeting message for the couple/family..."
            />
          </div>
        )}

        {contactType === 'individual' ? (
          <IndividualContactForm
            formData={formData}
            onChange={onFormDataChange}
          />
        ) : (
          <CoupleContactForm
            tiedContacts={tiedContacts}
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            onChange={onTiedContactChange}
          />
        )}

        <PlusOneSelector
          plusOneCount={plusOneCount}
          setPlusOneCount={setPlusOneCount}
        />

        <TagsSection
          tags={tags}
          newTag={newTag}
          setNewTag={setNewTag}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />

        <ModalActions
          onClose={handleClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};