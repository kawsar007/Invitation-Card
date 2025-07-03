import { HelpCircle, Users } from 'lucide-react';
import React from 'react';

interface ContactTypeSelectorProps {
  contactType: 'individual' | 'couple';
  setContactType: (type: 'individual' | 'couple') => void;
  groupSize: number;
  setGroupSize: (size: number) => void;
}

export const ContactTypeSelector: React.FC<ContactTypeSelectorProps> = ({
  contactType,
  setContactType,
  groupSize,
  setGroupSize
}) => (
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
);