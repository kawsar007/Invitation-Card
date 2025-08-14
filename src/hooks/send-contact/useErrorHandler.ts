// useErrorHandler.ts
import { useEffect } from "react";
import { toast } from "sonner";
import { Contact } from "@/types/sendContact";

interface ErrorHandlerProps {
  error: any;
  clearError: () => void;
  setShowExistingContactModal?: (value: boolean) => void; // Optional callback for modal
  setExistingContact?: (contact: Contact | null) => void; // Optional callback for contact
}

export const useErrorHandler = ({
  error,
  clearError,
  setShowExistingContactModal,
  setExistingContact,
}: ErrorHandlerProps) => {
  console.log("Error Handler Error:--->", error);
  
  useEffect(() => {
    if (error) {
      if (
        error.message === "Existing contact found" &&
        error.contact &&
        setShowExistingContactModal &&
        setExistingContact
      ) {
        // Handle "Existing contact found" error
        setExistingContact(error.contact);
        setShowExistingContactModal(true);
      } else {
        // Handle other errors with toast
        toast.error(error.message || "An error occurred");
        clearError();
      }
    }
  }, [error, clearError, setShowExistingContactModal, setExistingContact]);
};


// import { useEffect } from 'react';

// export const useErrorHandler = (error: string | null, clearError: () => void) => {
//   useEffect(() => {
//     if (error) {
//       alert(`Error: ${error}`);
//       clearError();
//     }
//   }, [error, clearError]);
// };