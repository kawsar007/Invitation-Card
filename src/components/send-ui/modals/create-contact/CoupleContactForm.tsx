import { TiedContact } from '@/types/sendContact';
import React from 'react';

interface CoupleContactFormProps {
  tiedContacts: TiedContact[];
  groupSize: number;
  setGroupSize: (size: number) => void;
  onChange: (index: number, field: keyof TiedContact, value: string) => void;
}

export const CoupleContactForm: React.FC<CoupleContactFormProps> = ({
  tiedContacts,
  groupSize,
  setGroupSize,
  onChange
}) => (
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
              onChange={(e) => onChange(index, 'first_name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={contact.last_name}
              onChange={(e) => onChange(index, 'last_name', e.target.value)}
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
              onChange={(e) => onChange(index, 'email', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => onChange(index, 'phone', e.target.value)}
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
);