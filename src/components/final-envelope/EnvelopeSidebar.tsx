import { Calendar, Check, ChevronDown, ChevronUp, Copy, MapPin, User, X } from "lucide-react";
import { useState } from "react";

const EnvelopeSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [message, setMessage] = useState("");
  const [bringGuest, setBringGuest] = useState(false);

  // Guest form fields
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestFoodAllergies, setGuestFoodAllergies] = useState("");
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [isExpandedSection, setIsExpandedSection] = useState(false);

  // Store submitted data for completion modal
  const [submittedData, setSubmittedData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAttendanceStatus("");
    setMessage("");
    setBringGuest(false);
    setGuestFirstName("");
    setGuestLastName("");
    setGuestFoodAllergies("");
    setTransportationOptions([]);
    setIsExpandedSection(false);
  };

  const closeCompletionModal = () => {
    setIsCompletionModalOpen(false);
    setSubmittedData(null);
  };

  const handleTransportationChange = (option) => {
    setTransportationOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    // Prepare submitted data
    const submissionData = {
      attendance: attendanceStatus,
      message: message,
      bringGuest: bringGuest,
      guestInfo: bringGuest ? {
        firstName: guestFirstName,
        lastName: guestLastName,
        foodAllergies: guestFoodAllergies,
        transportation: transportationOptions
      } : null,
      submittedAt: new Date().toLocaleString()
    };

    // Handle form submission here
    console.log(submissionData);

    // Store submitted data and show completion modal
    setSubmittedData(submissionData);
    closeModal();
    setIsCompletionModalOpen(true);
  };

  return (
    <div>
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

      {/* Locations Section - Styled to match image */}
      <section className="mb-8">
        <h2 className="text-base text-gray-400 font-medium mb-6 tracking-wider text-center">LOCATION</h2>

        {/* Location Card - Styled like the image */}
        <div className="text-center mb-6">
          <h3 className="text-base font-semibold mb-1 text-gray-400">Sena Kunjo, Dhaka</h3>
          <p className="text-gray-400 mb-1 text-sm">Wednesday, June 25, 2025</p>
          <p className="text-gray-400 mb-4 text-xs">Additional Information for Location</p>
          <div className="flex justify-center">
            <a href="#" className="text-green-600 hover:text-green-700 text-xs flex items-center mr-4">
              <span className="mr-1"><MapPin size={14} /></span>
              View Map
            </a>
            <a href="#" className="text-blue-500 text-xs flex items-center hover:text-blue-600">
              <span className="mr-1"><Calendar size={14} /></span>
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
            <Copy size={14} /> <span className="ml-1 text-xs">Copy Link to Event</span>
          </div>

          <p className="mb-3 text-xs text-gray-400">5:00 PM (PST) Tuesday, November 18, 2025</p>
          <p className="mb-3 text-xs text-gray-400">
            We will also be offering a virtual event option for those who cannot attend in-person. The link will go live 1 hour prior to event start time.
          </p>
          <a href="#" className="text-blue-500 text-xs flex items-center justify-center hover:text-blue-600">
            <span className="mr-1"><Calendar size={14} /></span>
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
      <div className="sticky bottom-0 left-0 right-0 bg-white py-4 border-gray-200">
        <button
          onClick={openModal}
          className="bg-teal-500 text-white w-full py-3 px-8 rounded text-sm font-medium hover:bg-teal-600 transition-colors tracking-wide"
        >
          SUBMIT RSVP
        </button>
      </div>

      {/* RSVP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">SUBMIT YOUR RSVP</h2>
              <button
                onClick={closeModal}
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
                    <span className="text-sm font-medium">Amelia Clark</span>
                  </div>
                  {attendanceStatus === "attend" && (
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

                {/* Attendance Buttons */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setAttendanceStatus("attend")}
                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${attendanceStatus === "attend"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Will Attend
                  </button>
                  <button
                    onClick={() => setAttendanceStatus("not-attend")}
                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${attendanceStatus === "not-attend"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Will Not Attend
                  </button>
                </div>
              </div>

              {/* Bring a Guest Button */}
              {!bringGuest && (
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setBringGuest(true)}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    + Bring a Guest
                  </button>
                </div>
              )}

              {/* Guest Information Form */}
              {bringGuest && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Guest Information</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setBringGuest(false);
                        setGuestFirstName("");
                        setGuestLastName("");
                        setGuestFoodAllergies("");
                        setTransportationOptions([]);
                        setIsExpandedSection(false);
                      }}
                      className="text-red-500 hover:text-red-600 p-1"
                      title="Remove guest"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                      </svg>
                    </button>
                  </div>

                  {/* First Name */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">First Name</label>
                    <input
                      type="text"
                      value={guestFirstName}
                      onChange={(e) => setGuestFirstName(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                      placeholder="Enter first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={guestLastName}
                      onChange={(e) => setGuestLastName(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                      placeholder="Enter last name"
                    />
                  </div>

                  {/* Expandable Section */}
                  <div className="border border-gray-200 rounded">
                    <button
                      type="button"
                      onClick={() => setIsExpandedSection(!isExpandedSection)}
                      className="w-full flex items-center justify-between p-3 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <span>Additional Information</span>
                      {isExpandedSection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isExpandedSection && (
                      <div className="p-4 border-t border-gray-200 bg-white">
                        {/* Food Allergies */}
                        <div className="mb-6">
                          <p className="text-sm text-gray-600 mb-3">Do you have any food allergies?</p>
                          <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="foodAllergies"
                                value="yes"
                                checked={guestFoodAllergies === "yes"}
                                onChange={(e) => setGuestFoodAllergies(e.target.value)}
                                className="mr-3"
                              />
                              <span className="text-sm text-gray-600">Yes</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="foodAllergies"
                                value="no"
                                checked={guestFoodAllergies === "no"}
                                onChange={(e) => setGuestFoodAllergies(e.target.value)}
                                className="mr-3"
                              />
                              <span className="text-sm text-gray-600">No</span>
                            </label>
                          </div>
                        </div>

                        {/* Transportation Options */}
                        <div>
                          <p className="text-sm text-gray-600 mb-3">What transportation options will your group be utilizing?</p>
                          <div className="space-y-2">
                            {["Public transit", "Rideshare/Taxi", "Personal vehicle", "Carpool", "Other"].map(option => (
                              <label key={option} className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={transportationOptions.includes(option)}
                                  onChange={() => handleTransportationChange(option)}
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
              )}

              {/* Message Textarea */}
              <div className="mb-6">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Optional message to the host"
                  className="w-full h-24 p-3 border border-gray-200 rounded resize-none text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!attendanceStatus}
                  className={`px-6 py-2 rounded text-sm font-medium transition-colors ${attendanceStatus
                    ? "bg-gray-400 text-white hover:bg-gray-500"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Completion Modal */}
      {isCompletionModalOpen && submittedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">RSVP COMPLETE!</h2>
              <button
                onClick={closeCompletionModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Submission timestamp */}
              <p className="text-sm text-gray-500 mb-6">
                {submittedData.submittedAt} - RSVP Submitted ({submittedData.attendance === 'attend' ? '2' : '1'} Attending)
              </p>

              {/* Main attendee (Amelia Clark) */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800">Amelia Clark</span>
                </div>

                <div className="ml-9 space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Q: Do you have any food allergies?</span>
                    <br />
                    <span className="text-gray-500">A: Incomplete</span>
                  </div>
                  <div>
                    <span className="font-medium">Q: What transportation options will your group be utilizing?</span>
                    <br />
                    <span className="text-gray-500">A: Incomplete</span>
                  </div>
                </div>
              </div>

              {/* Guest information (if applicable) */}
              {submittedData.bringGuest && submittedData.guestInfo && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {submittedData.guestInfo.firstName} {submittedData.guestInfo.lastName}
                    </span>
                  </div>

                  <div className="ml-9 space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Q: Do you have any food allergies?</span>
                      <br />
                      <span className="text-gray-500">
                        A: {submittedData.guestInfo.foodAllergies === 'yes' ? 'Yes' :
                          submittedData.guestInfo.foodAllergies === 'no' ? 'No' : 'Incomplete'}
                      </span>
                      {submittedData.guestInfo.foodAllergies === 'yes' && (
                        <>
                          <br />
                          <span className="font-medium">Q: Please list food allergies below.</span>
                          <br />
                          <span className="text-gray-500">A: Incomplete</span>
                        </>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Q: What transportation options will your group be utilizing?</span>
                      <br />
                      <span className="text-gray-500">
                        A: {submittedData.guestInfo.transportation.length > 0
                          ? submittedData.guestInfo.transportation.join(', ')
                          : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Done Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={closeCompletionModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnvelopeSidebar;