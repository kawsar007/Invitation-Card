import { AttendanceStatus, GuestInfo, SubmittedData } from "@/types/types";
import { useState } from "react";


export const useRSVPForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('');
  const [message, setMessage] = useState('');
  const [bringGuest, setBringGuest] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Guest form fields
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: '',
    lastName: '',
    foodAllergies: '',
    allergyDetails: '',
    transportation: [],
  });
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
    setBringGuest(false);
    setGuestInfo({
      firstName: '',
      lastName: '',
      foodAllergies: '',
      allergyDetails: '',
      transportation: []
    });
    setIsExpandedSection(false);
  };

  const updateGuestInfo = (field: keyof GuestInfo, value: string | string[]) => {
    setGuestInfo(prev => {
      const updated = { ...prev, [field]: value };
      // Clear allergy details if user selects "no" for food allergies
      if (field === 'foodAllergies' && value === 'no') {
        updated.allergyDetails = '';
      }
      return updated;
    })
  }

  const handleTransportationChange = (option: string) => {
    setGuestInfo(prev => ({
      ...prev,
      transportation: prev.transportation.includes(option) ?
        prev.transportation.filter(item => item !== option) :
        [...prev.transportation, option]
    }))
  }

  const handleSubmit = () => {
    const submissionData: SubmittedData = {
      attendance: attendanceStatus as 'attend' | 'not-attend',
      message,
      bringGuest,
      guestInfo: bringGuest ? guestInfo : null,
      submittedAt: new Date().toISOString()
    };
    console.log("Submission Data: ", submissionData);
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
    bringGuest,
    submittedData,
    isSubmitted,
    guestInfo,
    isExpandedSection,

    // Actions
    openModal,
    openCompletionModal,
    closeModal,
    closeCompletionModal,
    setAttendanceStatus,
    setMessage,
    setBringGuest,
    updateGuestInfo,
    setIsExpandedSection,
    handleTransportationChange,
    handleSubmit
  }
}