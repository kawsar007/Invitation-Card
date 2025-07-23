import { FinalRSVPResponse } from '@/types/sendContact';
import { formatToReadableDate } from '@/utils/date';
import { Calendar, Copy, MapPin } from 'lucide-react';
import React, { useState } from 'react';

interface EventDetailsProps {
  rsvpData: FinalRSVPResponse
}

export const EventDetails: React.FC<EventDetailsProps> = ({ rsvpData }) => {
  console.log("rsvpData: FinalRSVPResponse", rsvpData);
  const venue_name = rsvpData?.event?.venue_name;
  const venue_address = rsvpData?.event?.venue_address;
  // const virtual_link = rsvpData?.event?.virtual_link;
  const event_date = rsvpData?.event?.date;
  const time_zone = rsvpData?.event?.time_zone;


  const meetingLink = rsvpData?.event?.virtual_link;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = meetingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const openInMaps = () => {
    const encodedLocation = encodeURIComponent(venue_address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  }

  // Function to add in-person event to Google Calendar
  const addInPersonEventToCalendar = () => {
    const eventDetails = {
      text: 'Cocktails and Conversations',
      dates: formatToReadableDate(event_date), // June 25, 2025, 5:00 PM - 8:00 PM UTC
      details: 'Join us for cocktails and conversations with drinks, good company, and live music. Semi-formal attire. Complimentary valet parking provided.',
      location: venue_name,
      ctz: time_zone
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}&ctz=${eventDetails.ctz}`;

    window.open(googleCalendarUrl, '_blank');
  }

  // Function to add virtual event to Google Calendar
  const addVirtualEventToCalendar = () => {
    const eventDetails = {
      text: 'Virtual Cocktails and Conversations',
      dates: formatToReadableDate(event_date), // November 19, 2025, 1:00 AM - 4:00 AM UTC (5:00 PM PST Nov 18)
      details: `Join us virtually for cocktails and conversations with drinks, good company, and live music. Virtual Event Link: ${meetingLink}. The link will go live 1 hour prior to event start time.`,
      location: venue_name,
      ctz: time_zone
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}&ctz=${eventDetails.ctz}`;

    window.open(googleCalendarUrl, '_blank');
  }

  return (
    <>
      <h1 className="text-xl text-center font-bold text-gray-700 mb-6">DETAILS</h1>
      <div className="border-t border-gray-300 my-6"></div>

      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="text-base text-gray-400 font-medium mb-4 text-center">SUMMARY</h2>
        <p className="mb-4 text-xs text-gray-400 text-center">
          Join us for cocktails and conversations with drinks, good company, and live music.
        </p>
      </section>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Locations Section */}
      <section className="mb-8">
        <h2 className="text-base text-gray-400 font-medium mb-6 tracking-wider text-center">LOCATION</h2>

        {/* Location Card */}
        <div className="text-center mb-6">
          <h3 className="text-base font-semibold mb-1 text-gray-400">{venue_name}</h3>
          <p className="text-gray-400 mb-1 text-sm">{formatToReadableDate(event_date)}</p>
          <p className="text-gray-400 mb-4 text-xs">Additional Information for Location</p>
          <div className="flex justify-center">
            <button
              onClick={openInMaps}
              className="text-green-600 hover:text-green-700 text-xs flex items-center mr-4 bg-transparent border-none cursor-pointer"
            >
              <MapPin size={14} className="mr-1" />
              View Map
            </button>
            <button
              onClick={addInPersonEventToCalendar}
              className="text-blue-500 text-xs flex items-center hover:text-blue-600 bg-transparent border-none cursor-pointer"
            >
              <Calendar size={14} className="mr-1" />
              Add to calendar
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Virtual event */}
        {rsvpData?.event?.location_type === "virtual" && (
          <div className="text-center">
            <h3 className="text-base text-gray-400 font-medium mb-6 tracking-wider text-center">ATTEND VIRTUALLY</h3>
            <a href={meetingLink} target="_blank" className="bg-teal-500 text-white px-4 py-2 rounded text-sm font-medium mb-3 inline-block">
              Virtual Event Link
            </a>

            <div onClick={copyToClipboard} className="flex items-center justify-center mb-2 cursor-pointer text-green-600 hover:text-green-700">
              <Copy size={14} />
              <span className="ml-1 text-xs">{copied ? 'Link Copied!' : 'Copy Link to Event'}</span>
            </div>

            <p className="mb-3 text-xs text-gray-400">5:00 PM (PST) Tuesday, November 18, 2025</p>
            <p className="mb-3 text-xs text-gray-400">
              We will also be offering a virtual event option for those who cannot attend in-person. The link will go live 1 hour prior to event start time.
            </p>
            <div className='flex items-center justify-center'>
              <button
                onClick={addVirtualEventToCalendar}
                className="text-blue-500 text-xs flex items-center justify-center hover:text-blue-600 bg-transparent border-none cursor-pointer"
              >
                <Calendar size={14} className="mr-1" />
                Add to calendar
              </button>
            </div>
          </div>
        )}

      </section>

      {/* <div className="border-t border-gray-300 my-4"></div> */}

      <section className="mb-8 text-center">
        <h2 className="text-base text-gray-400 font-medium mb-4">PARKING</h2>
        <p className="mb-4 text-xs text-gray-400">
          Complimentary valet parking will be provided.
        </p>
      </section>

      <div className="border-t border-gray-300 my-4"></div>

      <section className="mb-8 text-center">
        <h2 className="text-base text-gray-400 font-medium mb-4">ATTIRE</h2>
        <p className="mb-4 text-xs text-gray-400">
          This event will be semi-formal, so please come dressed in business attire but feel free to leave the gowns and tuxes in the closet.
        </p>
      </section>

      <div className="border-t border-gray-300 my-4"></div>
    </>
  );
};