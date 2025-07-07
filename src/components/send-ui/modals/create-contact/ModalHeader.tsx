import { X } from 'lucide-react';
import React from 'react';

interface ModalHeaderProps {
  onClose: () => void;
  isEditMode?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, isEditMode }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-4">
      <h2 className="text-xl font-medium text-gray-900">{isEditMode ? "Update Contact" : "Add a New Contact"} </h2>
      <button className="text-blue-600 text-sm hover:underline">Show Advanced</button>
    </div>
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-gray-600"
    >
      <X size={24} />
    </button>
  </div>
);