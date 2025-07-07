

// components/RequireEventId.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RequireEventId = ({ children }: Props) => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setShowModal(true);

      const timeout = setTimeout(() => {
        setShowModal(false);
        navigate("/", { replace: true }); // Redirect after 3s
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [eventId, navigate]);

  if (!eventId && !showModal) {
    return null; // avoid rendering children or empty UI
  }

  if (!eventId && showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-700">
            You cannot access this page directly. You will be redirected shortly.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireEventId;
