import { useUser } from '@/context/UserContext';
import { AttendanceStatus, GuestInfo } from '@/types/types';
import { CirclePlus, User, X } from 'lucide-react';
import React from 'react';
import { AttendanceButtons } from './AttendanceButtons';
import { GuestForm } from './GuestForm';


interface RSVPModalProps {
  isOpen: boolean;
  attendanceStatus: AttendanceStatus;
  message: string;
  bringGuest: boolean;
  guestInfo: GuestInfo;
  isExpandedSection: boolean;
  onClose: () => void;
  onAttendanceChange: (status: AttendanceStatus) => void;
  onMessageChange: (message: string) => void;
  onBringGuestChange: (bring: boolean) => void;
  onGuestInfoChange: (field: keyof GuestInfo, value: string | string[]) => void;
  onTransportationChange: (option: string) => void;
  onToggleExpanded: () => void;
  onSubmit: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  attendanceStatus,
  message,
  bringGuest,
  guestInfo,
  isExpandedSection,
  onClose,
  onAttendanceChange,
  onMessageChange,
  onBringGuestChange,
  onGuestInfoChange,
  onTransportationChange,
  onToggleExpanded,
  onSubmit
}) => {
  const { user } = useUser();

  if (!isOpen) return null;


  const handleRemoveGuest = () => {
    onBringGuestChange(false);
    onGuestInfoChange('firstName', '');
    onGuestInfoChange('lastName', '');
    onGuestInfoChange('foodAllergies', '');
    onGuestInfoChange('transportation', []);
    onToggleExpanded();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">SUBMIT YOUR RSVP</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Guest Name */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600">
                <User size={16} className="mr-2" />
                <span className="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
              </div>
              {attendanceStatus === 'attend' && (
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  ATTENDING
                </div>
              )}
            </div>

            <AttendanceButtons
              attendanceStatus={attendanceStatus}
              onAttendanceChange={onAttendanceChange}
            />

          </div>
          <div className="border-t border-gray-200 my-3"></div>
          {/* Bring a Guest Button */}
          {!bringGuest && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => onBringGuestChange(true)}
                className="text-teal-700 hover:text-teal-600 text-sm font-normal transition-colors flex justify-center items-center"
              >
                <CirclePlus size={16} className='mr-1' /> Bring a Guest
              </button>
            </div>
          )}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Guest Information Form */}
          {bringGuest && (
            <GuestForm
              guestInfo={guestInfo}
              isExpanded={isExpandedSection}
              onGuestInfoChange={onGuestInfoChange}
              onTransportationChange={onTransportationChange}
              onToggleExpanded={onToggleExpanded}
              onRemoveGuest={handleRemoveGuest}
            />
          )}

          {/* Message Textarea */}
          <div className="mb-6">
            <textarea
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Optional message to the host"
              className="w-full h-24 p-3 border border-gray-200 rounded resize-none text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={onSubmit}
              disabled={!attendanceStatus}
              className={`px-6 py-2 rounded text-sm font-medium transition-colors ${attendanceStatus
                ? 'bg-gray-400 text-white hover:bg-gray-500'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};