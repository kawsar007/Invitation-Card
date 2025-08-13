import { Contact } from "@/types/sendContact";
import { ChevronDown } from "lucide-react";
import React from "react";
import { ActionDropdown } from "./ActionDropdown";

interface ContactTableRowProps {
  contact: any;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
  onMenuAction: (action: string, contactId: number) => void;
  openDropdown: number | null;
  onDropdownToggle: (contactId: number) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const ContactTableRow: React.FC<ContactTableRowProps> = ({
  contact,
  isSelected,
  onSelect,
  onMenuAction,
  openDropdown,
  onDropdownToggle,
  dropdownRef,
}) => {

  const handleSendClick = () => {
    onMenuAction("send", contact?.contact.id);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(contact?.contact.id, e.target.checked)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900">
            {contact?.contact.first_name} {contact?.contact?.last_name}
          </span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-900">
            {contact?.contact.email}
          </span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-900">
            {contact?.contact.phone}
          </span>
        </div>
      </td>
      {/* <td className="p-4 text-sm text-gray-900">+ 3</td>
      <td className="p-4">
        <span className="inline-flex items-center space-x-1 text-sm">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span className="text-gray-900">Unsent</span>
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          {contact?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white px-2 py-1 text-xs rounded"
            >
              {tag} ×
            </span>
          ))}
          <button className="text-blue-600 text-sm hover:underline">+ Tag</button>
        </div>
      </td> */}
      <td className="p-4">
        <div className="flex items-center space-x-2 relative">
          <button
            onClick={handleSendClick}
            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
          >
            SEND
          </button>
          <div className="relative">
            <button
              onClick={() => onDropdownToggle(contact?.contact.id)}
              className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
            >
              <ChevronDown size={16} />
            </button>

            {openDropdown === contact?.contact.id && (
              <ActionDropdown
                ref={dropdownRef}
                onAction={(action) => onMenuAction(action, contact?.contact.id)}
              />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};
