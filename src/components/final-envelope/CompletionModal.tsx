import { useUser } from '@/context/UserContext';
import { SubmittedData } from '@/types/types';
import { formatDate } from '@/utils/date';
import { Check, X } from 'lucide-react';
import React from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  submittedData: SubmittedData | null;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  submittedData,
  onClose
}) => {
  console.log(submittedData);

  const { user } = useUser();
  if (!isOpen || !submittedData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">RSVP COMPLETE!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">
            {formatDate(submittedData.submittedAt)} - RSVP Submitted (
            {submittedData.attendance === "not-attend"
              ? <span className="text-red-500 font-bold">Not Attending</span>
              : `Attending ${submittedData.bringGuest ? (1 + submittedData.guestInfo.length) : 1}`}
            )
          </p>

          {/* Main attendee */}
          {submittedData.attendance === "attend" &&
            <>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800">{user?.first_name} {user?.last_name}</span>
                </div>

                <div className="ml-9 space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Q: Do you have any food allergies?</span>
                    <br />
                    <span className="text-gray-500">
                      A: {submittedData.ownInfo.foodAllergies === 'yes' ? 'Yes' :
                        submittedData.ownInfo.foodAllergies === 'no' ? 'No' : 'Incomplete'}
                    </span>
                    {submittedData.ownInfo.foodAllergies === 'yes' && (
                      <div className="mt-2">
                        <span className="font-medium">Q: Please list food allergies below.</span>
                        <br />
                        <span className="text-gray-500">
                          A: {submittedData.ownInfo.allergyDetails ?
                            submittedData.ownInfo.allergyDetails : 'Not specified'}
                        </span>
                      </div>
                    )}
                    {/* <span className="text-gray-500">A: Incomplete</span> */}
                  </div>
                  <div>
                    <span className="font-medium">Q: What transportation options will your group be utilizing?</span>
                    <br />
                    <span className="text-gray-500">
                      A: {submittedData.ownInfo.transportation.length > 0
                        ? submittedData.ownInfo.transportation.join(', ')
                        : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest information */}
              {submittedData.bringGuest && submittedData.guestInfo.map((guest, i) => (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {guest.firstName} {guest.lastName}
                    </span>
                  </div>

                  <div className="ml-9 space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Q: Do you have any food allergies?</span>
                      <br />
                      <span className="text-gray-500">
                        A: {guest.foodAllergies === 'yes' ? 'Yes' :
                          guest.foodAllergies === 'no' ? 'No' : 'Incomplete'}
                      </span>
                      {guest.foodAllergies === 'yes' && (
                        <div className="mt-2">
                          <span className="font-medium">Q: Please list food allergies below.</span>
                          <br />
                          <span className="text-gray-500">
                            A: {guest.allergyDetails ?
                              guest.allergyDetails : 'Not specified'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Q: What transportation options will your group be utilizing?</span>
                      <br />
                      <span className="text-gray-500">
                        A: {guest.transportation.length > 0
                          ? guest.transportation.join(', ')
                          : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          }


          {/* Done Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
