import {
  CheckCircle,
  Copy,
  Facebook,
  HelpCircle,
  History,
  Mail,
  MessageCircle,
  MessageSquare,
  Trash2
} from 'lucide-react';
import { forwardRef } from 'react';

interface ActionDropdownProps {
  onAction: (action: string) => void;
}

export const ActionDropdown = forwardRef<HTMLDivElement, ActionDropdownProps>(
  ({ onAction }, ref) => {
    const dropdownMenuItems = [
      { icon: History, label: 'View History' },
      { icon: MessageSquare, label: 'Send Message' },
      { icon: Facebook, label: 'Send with Facebook', hasInfo: true },
      { icon: MessageCircle, label: 'Send with WhatsApp', hasInfo: true },
      { icon: Copy, label: 'Copy Link / Send Plaintext' },
      { icon: CheckCircle, label: 'Mark as Sent' },
      { icon: Mail, label: 'Preview Invitation' },
      { icon: Mail, label: 'Preview Envelope' },
      { icon: Trash2, label: 'Delete' }
    ];

    return (
      <div
        ref={ref}
        className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
      >
        <div className="py-1">
          {dropdownMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onAction(item.label.toLowerCase().replace(/\s+/g, '_'))}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
            >
              <item.icon size={16} className="text-gray-500 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.hasInfo && (
                <HelpCircle size={14} className="text-gray-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ActionDropdown.displayName = 'ActionDropdown';