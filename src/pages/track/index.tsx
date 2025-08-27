import { RSVPResponseModal } from "@/components/track-ui/RSVPResponseModal";
import { StatsCard } from "@/components/track-ui/StatsCard";
import { TrackLoading } from "@/components/track-ui/TrackLoading";
import { EmailHistoryService } from "@/services/emailHistoryService";
import {
  EmailHistory,
  EmailStats,
  RSVPResponse,
  SubmitRSVPResponse,
} from "@/types/track";
import { getAuthToken } from "@/utils/auth";
import {
  AlertCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Mail,
  Search,
  Send,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface EmailHistoryDashboardProps {
  userId: number;
  eventId?: number;
}

export const TrackInvitationPage: React.FC<EmailHistoryDashboardProps> = ({
  userId,
  eventId,
}) => {
  const token = getAuthToken();
  const [history, setHistory] = useState<EmailHistory[]>([]);
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedRSVP, setSelectedRSVP] = useState<SubmitRSVPResponse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingRSVP, setLoadingRSVP] = useState(false);

  // Use your actual service calls instead of mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [historyData, statsData] = await Promise.all([
          EmailHistoryService.getEmailHistory({ userId, eventId }),
          EmailHistoryService.getEmailStats(userId, eventId),
        ]);
        setHistory(historyData);
        setStats(statsData);
      } catch (err) {
        setError("Failed to load email history");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, eventId]);

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

  const handleViewRSVP = async (email: EmailHistory) => {
    if (!email.submit_rsvp) return;
    setLoadingRSVP(true);
    setIsModalOpen(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/rsvp-response/fetch?rsvpId=${
          email?.rsvp_id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const rsvpData: RSVPResponse = await response.json();
      setSelectedRSVP(rsvpData.data);
    } catch (err) {
      console.error("Failed to fetch RSVP data", err);
      setSelectedRSVP(null);
    } finally {
      setLoadingRSVP(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRSVP(null);
    setLoadingRSVP(false);
  };
  const filteredHistory = history.filter((email) => {
    const matchesSearch =
      email.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || email.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // console.log("Filtered History:", filteredHistory);

  const openRate = stats
    ? ((stats.opened / (stats.sent || 1)) * 100).toFixed(1)
    : "0";

  if (isLoading) {
    return <TrackLoading />;
  } 

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Track Email
              </h1>
              <p className="text-gray-600">
                Track and monitor your email campaigns performance
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Send className="w-4 h-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Emails"
              value={stats.total}
              icon={<Mail className="w-6 h-6 text-blue-600" />}
              color="bg-blue-100"
              trend="+12%"
            />
            <StatsCard
              title="Sent"
              value={stats.sent}
              icon={<Send className="w-6 h-6 text-green-600" />}
              color="bg-green-100"
              subtitle="Delivery Rate:98.2%"
            />
            <StatsCard
              title="Opened"
              value={stats.opened}
              icon={<Eye className="w-6 h-6 text-purple-600" />}
              color="bg-purple-100"
              subtitle={`Open Rate:${openRate}%`}
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={<Clock className="w-6 h-6 text-yellow-600" />}
              color="bg-yellow-100"
              subtitle={`In Queue:${stats.unsent + stats.pending}`}
            />
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
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

          {/* Email List */}
          <div className="overflow-hidden">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No emails found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Opened
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((email) => (
                      <tr
                        key={email.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
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
                                  {email.contact?.first_name}
                                  {email.contact?.last_name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {email.subject}
                          </div>
                        </td>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {email.sent_at
                            ? new Date(email.sent_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {email.opened_at
                            ? new Date(email.opened_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {email.event?.name || "-"}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {email.submit_rsvp ? (
                              <button
                                onClick={() => handleViewRSVP(email)}
                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                              >
                                Viewed RSVP
                              </button>
                            ) : (
                              <button className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                No Response
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* RSVP Response Modal */}
        <RSVPResponseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          rsvpData={selectedRSVP}
          loading={loadingRSVP}
        />
      </div>
    </div>
  );
};
