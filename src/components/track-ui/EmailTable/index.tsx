import React from "react";
import {
  Search,
  Users,
  Filter,
  Eye,
  Send,
  Clock,
  Mail,
  AlertCircle,
} from "lucide-react";
import { EmailHistory } from "@/types/track";
import { EmptyState } from "./EmptyState";
import { TableHeader } from "./Header";
import { RSVPButton } from "./RSVPButton";

interface EmailTableProps {
  filteredHistory: EmailHistory[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onViewRSVP: (email: EmailHistory) => void;
//   getStatusColor: (status: string) => string;
//   getStatusIcon: (status: string) => React.ReactNode;
}

export const EmailTable: React.FC<EmailTableProps> = ({
  filteredHistory,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onViewRSVP,
//   getStatusColor,
//   getStatusIcon,
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "opened":
          return "bg-green-100 text-green-800 border-green-200";
        case "sent":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "unopened":
          return "bg-gray-100 text-gray-800 border-gray-200";
        case "unsent":
          return "bg-red-100 text-red-800 border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
  
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "opened":
          return <Eye className="w-3 h-3" />;
        case "sent":
          return <Send className="w-3 h-3" />;
        case "pending":
          return <Clock className="w-3 h-3" />;
        case "unopened":
          return <Mail className="w-3 h-3" />;
        case "unsent":
          return <AlertCircle className="w-3 h-3" />;
        default:
          return <Mail className="w-3 h-3" />;
      }
    };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Search and Filter Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-80"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="opened">Opened</option>
              <option value="pending">Pending</option>
              <option value="unopened">Unopened</option>
              <option value="unsent">Unsent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-hidden">
        {filteredHistory.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((email) => (
                  <tr className="hover:bg-gray-50 transition-colors">
                    {/* Recipient */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {email.to}
                          </div>
                          {email.contact && (
                            <div className="text-sm text-gray-500">
                              {email.contact.first_name}{" "}
                              {email.contact.last_name}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    {/* <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {email.subject}
                      </div>
                    </td> */}

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          email.status.toLowerCase()
                        )}`}
                      >
                        {getStatusIcon(email.status.toLowerCase())}
                        <span className="ml-1 capitalize">
                          {email.status.toLowerCase()}
                        </span>
                      </span>
                    </td>

                    {/* Sent Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(email.sent_at)}
                    </td>

                    {/* Opened Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(email.opened_at)}
                    </td>

                    {/* Event */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {email.event?.name || "-"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RSVPButton email={email} onViewRSVP={onViewRSVP} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
