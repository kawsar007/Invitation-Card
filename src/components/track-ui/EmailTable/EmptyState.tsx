import { Mail } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500 text-lg mb-2">No emails found</p>
      <p className="text-gray-400 text-sm">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};