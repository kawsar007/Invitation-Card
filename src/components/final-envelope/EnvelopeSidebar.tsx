import { useRSVPForm } from '@/hooks/useRSVPForm';
import { OctagonMinus } from 'lucide-react';
import React from 'react';
import { CompletionModal } from './CompletionModal';
import { EventDetails } from './EventDetails';
import { RSVPModal } from './RSVPModal';

const EnvelopeSidebar: React.FC = () => {
  const {
    // State
    isModalOpen,
    isCompletionModalOpen,
    attendanceStatus,
    message,
    bringGuest,
    ownInfo,
    guestInfo,
    isExpandedSection,
    submittedData,
    isSubmitted,

    // Actions
    openModal,
    openCompletionModal,
    closeModal,
    closeCompletionModal,
    setAttendanceStatus,
    setMessage,
    setBringGuest,
    updateGuestInfo,
    updateOwnInfo,
    setIsExpandedSection,
    handleTransportationChange,
    handleOwnTransportationChange,
    handleSubmit
  } = useRSVPForm();

  const handleButtonClick = () => {
    if (isSubmitted) {
      openCompletionModal();
    } else {
      openModal();
    }
  };

  return (
    <div>
      <EventDetails />

      <div className="sticky bottom-0 left-0 right-0 bg-white pb-4 border-gray-200">
        {submittedData?.attendance === 'not-attend' && <p className='text-xs text-gray-400 p-1 flex justify-start'> <span className='mr-1 mt-[2px]'> <OctagonMinus size={18} color='red' /></span> RSVP Submitted Successfully
          0 Attending in Your Group</p>}
        <button
          onClick={handleButtonClick}
          className={`w-full py-3 px-8 rounded text-sm font-medium transition-colors tracking-wide ${isSubmitted
            ? 'bg-gray-400 text-white hover:bg-gray-500'
            : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
        >
          {isSubmitted ? 'VIEW RSVP' : 'SUBMIT RSVP'}
        </button>
      </div>

      <RSVPModal
        isOpen={isModalOpen}
        attendanceStatus={attendanceStatus}
        message={message}
        bringGuest={bringGuest}
        ownInfo={ownInfo}
        guestInfo={guestInfo}
        isExpandedSection={isExpandedSection}
        onClose={closeModal}
        onAttendanceChange={setAttendanceStatus}
        onMessageChange={setMessage}
        onBringGuestChange={setBringGuest}
        onGuestInfoChange={updateGuestInfo}
        onOwnInfoChange={updateOwnInfo}
        onTransportationChange={handleTransportationChange}
        onOwnTransportationChange={handleOwnTransportationChange}
        onToggleExpanded={() => setIsExpandedSection(!isExpandedSection)}
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