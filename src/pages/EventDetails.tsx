import { Calendar, Clock, Loader2, Save } from 'lucide-react';

import { EventResponseObject } from "@/types/event";
import { getAuthToken } from "@/utils/auth";
import { useCallback, useEffect, useState } from "react";

interface EventDetailsFormProps {
  eventId: string;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ eventId }) => {
  const token = getAuthToken();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form state
  const [eventName, setEventName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [locationType, setLocationType] = useState<'inPerson' | 'virtual'>('inPerson');
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [virtualDescription, setVirtualDescription] = useState('');
  const [virtualLink, setVirtualLink] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeZone, setTimeZone] = useState('Asia/Dhaka');
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Fetch event data
  const fetchEventData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }

      const result: EventResponseObject = await response.json();

      if (result.success && result.data) {
        const eventData = result.data;

        // popilate form fields
        setEventName(eventData.name);
        setSenderName(eventData.sender_name);
        setLocationType(eventData.location_type === 'inPerson' ? 'inPerson' : 'virtual');
        setVenueName(eventData.venue_name || '');
        setVenueAddress(eventData.venue_address || '');
        setVirtualDescription(eventData.virtual_description || '');
        setVirtualLink(eventData.virtual_link || '');

        // Format date and time
        const eventDate = new Date(eventData.date);
        const dateStr = eventDate.toISOString().split('T')[0];
        const timeStr = eventDate.toTimeString().slice(0, 5);
        setDate(dateStr);
        setTime(timeStr);

        setTimeZone(eventData.time_zone);
        setAdditionalInfo(eventData.location_additional_information || '');
      } else {
        throw new Error(result.message || 'Failed to fetch event');
      }


    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch event');
    } finally {
      setLoading(false);
    }
  }, [eventId, token]);

  // Update event data
  const updateEvent = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      // Combine date and time
      const dateTimeString = `${date}T${time}:00.000Z`;

      const updateData = {
        name: eventName,
        sender_name: senderName,
        location_type: locationType,
        venue_name: locationType === 'inPerson' ? venueName : null,
        venue_address: locationType === 'inPerson' ? venueAddress : null,
        virtual_description: locationType === 'virtual' ? virtualDescription : null,
        virtual_link: locationType === 'virtual' ? virtualLink : null,
        date: dateTimeString,
        time_zone: timeZone,
        location_additional_information: additionalInfo || null,
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error('Failed to update event details');
      }
      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Event updated successfully');
      } else {
        throw new Error(result.message || 'Failed to update event');
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update event');
    } finally {
      setSaving(false);
    }
  }, [additionalInfo, date, eventId, eventName, locationType, senderName, time, timeZone, token, venueAddress, venueName, virtualDescription, virtualLink])

  // Load event data on component mount
  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Event Details</h1>
          <button
            onClick={updateEvent}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}

        <hr className="border-gray-200 mb-8" />

        {/* Event Name and Sender Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Sender Name"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Location</h2>
          </div>

          {/* Location Type Radio Buttons */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="locationType"
                value="inPerson"
                checked={locationType === 'inPerson'}
                onChange={(e) => setLocationType(e.target.value as 'inPerson' | 'virtual')}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${locationType === 'inPerson'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300'
                }`}>
                {locationType === 'inPerson' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm text-gray-700">In-Person Location</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="locationType"
                value="virtual"
                checked={locationType === 'virtual'}
                onChange={(e) => setLocationType(e.target.value as 'inPerson' | 'virtual')}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${locationType === 'virtual'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300'
                }`}>
                {locationType === 'virtual' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm text-gray-700">Virtual Location</span>
            </label>
          </div>

          {/* Conditional Fields Based on Location Type */}
          {locationType === 'inPerson' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Venue Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Address
                </label>
                <input
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Venue Address"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Virtual Description
                </label>
                <input
                  type="text"
                  value={virtualDescription}
                  onChange={(e) => setVirtualDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="i.e. Attend Virtually, Please Join Us"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Virtual Link
                </label>
                <input
                  type="text"
                  value={virtualLink}
                  onChange={(e) => setVirtualLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Zoom Meeting URL / Webex URL"
                />
              </div>
            </>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date and Time
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                &nbsp;
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-green-600 mt-1">Timezone: {timeZone}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information for Location
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="e.g. Parking available on 4th Ave"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsForm;