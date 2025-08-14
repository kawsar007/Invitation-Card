import { useCraftApi } from "@/context/CraftApiContext";
import { useUser } from "@/context/UserContext";
import useEventDetails from "@/hooks/events/useEventDetails";
import { Contact, RSVPData } from "@/types/sendContact";
import { formatToReadableDate } from "@/utils/date";
import {
  ChevronDown,
  Download,
  Edit,
  MessageSquare,
  Printer,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SendInvitationModal } from "../modals/SendModal";
import { ContactTableRow } from "./ContactTableRow";
import { getAuthToken } from "@/utils/auth";

interface ContactTableProps {
  contacts: Contact[];
  selectedContacts: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectContact: (id: number, checked: boolean) => void;
  onMenuAction: (action: string, contactId: number) => void;
  searchTerm: string;
  selectedCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onBulkAction?: (action: string, contactIds: number[]) => void;
  rsvpUniqueIds: string;
}


interface APIResponse {
  data: RSVPData[];
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  selectedContacts,
  onSelectAll,
  onSelectContact,
  onMenuAction,
  searchTerm,
  selectedCount,
  isAllSelected,
  isIndeterminate,
  onBulkAction,
  rsvpUniqueIds,
}) => {
  const token = getAuthToken();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const { event } = useEventDetails(eventId);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContactId, setModalContactId] = useState<number | null>(null);
  const [modalContacts, setModalContacts] = useState<Contact[]>([]);

  // Single Event RSVP and Contact List State;
  const [rsvpContact, setRsvpContact] = useState<RSVPData[]>([]);
  const [rsvpContactLoading, setRsvpContactLoading] = useState<boolean>(true);
  const [rsvpContactError, setRsvpContactError] = useState<string | null>(null);

  console.log("RSVP Contact: --->", rsvpContact);
  console.log("RSVP Error: --->", rsvpContactError);
  console.log("rsvpUniqueIds", rsvpUniqueIds);

  // Craft API and User context
  const {
    craftInvitation,
    previewInvitation,
    loading,
    invitations,
    previewLoading,
    error,
    versionNo,
    previewData,
    imageGeneratingWithDelay,
    generateImage,
    imageGenerating,
    craftPreviewAndGenerate,
  } = useCraftApi();

  useEffect(() => {
    fetchRsvpContacts();
  }, []);

  const fetchRsvpContacts = async () => {
    try {
      setRsvpContactLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/rsvp?event_id=${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: APIResponse = await response.json();

      console.log("Result Rsvp:--->", result?.data);

      setRsvpContact(result.data);
      setRsvpContactError(null);
    } catch (error) {
      setRsvpContactError(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching contacts", error);
    } finally {
      setRsvpContactLoading(false);
    }
  };

  const { user } = useUser();
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (contactId: number) => {
    setOpenDropdown(openDropdown === contactId ? null : contactId);
  };

  const handleBulkAction = (action: string) => {
    if (onBulkAction) {
      onBulkAction(action, selectedContacts);
    }
  };

  // Handle send action for individual contact
  const handleSendClick = (contactId: number) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      setModalContactId(contactId);
      setModalContacts([contact]);
      setIsModalOpen(true);
    }
  };

  // Handle bulk send action
  const handleBulkSend = () => {
    const selectedContactsData = contacts.filter((c) =>
      selectedContacts.includes(c.id)
    );
    setModalContactId(null);
    setModalContacts(selectedContactsData);
    setIsModalOpen(true);
  };

  const handleConfirmSend = () => {
    // Close modal first
    setIsModalOpen(false);

    // Execute the appropriate send action
    if (modalContactId) {
      // Single contact send
      onMenuAction("send", modalContactId);
    } else {
      // Bulk send
      if (onBulkAction) {
        onBulkAction("send", selectedContacts);
      }
    }

    // Reset modal state
    setModalContactId(null);
    setModalContacts([]);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContactId(null);
    setModalContacts([]);
  };

  // Enhanced menu action handler to intercept send actions
  const handleMenuAction = (action: string, contactId: number) => {
    if (action === "send") {
      handleSendClick(contactId);
    } else {
      onMenuAction(action, contactId);
    }
  };

  // Event details (you can make this dynamic or pass as props)
  const eventDetails = {
    eventName: event?.name,
    eventDate: formatToReadableDate(event?.date),
    eventLocation:
      event?.location_type === "virtual"
        ? event?.virtual_link
        : event?.venue_address,
  };

  return (
    <>
      {/* Bulk Actions Bar - Shows when contacts are selected */}
      {selectedCount > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-800">
                {selectedCount} person{selectedCount > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction("edit")}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleBulkAction("message")}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Message</span>
                </button>
                <button
                  onClick={handleBulkSend}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  <span>Send</span>
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => onSelectAll(false)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      <div className="">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                Phone
              </th>
              {/* <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Plus 1s</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <span>Tags</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                </div>
              </th> */}
              <th className="text-left p-4 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rsvpContact.map((contact) => (
              <ContactTableRow
                key={contact.id}
                contact={contact}
                isSelected={selectedContacts.includes(contact.id)}
                onSelect={onSelectContact}
                onMenuAction={handleMenuAction}
                openDropdown={openDropdown}
                onDropdownToggle={handleDropdownToggle}
                dropdownRef={dropdownRef}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 text-sm text-gray-600">
        <div>
          {contacts.length} People ({selectedCount} selected) → 7 Plus 1s = 9
          Total
        </div>
        <div className="flex items-center space-x-4">
          <span>Page 1 of 1</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <Download size={16} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Send Invitation Modal */}
      <SendInvitationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirmSend={handleConfirmSend}
        recipientCount={modalContacts.length}
        subject={eventDetails?.eventName} // You can make this dynamic
        invitationPreview={previewData?.data?.imageUrl}
        sendFromInfo={user}
        sendToInfo={modalContacts.length === 1 ? modalContacts[0] : null}
        recipients={modalContacts}
        eventDetails={eventDetails}
        rsvpUniqueIds={rsvpUniqueIds}
        eventId={Number(eventId)}
      />
    </>
  );
};
