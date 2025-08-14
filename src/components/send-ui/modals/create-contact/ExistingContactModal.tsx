// ExistingContactModal.tsx
import React from "react";

interface ExistingContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExistingContactModal: React.FC<ExistingContactModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Existing Contact Found</h2>
        <p className="mb-6">
          You already have this contact. You can add it to the table from the contacts list.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingContactModal;