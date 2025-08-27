import { RSVPResponse, SubmitRSVPResponse } from "@/types/track";
import {
    AlertCircle,
  Calendar,
  Car,
  CheckCircle,
  Info,
  MapPin,
  MessageSquare,
  User,
  UserPlus,
  Utensils,
  X,
  XCircle,
} from "lucide-react";

export const RSVPResponseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  rsvpData: SubmitRSVPResponse | null;
  loading: boolean;
}> = ({ isOpen, onClose, rsvpData, loading }) => {
  if (!isOpen) return null;
  console.log("RSVP Data--->", rsvpData);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAttendanceStatus = (attendance: string) => {
    switch (attendance) {
      case "ATTEND":
        return {
          color: "text-green-600 bg-green-100",
          icon: CheckCircle,
          label: "Will Attend",
        };
      case "NOT_ATTEND":
        return {
          color: "text-red-600 bg-red-100",
          icon: XCircle,
          label: "Will Not Attend",
        };
      default:
        return {
          color: "text-gray-600 bg-gray-100",
          icon: Info,
          label: "Unknown",
        };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              RSVP Response Details
            </h2>
            <p className="text-gray-600 mt-1">Complete response information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
              <p className="text-gray-600">Loading RSVP Response...</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && rsvpData && (
          <div className="p-6 space-y-6">
            {/* Event Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Event Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Event Name</p>
                  <p className="font-semibold text-gray-900">
                    {rsvpData?.rsvp?.event?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Host</p>
                  <p className="font-semibold text-gray-900">
                    {rsvpData.rsvp.event.sender_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(rsvpData.rsvp.event.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500" />
                    <div>
                      {rsvpData.rsvp.event.location_type === "virtual" ? (
                        <div>
                          <p className="font-semibold text-gray-900">
                            Virtual Event
                          </p>
                          {rsvpData.rsvp.event.virtual_link && (
                            <a
                              href={rsvpData.rsvp.event.virtual_link}
                              className="text-blue-600 hover:underline text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Join Meeting
                            </a>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold text-gray-900">
                            {rsvpData.rsvp.event.venue_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {rsvpData.rsvp.event.venue_address}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Respondent Information */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Respondent Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">
                    {rsvpData.rsvp.contact.first_name}{" "}
                    {rsvpData.rsvp.contact.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {rsvpData.rsvp.contact.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {rsvpData.rsvp.contact.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Response Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(rsvpData.submitted_at)}
                  </p>
                </div>
              </div>
            </div>
            {/* Response Details */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                Response Details
              </h3>

              {/* Attendance Status */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Attendance Status</p>
                {(() => {
                  const status = getAttendanceStatus(rsvpData.attendance);
                  const IconComponent = status.icon;
                  return (
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full ${status.color}`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{status.label}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Food Allergies */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Utensils className="w-4 h-4 mr-2 text-gray-500" />
                  <p className="text-sm text-gray-600">Food Allergies</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-900">
                    {rsvpData.food_allergies === "yes"
                      ? "Has allergies"
                      : "No allergies"}
                  </p>
                  {rsvpData.food_allergies === "yes" &&
                    rsvpData.allergy_details && (
                      <p className="text-gray-600 mt-1">
                        Details: {rsvpData.allergy_details}
                      </p>
                    )}
                </div>
              </div>

              {/* Transportation */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Car className="w-4 h-4 mr-2 text-gray-500" />
                  <p className="text-sm text-gray-600">Transportation</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {rsvpData.transportation.map((transport, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {transport}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              {rsvpData.message && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Message</p>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-900 italic">"{rsvpData.message}"</p>
                  </div>
                </div>
              )}
            </div>
            {/* Guest Information */}
            {rsvpData.bring_guest &&
              rsvpData.guest_info &&
              rsvpData.guest_info.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-orange-600" />
                    Guest Information ({rsvpData.guest_info.length} guest
                    {rsvpData.guest_info.length > 1 ? "s" : ""})
                  </h3>
                  <div className="space-y-4">
                    {rsvpData.guest_info.map((guest, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-semibold text-gray-900">
                              {guest.firstName} {guest.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Food Allergies
                            </p>
                            <p className="font-semibold text-gray-900">
                              {guest.foodAllergies === "yes"
                                ? "Has allergies"
                                : "No allergies"}
                            </p>
                            {guest.foodAllergies === "yes" &&
                              guest.allergyDetails && (
                                <p className="text-gray-600 text-sm mt-1">
                                  Details: {guest.allergyDetails}
                                </p>
                              )}
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-2">
                              Transportation
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {guest.transportation.map((transport, tIndex) => (
                                <span
                                  key={tIndex}
                                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                                >
                                  {transport}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
         {/* Error State */}
        {!loading && !rsvpData && (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load RSVP response data</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
