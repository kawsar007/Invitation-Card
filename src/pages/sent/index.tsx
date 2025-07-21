import { ContactHeader } from '@/components/send-ui/contact/ContactHeader';
import { ContactTable } from '@/components/send-ui/contact/ContactTable';
import { ContactTabs } from '@/components/send-ui/contact/ContactTabs';
import { ContactFormModal } from '@/components/send-ui/modals/create-contact';
import DeleteContactModal from '@/components/send-ui/modals/DeleteContactModal';
import SelectContactModal from '@/components/send-ui/modals/SelectContactModal';
import { useCraftApi } from '@/context/CraftApiContext';
import { useUser } from '@/context/UserContext';
import { useContactFilters } from '@/hooks/send-contact/useContactFilters';
import { useContactForm } from '@/hooks/send-contact/useContactForm';
import { useContacts } from '@/hooks/send-contact/useContacts';
import { useContactSelection } from '@/hooks/send-contact/useContactSelection';
import { useDropdown } from '@/hooks/send-contact/useDropdown';
import { useErrorHandler } from '@/hooks/send-contact/useErrorHandler';
import { Contact, RSVPPayload, RSVPResponse } from '@/types/sendContact';
import { getAuthToken } from '@/utils/auth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

const SendContactTable: React.FC = () => {
  const { user } = useUser();
  const token = getAuthToken();
  // Craft API and User context
  const {
    invitations
  } = useCraftApi();
  const latest = invitations.reduce((max, item) =>
    new Date(item.created_at) > new Date(max.created_at) ? item : max
    , invitations[0]);

  // Core contact data and operations
  const {
    contacts,
    loading,
    error,
    isSubmitting,
    fetchContacts,
    createContact,
    updateContact, // Assuming this exists in your useContacts hook
    deleteContact,
    deleteMultipleContacts,
    validateContactData,
    buildContactPayload,
    clearError
  } = useContacts();

  // UI state for create/add modals
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [contactType, setContactType] = useState<'individual' | 'couple'>('individual');
  const [groupSize, setGroupSize] = useState(2);

  // UI state for update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [updateContactType, setUpdateContactType] = useState<'individual' | 'couple'>('individual');
  const [updateGroupSize, setUpdateGroupSize] = useState(2);

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // RSVP state
  const [isCreatingRSVP, setIsCreatingRSVP] = useState(false);
  const [rsvpUniqueIds, setRSVPUniqueIds] = useState<string>();


  // Custom hooks for specific functionality
  const { activeTab, setActiveTab, searchTerm, setSearchTerm, filteredContacts, tabs } =
    useContactFilters(contacts);

  const { selectedContacts, handleSelectAll, handleSelectContact, clearSelection, isAllSelected, isIndeterminate, selectedCount } =
    useContactSelection(contacts);

  const { openDropdown, setOpenDropdown, dropdownRef } = useDropdown();

  // Rsvp creation function
  const createRSVP = useCallback(async (contactId: number, allowCount: number, tags: string[]): Promise<string | null> => {
    try {
      setIsCreatingRSVP(true);

      //  Using dynamic values from the form
      const rsvpPayload: RSVPPayload = {
        contact_id: contactId,
        event_id: latest?.event_id,
        invitation_card_id: latest?.id,
        version: latest?.version,
        user_id: user?.id,
        allow_count: allowCount,
        allow: [],
        tags: tags
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rsvpPayload)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      };

      const data: RSVPResponse = await response.json();
      setRSVPUniqueIds(data.unique_id);
      toast.success(data?.message || 'RSVP created successfully');
      return data.unique_id;

    } catch (error) {
      console.error('Failed to create RSVP:', error);
      // You might want to show a toast notification or handle this error differently
      return null;
    } finally {
      setIsCreatingRSVP(false);
    }
  }, [latest?.event_id, latest?.id, latest?.version, token, user?.id]);

  // Memoize the update complete callback to prevent unnecessary re-renders
  const handleUpdateComplete = useCallback(() => {
    setShowUpdateModal(false);
    setEditingContact(null);
    setUpdateContactType('individual');
    setUpdateGroupSize(2);
  }, []);

  // Memoize form hook parameters to prevent unnecessary re-renders
  const createFormParams = useMemo(() => ({
    contactType,
    groupSize
  }), [contactType, groupSize]);

  const updateFormParams = useMemo(() => ({
    contactType: updateContactType,
    groupSize: updateGroupSize,
    editingContact,
    onUpdateComplete: handleUpdateComplete
  }), [updateContactType, updateGroupSize, editingContact, handleUpdateComplete]);

  // Create form hook
  const createFormHook = useContactForm(createFormParams);

  // Update form hook
  const updateFormHook = useContactForm(updateFormParams);

  // Error handling
  useErrorHandler(error, clearError);

  // Initialize contacts
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Initialize update form when editing contact changes
  useEffect(() => {
    if (editingContact) {
      setUpdateContactType(editingContact.contact_type || 'individual');
      setUpdateGroupSize(editingContact.group_size || 2);
    }
  }, [editingContact]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleMenuAction = useCallback(async (action: string, contactId: number) => {
    setOpenDropdown(null);

    if (action === 'delete') {
      // Find the contact to delete
      const contact = contacts.find(c => c.id === contactId);
      setContactToDelete(contact);
      setShowDeleteModal(true);
    } else if (action === 'update') {
      // Find the contact to update
      const contact = contacts.find(c => c.id === contactId);
      if (contact) {
        setEditingContact(contact);
        setShowUpdateModal(true);
      }
    } else {
      console.log(`${action} for contact ${contactId}`);
    }
  }, [contacts]);

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (contactToDelete) {
      setIsDeleting(true);
      const success = await deleteContact(contactToDelete.id);
      setIsDeleting(false);

      if (success) {
        setShowDeleteModal(false);
        setContactToDelete(null);
      }
    }
  }, [contactToDelete, deleteContact]);

  // Handle Bulk Actions
  const handleBulkAction = useCallback((action: string, contactIds: number[]) => {
    switch (action) {
      case 'edit':
        if (contactIds.length === 1) {
          // Edit single contact
          const contact = contacts.find(c => c.id === contactIds[0]);
          if (contact) {
            setEditingContact(contact);
            setShowUpdateModal(true);
          }
        } else {
          // Handle bulk edit (you can implement this later)
          alert('Bulk edit is not implemented yet. Please select only one contact to edit.');
        }
        break;
      case 'message':
        // Handle bulk message
        console.log('Message contacts:', contactIds);
        break;
      case 'delete':
        // Handle bulk delete
        if (contactIds.length > 0) {
          const message = contactIds.length === 1
            ? 'Are you sure you want to delete this contact?'
            : `Are you sure you want to delete ${contactIds.length} contacts?`;

          if (window.confirm(message)) {
            handleBulkDelete(contactIds);
          }
        }
        break;
    }
  }, [contacts]);

  // Handle bulk delete
  const handleBulkDelete = useCallback(async (contactIds: number[]) => {
    const success = await deleteMultipleContacts(contactIds);
    if (success) {
      clearSelection();
    }
  }, [deleteMultipleContacts, clearSelection]);

  // Submit contact handler (for creating)
  const handleSubmitContact = useCallback(async (saveAndAddAnother: boolean = false) => {
    const validation = validateContactData(contactType, createFormHook.formData, createFormHook.tiedContacts);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const payload = buildContactPayload(contactType, createFormHook.formData, createFormHook.tiedContacts, createFormHook.tags);
    const contactResult = await createContact(payload);

    if (contactResult && contactResult.success) {
      const newContactId = contactResult.contact?.id;

      if (newContactId) {
        const allowCount = createFormHook?.plusOneCount;
        const tags = createFormHook?.tags || [];

        const rsvpUniqueId = await createRSVP(newContactId, allowCount, tags)
        if (rsvpUniqueId) {
          toast.success("RSVP created successfully")
          console.log('RSVP created with unique ID:', rsvpUniqueId);
          // You can show a success notification here if needed
        } else {
          console.warn('Contact created but RSVP creation failed');
          toast.warning("Contact created but RSVP creation failed");
          // You might want to show a warning notification
        }
      }
      if (saveAndAddAnother) {
        createFormHook.resetForm();
      } else {
        setShowNewContactModal(false);
        createFormHook.resetForm();
      }
    }
  }, [validateContactData, contactType, createFormHook, buildContactPayload, createContact, createRSVP]);

  // Submit contact handler (for updating)
  const handleUpdateContact = useCallback(async () => {
    const validation = validateContactData(updateContactType, updateFormHook.formData, updateFormHook.tiedContacts);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const contactData = updateFormHook.getContactData();


    const success = await updateContact(contactData.id, contactData);

    if (success) {
      updateFormHook.exitEditMode();
    }
  }, [validateContactData, updateContactType, updateFormHook, updateContact]);

  // Delete selected contacts
  const handleDeleteSelected = useCallback(async () => {
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
  }, [selectedContacts, deleteMultipleContacts, clearSelection]);

  // Handle unsaved changes warning
  const handleCloseUpdateModal = useCallback(() => {
    if (updateFormHook.isFormModified()) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        updateFormHook.exitEditMode();
      }
    } else {
      updateFormHook.exitEditMode();
    }
  }, [updateFormHook]);

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
          onBulkAction={handleBulkAction}
          rsvpUniqueIds={rsvpUniqueIds}
        />
      )}

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <SelectContactModal
          setShowAddContactModal={setShowAddContactModal}
          setShowNewContactModal={setShowNewContactModal}
        />
      )}

      {/* Create Contact Modal */}
      <ContactFormModal
        isOpen={showNewContactModal}
        onClose={() => setShowNewContactModal(false)}
        contactType={contactType}
        setContactType={setContactType}
        groupSize={groupSize}
        setGroupSize={setGroupSize}
        formData={createFormHook.formData}
        tiedContacts={createFormHook.tiedContacts}
        coupleGreeting={createFormHook.coupleGreeting}
        setCoupleGreeting={createFormHook.setCoupleGreeting}
        plusOneCount={createFormHook.plusOneCount}
        setPlusOneCount={createFormHook.setPlusOneCount}
        tags={createFormHook.tags}
        newTag={createFormHook.newTag}
        setNewTag={createFormHook.setNewTag}
        onFormDataChange={createFormHook.handleFormDataChange}
        onTiedContactChange={createFormHook.handleTiedContactChange}
        onAddTag={createFormHook.handleAddTag}
        onRemoveTag={createFormHook.handleRemoveTag}
        onSubmit={handleSubmitContact}
        onReset={createFormHook.resetForm}
        isSubmitting={isSubmitting}
      />

      {/* Update Contact Modal */}
      <ContactFormModal
        isOpen={showUpdateModal}
        onClose={handleCloseUpdateModal}
        contactType={updateContactType}
        setContactType={setUpdateContactType}
        groupSize={updateGroupSize}
        setGroupSize={setUpdateGroupSize}
        formData={updateFormHook.formData}
        tiedContacts={updateFormHook.tiedContacts}
        coupleGreeting={updateFormHook.coupleGreeting}
        setCoupleGreeting={updateFormHook.setCoupleGreeting}
        plusOneCount={updateFormHook.plusOneCount}
        setPlusOneCount={updateFormHook.setPlusOneCount}
        tags={updateFormHook.tags}
        newTag={updateFormHook.newTag}
        setNewTag={updateFormHook.setNewTag}
        onFormDataChange={updateFormHook.handleFormDataChange}
        onTiedContactChange={updateFormHook.handleTiedContactChange}
        onAddTag={updateFormHook.handleAddTag}
        onRemoveTag={updateFormHook.handleRemoveTag}
        onSubmit={handleUpdateContact}
        onReset={updateFormHook.resetForm}
        isSubmitting={isSubmitting}
        // Additional props for update mode
        isEditMode={true}
        editingContact={editingContact}
      />

      {/* Delete Confirmation Modal */}
      <DeleteContactModal
        contact={contactToDelete}
        isDeleteDialogOpen={showDeleteModal}
        setIsDeleteDialogOpen={setShowDeleteModal}
        confirmDelete={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SendContactTable;