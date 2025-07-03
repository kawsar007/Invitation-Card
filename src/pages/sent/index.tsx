import { plusOneOptions } from '@/components/send-ui/constant';
import { ContactHeader } from '@/components/send-ui/contact/ContactHeader';
import { ContactTable } from '@/components/send-ui/contact/ContactTable';
import { ContactTabs } from '@/components/send-ui/contact/ContactTabs';
import SelectContactModal from '@/components/send-ui/SelectContactModal';
import { useContacts } from '@/hooks/send-contact/useContacts';
import { ContactFormData, TiedContact } from '@/types/sendContact';
import { HelpCircle, Users, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const SendContactTable: React.FC = () => {
  // Use the custom hook
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

  // UI state (non-contact related)
  const [activeTab, setActiveTab] = useState<'All' | 'Unsent' | 'Unopened' | 'Opened'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [contactType, setContactType] = useState<'individual' | 'couple'>('individual');
  const [groupSize, setGroupSize] = useState(2);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [coupleGreeting, setCoupleGreeting] = useState('');
  const [plusOneCount, setPlusOneCount] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Form data for individual contact
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  // Form data for couple/family contacts
  const [tiedContacts, setTiedContacts] = useState<TiedContact[]>([
    { first_name: '', last_name: '', email: '', phone: '' },
    { first_name: '', last_name: '', email: '', phone: '' }
  ]);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Show error alerts
  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  const tabs = [
    { key: 'All', label: 'All', count: contacts.length },
    { key: 'Unsent', label: 'Unsent', count: 2 },
    { key: 'Unopened', label: 'Unopened', count: 0 },
    { key: 'Opened', label: 'Opened', count: 0 }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset form when contact type changes
  useEffect(() => {
    if (contactType === 'couple') {
      const newTiedContacts = Array.from({ length: groupSize }, (_, index) =>
        tiedContacts[index] || { first_name: '', last_name: '', email: '', phone: '' }
      );
      setTiedContacts(newTiedContacts);
    }
  }, [contactType, groupSize, tiedContacts]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(checked ? contacts.map(c => c.id) : []);
  };

  const handleSelectContact = (id: number, checked: boolean) => {
    setSelectedContacts(prev =>
      checked ? [...prev, id] : prev.filter(contactId => contactId !== id)
    );
  };

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

  const handleFormDataChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTiedContactChange = (index: number, field: keyof TiedContact, value: string) => {
    setTiedContacts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const resetForm = () => {
    setFormData({ first_name: '', last_name: '', email: '', phone: '' });
    setTiedContacts([
      { first_name: '', last_name: '', email: '', phone: '' },
      { first_name: '', last_name: '', email: '', phone: '' }
    ]);
    setCoupleGreeting('');
    setTags([]);
    setNewTag('');
    setContactType('individual');
    setGroupSize(2);
    setPlusOneCount(5);
  };

  const handleSubmitContact = async (saveAndAddAnother: boolean = false) => {
    // Validate form data
    const validation = validateContactData(contactType, formData, tiedContacts);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Build payload
    const payload = buildContactPayload(contactType, formData, tiedContacts, tags);

    // Create contact
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

  const handleDeleteSelected = async () => {
    if (selectedContacts.length === 0) return;

    const message = selectedContacts.length === 1
      ? 'Are you sure you want to delete this contact?'
      : `Are you sure you want to delete ${selectedContacts.length} contacts?`;

    if (window.confirm(message)) {
      const success = await deleteMultipleContacts(selectedContacts);
      if (success) {
        setSelectedContacts([]);
      }
    }
  };

  const isAllSelected = selectedContacts.length === contacts.length;
  const isIndeterminate = selectedContacts.length > 0 && selectedContacts.length < contacts.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <ContactHeader
        onAddContacts={() => setShowAddContactModal(true)}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Tabs and Search */}
      <ContactTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tabs={tabs}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading contacts...</div>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <ContactTable
          contacts={filteredContacts}
          selectedContacts={selectedContacts}
          onSelectAll={handleSelectAll}
          onSelectContact={handleSelectContact}
          onMenuAction={handleMenuAction}
          searchTerm={searchTerm}
          selectedCount={selectedContacts.length}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}

        />
      )}

      {/* Add Contacts Modal */}
      {showAddContactModal && (
        <SelectContactModal
          setShowAddContactModal={setShowAddContactModal}
          setShowNewContactModal={setShowNewContactModal}
        />
      )}

      {/* New Contact Modal */}
      {showNewContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-medium text-gray-900">Add a New Contact</h2>
                <button className="text-blue-600 text-sm hover:underline">Show Advanced</button>
              </div>
              <button
                onClick={() => {
                  setShowNewContactModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contact Type Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="contactType"
                    value="individual"
                    checked={contactType === 'individual'}
                    onChange={(e) => setContactType(e.target.value as 'individual')}
                    className="text-blue-600"
                  />
                  <Users size={16} className="text-gray-600" />
                  <span className="text-sm">Individual - A single person</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="contactType"
                    value="couple"
                    checked={contactType === 'couple'}
                    onChange={(e) => setContactType(e.target.value as 'couple')}
                    className="text-blue-600"
                  />
                  <Users size={16} className="text-gray-600" />
                  <span className="text-sm">Couple or Family - Multiple people tied to a contact</span>
                  <HelpCircle size={16} className="text-gray-400" />
                </label>

                {contactType === 'couple' && (
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-sm font-medium text-gray-700">Group Size</span>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(parseInt(e.target.value))}
                      className="p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Couple/Family Greeting Message */}
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

            {/* Form Fields */}
            {contactType === 'individual' ? (
              // Individual Form
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => handleFormDataChange('first_name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleFormDataChange('last_name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormDataChange('email', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFormDataChange('phone', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              // Couple/Family Form with Dynamic Rows
              <div className="mb-6">
                <div className="space-y-4">
                  {tiedContacts.map((contact, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={contact.first_name}
                          onChange={(e) => handleTiedContactChange(index, 'first_name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={contact.last_name}
                          onChange={(e) => handleTiedContactChange(index, 'last_name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => handleTiedContactChange(index, 'email', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => handleTiedContactChange(index, 'phone', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-end">
                        {index > 0 && (
                          <button
                            onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                            className="text-red-600 text-sm hover:underline flex items-center space-x-1"
                          >
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allow +1 Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <label className="text-sm font-medium text-gray-700">Allow +1?</label>
                <HelpCircle size={16} className="text-gray-400" />
              </div>
              <select
                value={plusOneCount}
                onChange={(e) => setPlusOneCount(parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {plusOneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Tags</span>
                <HelpCircle size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Enter tag name"
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddTag}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Tag
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-white px-2 py-1 text-xs rounded flex items-center space-x-1"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white hover:text-gray-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewContactModal(false);
                  resetForm();
                }}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitContact(true)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
              >
                {isSubmitting ? 'SAVING...' : 'SAVE AND ADD ANOTHER'}
              </button>
              <button
                onClick={() => handleSubmitContact(false)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isSubmitting ? 'ADDING...' : 'ADD CONTACT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendContactTable;