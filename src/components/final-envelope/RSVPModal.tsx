import { useUser } from '@/context/UserContext';
import { AttendanceStatus, GuestInfo, OwnInfo } from '@/types/types';
import { ChevronDown, ChevronUp, CirclePlus, User, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { AttendanceButtons } from './AttendanceButtons';
import { GuestForm } from './GuestForm';

interface RSVPModalProps {
  isOpen: boolean;
  attendanceStatus: AttendanceStatus;
  message: string;
  bringGuest: boolean;
  ownInfo: OwnInfo;
  guests: GuestInfo[];
  isExpandedSection: boolean;
  onClose: () => void;
  onAttendanceChange: (status: AttendanceStatus) => void;
  onMessageChange: (message: string) => void;
  onAddGuest: () => void;
  onRemoveGuest: (index: number) => void;
  onGuestInfoChange: (index: number, field: keyof GuestInfo, value: string | string[]) => void;
  onOwnInfoChange: (field: keyof OwnInfo, value: string | string[]) => void;
  onGuestTransportationChange: (guestIndex: number, option: string) => void;
  onOwnTransportationChange: (option: string) => void;
  onToggleExpanded: () => void;
  onSubmit: () => void;
}

const TRANSPORTATION_OPTIONS = [
  'Public transit',
  'Rideshare/Taxi',
  'Personal vehicle',
  'Carpool',
  'Other'
];

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  attendanceStatus,
  message,
  bringGuest,
  ownInfo,
  guests,
  isExpandedSection,
  onClose,
  onAttendanceChange,
  onMessageChange,
  onAddGuest,
  onRemoveGuest,
  onGuestInfoChange,
  onOwnInfoChange,
  onGuestTransportationChange,
  onOwnTransportationChange,
  onToggleExpanded,
  onSubmit
}) => {
  const { user } = useUser();
  const guestRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previousGuestCount = useRef(guests.length);

  useEffect(() => {
    if (guests.length > previousGuestCount.current) {
      const lastGuestIndex = guests.length - 1;
      const lastGuestRef = guestRefs.current[lastGuestIndex];

      if (lastGuestRef) {
        // Small delay to ensure the DOM is updated
        setTimeout(() => {
          // Try to focus on the first input field in the guest form
          const firstInput = lastGuestRef.querySelector('input, textarea, select') as HTMLElement;
          if (firstInput) {
            firstInput.focus();
          } else {
            // Fallback: scroll the guest form into view
            lastGuestRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      }
    }
    previousGuestCount.current = guests.length;
  }, [guests.length]);

  // Update refs array when guests array changes
  useEffect(() => {
    guestRefs.current = guestRefs.current.slice(0, guests.length);
  }, [guests.length]);

  if (!isOpen) return null;

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

            <div className="border border-gray-200 rounded">
              <button
                type="button"
                onClick={onToggleExpanded}
                className="w-full flex items-center justify-between p-3 text-left text-sm text-gray-600 hover:bg-gray-50"
              >
                <span>Additional Information</span>
                {isExpandedSection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isExpandedSection && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Do you have any food allergies?</p>
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="ownFoodAllergies"
                          value="yes"
                          checked={ownInfo.foodAllergies === 'yes'}
                          onChange={(e) => onOwnInfoChange('foodAllergies', e.target.value as 'yes' | 'no')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-600">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="ownFoodAllergies"
                          value="no"
                          checked={ownInfo.foodAllergies === 'no'}
                          onChange={(e) => onOwnInfoChange('foodAllergies', e.target.value as 'yes' | 'no')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-600">No</span>
                      </label>
                    </div>

                    {ownInfo.foodAllergies === 'yes' && (
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-2">
                          Please specify your food allergies:
                        </label>
                        <textarea
                          value={ownInfo.allergyDetails}
                          onChange={(e) => onOwnInfoChange('allergyDetails', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300 resize-none"
                          placeholder="e.g., peanuts, shellfish, dairy..."
                          rows={2}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-3">What transportation options will your group be utilizing?</p>
                    <div className="space-y-2">
                      {TRANSPORTATION_OPTIONS.map(option => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ownInfo.transportation.includes(option)}
                            onChange={() => onOwnTransportationChange(option)}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 my-3"></div>

          {/* Bring a Guest Button */}
          <div className="mb-3">
            <button
              type="button"
              onClick={onAddGuest}
              className="text-teal-700 hover:text-teal-600 text-sm font-normal transition-colors flex justify-center items-center"
            >
              <CirclePlus size={16} className='mr-1' /> Bring a Guest
            </button>
          </div>

          <div className="border-t border-gray-200 my-3"></div>

          {/* Guest Information Forms */}
          {guests.map((guest, index) => (
            <div key={index} ref={(el) => (guestRefs.current[index] = el)}>
              <GuestForm
                key={index}
                guestIndex={index}
                guestInfo={guest}
                isExpanded={isExpandedSection}
                onGuestInfoChange={onGuestInfoChange}
                onTransportationChange={onGuestTransportationChange}
                onToggleExpanded={onToggleExpanded}
                onRemoveGuest={onRemoveGuest}
              />
            </div>
          ))}

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