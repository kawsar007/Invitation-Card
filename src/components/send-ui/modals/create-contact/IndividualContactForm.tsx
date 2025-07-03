import { ContactFormData } from '@/types/sendContact';
import React from 'react';

interface IndividualContactFormProps {
  formData: ContactFormData;
  onChange: (field: keyof ContactFormData, value: string) => void;
}

export const IndividualContactForm: React.FC<IndividualContactFormProps> = ({
  formData,
  onChange
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={formData.first_name}
        onChange={(e) => onChange('first_name', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
      <input
        type="text"
        value={formData.last_name}
        onChange={(e) => onChange('last_name', e.target.value)}
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
        onChange={(e) => onChange('email', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);
