
import SelectContactModal from '@/components/send-ui/SelectContactModal';
import { Contact, ContactFormData, ContactsResponseObject } from '@/types/sendContact';
import { getAuthToken } from '@/utils/auth';
import { Calendar, CheckCircle, ChevronDown, Copy, Download, Eye, Facebook, Filter, HelpCircle, History, Mail, MessageCircle, MessageSquare, Printer, Search, Share2, Trash2, Users, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';



interface TiedContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const ContactTable: React.FC = () => {
  const token = getAuthToken();
  const [activeTab, setActiveTab] = useState<'All' | 'Unsent' | 'Unopened' | 'Opened'>('All');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const fetchContactsList = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result: ContactsResponseObject = await response.json();
      setContacts(result.contacts)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch event');
    }
  }, [token]);

  useEffect(() => {
    fetchContactsList();
  }, [fetchContactsList]);

  const tabs = [
    { key: 'All', label: 'All', count: 2 },
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
  }, [contactType, groupSize]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleDropdownToggle = (contactId: number) => {
    setOpenDropdown(openDropdown === contactId ? null : contactId);
  };

  const handleMenuAction = (action: string, contactId: number) => {
    console.log(`${action} for contact ${contactId}`);
    setOpenDropdown(null);
  };

  const handleFormDataChange = (field: keyof FormData, value: string) => {
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
    setIsSubmitting(true);

    try {
      let payload;

      if (contactType === 'individual') {
        // Validate required fields for individual
        if (!formData.first_name.trim() || !formData.email.trim()) {
          alert('First name and email are required');
          setIsSubmitting(false);
          return;
        }

        payload = {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          has_tied_contact: false,
          tags: tags.length > 0 ? tags : undefined
        };
      } else {
        // Validate required fields for couple/family
        const validTiedContacts = tiedContacts.filter(contact =>
          contact.first_name.trim() && contact.email.trim()
        );

        if (validTiedContacts.length === 0) {
          alert('At least one contact with first name and email is required');
          setIsSubmitting(false);
          return;
        }

        // Use first valid contact as main contact
        const mainContact = validTiedContacts[0];
        const otherContacts = validTiedContacts.slice(1);

        payload = {
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

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Refresh contacts list
        await fetchContactsList();

        if (saveAndAddAnother) {
          resetForm();
        } else {
          setShowNewContactModal(false);
          resetForm();
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to create contact'}`);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
      alert('Failed to create contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllSelected = selectedContacts.length === contacts.length;
  const isIndeterminate = selectedContacts.length > 0 && selectedContacts.length < contacts.length;

  const dropdownMenuItems = [
    { icon: History, label: 'View History' },
    { icon: MessageSquare, label: 'Send Message' },
    { icon: Facebook, label: 'Send with Facebook', hasInfo: true },
    { icon: MessageCircle, label: 'Send with WhatsApp', hasInfo: true },
    { icon: Copy, label: 'Copy Link / Send Plaintext' },
    { icon: CheckCircle, label: 'Mark as Sent' },
    { icon: Mail, label: 'Preview Invitation' },
    { icon: Mail, label: 'Preview Envelope' },
    { icon: Trash2, label: 'Delete' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddContactModal(true)}
            className="bg-gray-600 text-white px-4 py-2 text-sm font-medium rounded"
          >
            ADD CONTACTS
          </button>
          <div className="flex items-center space-x-2 text-gray-600">
            <Share2 size={16} />
            <span className="text-sm font-medium">SHARE URL</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar size={16} />
            <span className="text-sm">SCHEDULE SEND</span>
          </div>
          <button className="bg-green-500 text-white px-6 py-2 text-sm font-medium rounded">
            SEND INVITATIONS
          </button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'All' | 'Unsent' | 'Unopened' | 'Opened')}
              className={`px-3 py-2 text-sm font-medium rounded ${activeTab === tab.key
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
          <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
            <Filter size={16} />
            <span>Custom Filters</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
            <Eye size={16} />
            <span>View Preferences</span>
          </button>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Mailing List"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Plus 1s</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Tags</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={(e) => handleSelectContact(contact.id, e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{contact.first_name} {contact?.last_name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{contact.email}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900">+ 3</td>
                <td className="p-4">
                  <span className="inline-flex items-center space-x-1 text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-900">Unsent</span>
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {contact?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-white px-2 py-1 text-xs rounded"
                      >
                        {tag} ×
                      </span>
                    ))}
                    <button className="text-blue-600 text-sm hover:underline">+ Tag</button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2 relative">
                    <button
                      onClick={() => handleMenuAction('send', contact.id)}
                      className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
                    >
                      SEND
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(contact.id)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
                      >
                        <ChevronDown size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === contact.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
                        >
                          <div className="py-1">
                            {dropdownMenuItems.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleMenuAction(item.label.toLowerCase().replace(/\s+/g, '_'), contact.id)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                              >
                                <item.icon size={16} className="text-gray-500 flex-shrink-0" />
                                <span className="flex-1">{item.label}</span>
                                {item.hasInfo && (
                                  <HelpCircle size={14} className="text-gray-400 flex-shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 text-sm text-gray-600">
        <div>
          {contacts.length} People (0 selected) → 7 Plus 1s = 9 Total
        </div>
        <div className="flex items-center space-x-4">
          <span>Page 1 of 1</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <Download size={16} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Contacts Modal */}
      {showAddContactModal && (
        <SelectContactModal setShowAddContactModal={setShowAddContactModal} setShowNewContactModal={setShowNewContactModal} />
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
                <option value={5}>Yes (+5)</option>
                <option value={4}>Yes (+4)</option>
                <option value={3}>Yes (+3)</option>
                <option value={2}>Yes (+2)</option>
                <option value={1}>Yes (+1)</option>
                <option value={0}>No</option>
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

export default ContactTable;