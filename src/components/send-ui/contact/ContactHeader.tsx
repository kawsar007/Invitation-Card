import { Calendar, Share2 } from 'lucide-react';
import React from 'react';

interface ContactHeaderProps {
  onAddContacts: () => void;
}

export const ContactHeader: React.FC<ContactHeaderProps> = ({ onAddContacts }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={onAddContacts}
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
  );
};