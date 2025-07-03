import { ContactHeader } from '@/components/send-ui/contact/ContactHeader';
import { ContactTable } from '@/components/send-ui/contact/ContactTable';
import { ContactTabs } from '@/components/send-ui/contact/ContactTabs';
import { ContactFormModal } from '@/components/send-ui/modals/create-contact';
import SelectContactModal from '@/components/send-ui/modals/SelectContactModal';
import { useContactFilters } from '@/hooks/send-contact/useContactFilters';
import { useContactForm } from '@/hooks/send-contact/useContactForm';
import { useContacts } from '@/hooks/send-contact/useContacts';
import { useContactSelection } from '@/hooks/send-contact/useContactSelection';
import { useDropdown } from '@/hooks/send-contact/useDropdown';
import { useErrorHandler } from '@/hooks/send-contact/useErrorHandler';
import React, { useEffect, useState } from 'react';

const SendContactTable: React.FC = () => {
  // Core contact data and operations
  const {
    contacts,
    loading,
    error,
    isSubmitting,
    fetchContacts,
    createContact,
    deleteContact,
    deleteMultipleContacts,
    validateContactData,
    buildContactPayload,
    clearError
  } = useContacts();

  // UI state
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [contactType, setContactType] = useState<'individual' | 'couple'>('individual');
  const [groupSize, setGroupSize] = useState(2);

  // Custom hooks for specific functionality
  const { activeTab, setActiveTab, searchTerm, setSearchTerm, filteredContacts, tabs } =
    useContactFilters(contacts);

  const { selectedContacts, handleSelectAll, handleSelectContact, clearSelection, isAllSelected, isIndeterminate, selectedCount } =
    useContactSelection(contacts);

  const { openDropdown, setOpenDropdown, dropdownRef } = useDropdown();

  const {
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
    setNewTag } = useContactForm({ contactType, groupSize });

  // Error handling
  useErrorHandler(error, clearError);

  // Initialize contacts
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Menu actions handler
  const handleMenuAction = async (action: string, contactId: number) => {
    setOpenDropdown(null);

    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this contact?')) {
        await deleteContact(contactId);
      }
    } else {
      console.log(`${action} for contact ${contactId}`);
    }
  };

  // Submit contact handler
  const handleSubmitContact = async (saveAndAddAnother: boolean = false) => {
    const validation = validateContactData(contactType, formData, tiedContacts);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const payload = buildContactPayload(contactType, formData, tiedContacts, tags);
    const success = await createContact(payload);

    if (success) {
      if (saveAndAddAnother) {
        resetForm();
      } else {
        setShowNewContactModal(false);
        resetForm();
      }
    }
  };

  // Delete selected contacts
  const handleDeleteSelected = async () => {
    if (selectedContacts.length === 0) return;

    const message = selectedContacts.length === 1
      ? 'Are you sure you want to delete this contact?'
      : `Are you sure you want to delete ${selectedContacts.length} contacts?`;

    if (window.confirm(message)) {
      const success = await deleteMultipleContacts(selectedContacts);
      if (success) {
        clearSelection();
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ContactHeader
        onAddContacts={() => setShowAddContactModal(true)}
        onDeleteSelected={handleDeleteSelected}
      />

      <ContactTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tabs={tabs}
      />

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading contacts...</div>
        </div>
      )}

      {!loading && (
        <ContactTable
          contacts={filteredContacts}
          selectedContacts={selectedContacts}
          onSelectAll={handleSelectAll}
          onSelectContact={handleSelectContact}
          onMenuAction={handleMenuAction}
          searchTerm={searchTerm}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
        />
      )}

      {showAddContactModal && (
        <SelectContactModal
          setShowAddContactModal={setShowAddContactModal}
          setShowNewContactModal={setShowNewContactModal}
        />
      )}

      <ContactFormModal
        isOpen={showNewContactModal}
        onClose={() => setShowNewContactModal(false)}
        contactType={contactType}
        setContactType={setContactType}
        groupSize={groupSize}
        setGroupSize={setGroupSize}
        formData={formData}
        tiedContacts={tiedContacts}
        coupleGreeting={coupleGreeting}
        setCoupleGreeting={setCoupleGreeting}
        plusOneCount={plusOneCount}
        setPlusOneCount={setPlusOneCount}
        tags={tags}
        newTag={newTag}
        setNewTag={setNewTag}
        onFormDataChange={handleFormDataChange}
        onTiedContactChange={handleTiedContactChange}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onSubmit={handleSubmitContact}
        onReset={resetForm}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SendContactTable;