import { useRSVPForm } from "@/hooks/useRSVPForm";
import { FinalRSVPResponse } from "@/types/sendContact";
import { OctagonMinus } from "lucide-react";
import React from "react";
import { CompletionModal } from "./CompletionModal";
import { EventDetails } from "./EventDetails";
import { RSVPModal } from "./RSVPModal";
import { useParams, useSearchParams } from "react-router-dom";

interface EnvelopeSidebarPropsType {
  rsvpData: FinalRSVPResponse;
}

const EnvelopeSidebar: React.FC<EnvelopeSidebarPropsType> = ({ rsvpData }) => {
  const { rsvpId } = useParams<{ rsvpId: string }>();
  // const { allow, allow_count, contact, event, invitation_card, tags, version } = rsvpData;
  console.log("rsvpId:->", rsvpId);

  const {
    // State
    isModalOpen,
    isCompletionModalOpen,
    attendanceStatus,
    message,
    bringGuest,
    ownInfo,
    guests,
    isExpandedSection,
    submittedData,
    isSubmitted,
    isSubmitting,

    // Actions
    openModal,
    openCompletionModal,
    closeModal,
    closeCompletionModal,
    setAttendanceStatus,
    setMessage,
    addGuest,
    removeGuest,
    updateGuestInfo,
    updateOwnInfo,
    setIsExpandedSection,
    handleGuestTransportationChange,
    handleOwnTransportationChange,
    handleSubmit,
  } = useRSVPForm({rsvpId: rsvpId || ''});

  const handleButtonClick = () => {
    if (isSubmitted) {
      openCompletionModal();
    } else {
      openModal();
    }
  };

  // Calculate total attending (user + guests)
  const totalAttending =
    submittedData?.attendance === "ATTEND"
      ? 1 + (submittedData?.guestInfo?.length || 0)
      : 0;

  return (
    <div>
      <EventDetails rsvpData={rsvpData} />

      <div className="sticky bottom-0 left-0 right-0 bg-white pb-4 border-gray-200">
        {submittedData?.attendance === "NOT_ATTEND" && (
          <p className="text-xs text-gray-400 p-1 flex justify-start">
            <span className="mr-1 mt-[2px]">
              <OctagonMinus size={18} color="red" />
            </span>
            RSVP Submitted Successfully - 0 Attending in Your Group
          </p>
        )}
        {submittedData?.attendance === "ATTEND" && (
          <p className="text-xs text-gray-400 p-1 flex justify-start">
            RSVP Submitted Successfully - {totalAttending} Attending in Your
            Group
          </p>
        )}
        <button
          onClick={handleButtonClick}
          className={`w-full py-3 px-8 rounded text-sm font-medium transition-colors tracking-wide ${
            isSubmitted
              ? "bg-gray-400 text-white hover:bg-gray-500"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          {isSubmitted ? "VIEW RSVP" : "SUBMIT RSVP"}
        </button>
      </div>

      <RSVPModal
        isOpen={isModalOpen}
        attendanceStatus={attendanceStatus}
        message={message}
        bringGuest={bringGuest}
        ownInfo={ownInfo}
        guests={guests}
        isExpandedSection={isExpandedSection}
        onClose={closeModal}
        onAttendanceChange={setAttendanceStatus}
        onMessageChange={setMessage}
        onAddGuest={addGuest}
        onRemoveGuest={removeGuest}
        onGuestInfoChange={updateGuestInfo}
        onOwnInfoChange={updateOwnInfo}
        onGuestTransportationChange={handleGuestTransportationChange}
        onOwnTransportationChange={handleOwnTransportationChange}
        onToggleExpanded={() => setIsExpandedSection(!isExpandedSection)}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <CompletionModal
        isOpen={isCompletionModalOpen}
        submittedData={submittedData}
        onClose={closeCompletionModal}
      />
    </div>
  );
};

export default EnvelopeSidebar;
