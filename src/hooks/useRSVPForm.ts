import { AttendanceStatus, GuestInfo, OwnInfo, SubmittedData } from "@/types/types";
import { useState } from "react";

export const useRSVPForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ownInfo, setOwnInfo] = useState<OwnInfo>({
    foodAllergies: '',
    allergyDetails: '',
    transportation: [],
  });

  // Multiple guests - array of guest info
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [isExpandedSection, setIsExpandedSection] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);

  const openCompletionModal = () => setIsCompletionModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    // Don't reset form if already submitted preserve the data
    if (!isSubmitted) {
      resetForm();
    }
  }

  const closeCompletionModal = () => {
    setIsCompletionModalOpen(false);
  };

  const resetForm = () => {
    setAttendanceStatus('');
    setMessage('');
    setGuests([]);
    setOwnInfo({
      foodAllergies: '',
      allergyDetails: '',
      transportation: [],
    });
    setIsExpandedSection(false);
  };

  const updateOwnInfo = (field: keyof OwnInfo, value: string | string[]) => {
    setOwnInfo(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'foodAllergies' && value === 'no') {
        updated.allergyDetails = '';
      }
      return updated;
    })
  }

  const addGuest = () => {
    const newGuest: GuestInfo = {
      firstName: '',
      lastName: '',
      foodAllergies: '',
      allergyDetails: '',
      transportation: [],
    };
    setGuests(prev => [...prev, newGuest]);
  };

  const removeGuest = (index: number) => {
    setGuests(prev => prev.filter((_, i) => i !== index));
  };

  const updateGuestInfo = (index: number, field: keyof GuestInfo, value: string | string[]) => {
    setGuests(prev => prev.map((guest, i) => {
      if (i === index) {
        const updated = { ...guest, [field]: value };
        // Clear allergy details if user selects "no" for food allergies
        if (field === 'foodAllergies' && value === 'no') {
          updated.allergyDetails = '';
        }
        return updated;
      }
      return guest;
    }));
  };

  const handleGuestTransportationChange = (guestIndex: number, option: string) => {
    setGuests(prev => prev.map((guest, i) => {
      if (i === guestIndex) {
        return {
          ...guest,
          transportation: guest.transportation.includes(option) ?
            guest.transportation.filter(item => item !== option) :
            [...guest.transportation, option]
        };
      }
      return guest;
    }));
  };

  const handleOwnTransportationChange = (option: string) => {
    setOwnInfo(prev => ({
      ...prev,
      transportation: prev.transportation.includes(option) ?
        prev.transportation.filter(item => item !== option) :
        [...prev.transportation, option]
    }))
  }

  const handleSubmit = () => {
    const submissionData: SubmittedData = {
      ownInfo: {
        foodAllergies: ownInfo.foodAllergies,
        allergyDetails: ownInfo.allergyDetails,
        transportation: ownInfo.transportation,
      },
      ...ownInfo,
      attendance: attendanceStatus as 'attend' | 'not-attend',
      message,
      bringGuest: guests.length > 0,
      guestInfo: guests.length > 0 ? guests : null,
      submittedAt: new Date().toISOString()
    };
    setSubmittedData(submissionData);
    setIsSubmitted(true);
    closeModal();
    setIsCompletionModalOpen(true);
  }

  return {
    // State
    isModalOpen,
    isCompletionModalOpen,
    attendanceStatus,
    message,
    bringGuest: guests.length > 0,
    submittedData,
    isSubmitted,
    guests,
    ownInfo,
    isExpandedSection,

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
    handleSubmit
  }
}