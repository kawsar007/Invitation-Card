import React from 'react';

interface ModalActionsProps {
  onClose: () => void;
  onSubmit: (saveAndAddAnother: boolean) => void;
  isSubmitting: boolean;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  onClose,
  onSubmit,
  isSubmitting
}) => (
  <div className="flex items-center justify-end space-x-3">
    <button
      onClick={onClose}
      disabled={isSubmitting}
      className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
    >
      Cancel
    </button>
    <button
      onClick={() => onSubmit(true)}
      disabled={isSubmitting}
      className="px-6 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
    >
      {isSubmitting ? 'SAVING...' : 'SAVE AND ADD ANOTHER'}
    </button>
    <button
      onClick={() => onSubmit(false)}
      disabled={isSubmitting}
      className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      {isSubmitting ? 'ADDING...' : 'ADD CONTACT'}
    </button>
  </div>
);