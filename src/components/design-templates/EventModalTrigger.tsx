import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "./CreateEventModal";

interface EventModalTriggerProps {
  templateId: string;
  isAuthenticated: boolean;
  className?: string;
  children?: React.ReactNode;
  onSuccess?: (templateId: string, customizationId?: string) => void;
}

export function EventModalTrigger({
  templateId,
  isAuthenticated,
  className = "",
  children,
  onSuccess
}: EventModalTriggerProps) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center transition-colors ${className}`}
      >
        {children || (
          <>
            Customize this design
            <ArrowRight className="w-4 h-4 ml-1" />
          </>
        )}
      </button>

      {isAuthenticated && (
        <CreateEventModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          templateId={templateId}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}