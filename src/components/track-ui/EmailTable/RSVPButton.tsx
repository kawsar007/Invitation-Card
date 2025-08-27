import { EmailHistory } from "@/types/track";
import { Eye, Mail } from "lucide-react";

interface RSVPButtonProps {
  email: EmailHistory;
  onViewRSVP: (email: EmailHistory) => void;
}

export const RSVPButton: React.FC<RSVPButtonProps> = ({ email, onViewRSVP }) => {
  if (email.submit_rsvp) {
    return (
      <button
        onClick={() => onViewRSVP(email)}
        className="inline-flex items-center px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-800 text-xs font-medium rounded-full transition-colors cursor-pointer"
      >
        <Eye className="w-3 h-3 mr-1" />
        View RSVP
      </button>
    );
  }

  return (
    <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
      <Mail className="w-3 h-3 mr-1" />
      No Response
    </span>
  );
};