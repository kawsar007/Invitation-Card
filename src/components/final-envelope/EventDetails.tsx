import { Calendar, Copy, MapPin } from 'lucide-react';
import React from 'react';

export const EventDetails: React.FC = () => {
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
          <h3 className="text-base font-semibold mb-1 text-gray-400">Sena Kunjo, Dhaka</h3>
          <p className="text-gray-400 mb-1 text-sm">Wednesday, June 25, 2025</p>
          <p className="text-gray-400 mb-4 text-xs">Additional Information for Location</p>
          <div className="flex justify-center">
            <a href="#" className="text-green-600 hover:text-green-700 text-xs flex items-center mr-4">
              <MapPin size={14} className="mr-1" />
              View Map
            </a>
            <a href="#" className="text-blue-500 text-xs flex items-center hover:text-blue-600">
              <Calendar size={14} className="mr-1" />
              Add to calendar
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Virtual event */}
        <div className="text-center">
          <h3 className="text-base text-gray-400 font-medium mb-6 tracking-wider text-center">ATTEND VIRTUALLY</h3>
          <div className="bg-teal-500 text-white px-4 py-2 rounded text-sm font-medium mb-3 inline-block">
            Virtual Event Link
          </div>

          <div className="flex items-center justify-center mb-2 cursor-pointer text-green-600 hover:text-green-700">
            <Copy size={14} />
            <span className="ml-1 text-xs">Copy Link to Event</span>
          </div>

          <p className="mb-3 text-xs text-gray-400">5:00 PM (PST) Tuesday, November 18, 2025</p>
          <p className="mb-3 text-xs text-gray-400">
            We will also be offering a virtual event option for those who cannot attend in-person. The link will go live 1 hour prior to event start time.
          </p>
          <a href="#" className="text-blue-500 text-xs flex items-center justify-center hover:text-blue-600">
            <Calendar size={14} className="mr-1" />
            Add to calendar
          </a>
        </div>
      </section>

      <div className="border-t border-gray-300 my-4"></div>

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