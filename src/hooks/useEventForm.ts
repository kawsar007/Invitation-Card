import { EventFormData, EventModalProps } from "@/pages/templates/CreateEventModal";
import { getAuthToken, getUserData } from "@/utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const INITIAL_FORM_DATA: EventFormData = {
  name: "",
  location_type: "",
  venue_name: "",
  venue_address: "",
  virtual_link: "",
  date: "",
  time_zone: ""
};

interface ApiResponse {
  success: boolean;
  customizationId?: string;
  message?: string;
}

export const useEventForm = (templateId: string, onSuccess?: EventModalProps["onSuccess"]) => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const user = getUserData();
  console.log("Auth User: ", user);

  const sender_name = `${user?.first_name} ${user?.last_name}`;
  console.log("Sender Name: ", sender_name);


  const [formData, setFormData] = useState<EventFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<(string | null)>(null);

  console.log("Form Data:---> ", formData);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  const handleSelectChange = (value: string, fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setError(null);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          sender_name: sender_name,
        }),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        resetForm();
        toast.success(result.message || "Event created successfully");
        navigate(`/editor/${templateId}`);
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error('Error customizing template:', error);
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return {
    formData,
    isSubmitting,
    error,
    handleInputChange,
    handleSelectChange,
    submitForm,
    resetForm,
  };
}