import { GuestInfo } from '@/types/types';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import React from 'react';

interface GuestFormProps {
  guestIndex: number;
  guestInfo: GuestInfo;
  isExpanded: boolean;
  onGuestInfoChange: (index: number, field: keyof GuestInfo, value: string | string[]) => void;
  onTransportationChange: (guestIndex: number, option: string) => void;
  onToggleExpanded: () => void;
  onRemoveGuest: (index: number) => void;
}

const TRANSPORTATION_OPTIONS = [
  'Public transit',
  'Rideshare/Taxi',
  'Personal vehicle',
  'Carpool',
  'Other'
];

export const GuestForm: React.FC<GuestFormProps> = ({
  guestIndex,
  guestInfo,
  isExpanded,
  onGuestInfoChange,
  onTransportationChange,
  onToggleExpanded,
  onRemoveGuest
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Guest {guestIndex + 1} Information</h3>
        <button
          type="button"
          onClick={() => onRemoveGuest(guestIndex)}
          className="text-teal-500 hover:text-teal-600 p-1"
          title="Remove guest"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* First Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">First Name</label>
        <input
          type="text"
          value={guestInfo.firstName}
          onChange={(e) => onGuestInfoChange(guestIndex, 'firstName', e.target.value)}
          className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
          placeholder="Enter first name"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Last Name</label>
        <input
          type="text"
          value={guestInfo.lastName}
          onChange={(e) => onGuestInfoChange(guestIndex, 'lastName', e.target.value)}
          className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
          placeholder="Enter last name"
        />
      </div>

      {/* Expandable Section */}
      <div className="border border-gray-200 rounded">
        <button
          type="button"
          onClick={onToggleExpanded}
          className="w-full flex items-center justify-between p-3 text-left text-sm text-gray-600 hover:bg-gray-50"
        >
          <span>Additional Information</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Do you have any food allergies?</p>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`guest${guestIndex}FoodAllergies`}
                    value="yes"
                    checked={guestInfo.foodAllergies === 'yes'}
                    onChange={(e) => onGuestInfoChange(guestIndex, 'foodAllergies', e.target.value as 'yes' | 'no')}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-600">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`guest${guestIndex}FoodAllergies`}
                    value="no"
                    checked={guestInfo.foodAllergies === 'no'}
                    onChange={(e) => onGuestInfoChange(guestIndex, 'foodAllergies', e.target.value as 'yes' | 'no')}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-600">No</span>
                </label>
              </div>

              {guestInfo.foodAllergies === 'yes' && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Please specify your food allergies:
                  </label>
                  <textarea
                    value={guestInfo.allergyDetails}
                    onChange={(e) => onGuestInfoChange(guestIndex, 'allergyDetails', e.target.value)}
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
                      checked={guestInfo.transportation.includes(option)}
                      onChange={() => onTransportationChange(guestIndex, option)}
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
  );
};