import { Contact } from '@/types/sendContact';
import { ChevronDown, Download, Printer } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ContactTableRow } from './ContactTableRow';

interface ContactTableProps {
  contacts: Contact[];
  selectedContacts: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectContact: (id: number, checked: boolean) => void;
  onMenuAction: (action: string, contactId: number) => void;
  searchTerm: string;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  selectedContacts,
  onSelectAll,
  onSelectContact,
  onMenuAction,
  searchTerm
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const isAllSelected = selectedContacts.length === contacts.length;
  const isIndeterminate = selectedContacts.length > 0 && selectedContacts.length < contacts.length;

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

  const handleDropdownToggle = (contactId: number) => {
    setOpenDropdown(openDropdown === contactId ? null : contactId);
  };

  return (
    <>
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
                  onChange={(e) => onSelectAll(e.target.checked)}
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
            {filteredContacts.map((contact) => (
              <ContactTableRow
                key={contact.id}
                contact={contact}
                isSelected={selectedContacts.includes(contact.id)}
                onSelect={onSelectContact}
                onMenuAction={onMenuAction}
                openDropdown={openDropdown}
                onDropdownToggle={handleDropdownToggle}
                dropdownRef={dropdownRef}
              />
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
    </>
  );
};
