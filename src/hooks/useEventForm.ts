

import { EventFormData, EventModalProps } from "@/components/design-templates/CreateEventModal";
import { CardTemplate } from "@/types/types";
import { getAuthToken, getUserData } from "@/utils/auth";
import { formatHtmlContent } from "@/utils/formatters";
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

interface Invitation {
  id: number;
  name: string;
  sender_name: string;
  location_type: 'virtual' | 'physical'; // assuming only these two types
  venue_name: string | null;
  venue_address: string | null;
  virtual_description: string | null;
  virtual_link: string | null;
  date: string; // ISO 8601 date string
  time_zone: string;
  location_additional_information: string | null;
  created_by: number;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

interface CraftApiResponse {
  success: boolean;
  message?: string;
  data?: Invitation;
}

interface ApiResponse {
  success: boolean;
  customizationId?: string;
  message?: string;
  data?: Invitation;
}

export const useEventForm = (template: CardTemplate, onSuccess?: EventModalProps["onSuccess"]) => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const user = getUserData();


  const formattedContent = formatHtmlContent(template?.content);
  const sender_name = `${user?.first_name} ${user?.last_name}`;


  const [formData, setFormData] = useState<EventFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<(string | null)>(null);


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

  // Separate function to call the craft API
  const callCraftApi = async (eventId: string) => {
    try {
      const craftResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/craft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          html: formattedContent,
        }),
      });

      const craftResult: CraftApiResponse = await craftResponse.json();
      if (craftResult.success) {
        toast.success(craftResult?.message || "Invitation card saved and image generation queued successfully");
        return true;
      } else {
        toast.error(craftResult.message || "Failed to craft invitation");
        return false;
      }

    } catch (error) {
      console.error('Error calling craft API:', error);
      toast.error("Failed to craft invitation");
      return false;
    }
  }

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




      if (result.success && result?.data?.id) {
        const craftSuccess = await callCraftApi(result.data.id.toString());
        console.log("Craft Success:", craftSuccess);
        if (craftSuccess) {
          resetForm();
          toast.success(result.message || "Event created successfully");
          navigate(`/editor/${template?.id}`);
        } else {
          // Event was created but craft failed
          toast.warning("Event created successfully, but failed to craft invitation");
          navigate(`/editor/${template?.id}`);
        }

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