import { EmailTable } from "@/components/track-ui/EmailTable";
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
  Mail,
  Send,
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
  const [selectedRSVP, setSelectedRSVP] = useState<SubmitRSVPResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingRSVP, setLoadingRSVP] = useState(false);

  // Use your actual service calls instead of mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [historyData, statsData] = await Promise.all([
          EmailHistoryService.getEmailHistory({ userId, eventId, latestOnly: true }),
          EmailHistoryService.getEmailStats(userId, eventId),
        ]);
        console.log("History Data:", historyData);
        
        setHistory(
          historyData.map((item: any) => ({
            ...item,
            rsvp_id: item.rsvp_id ?? null,
            submit_rsvp: item.submit_rsvp ?? null,
          }))
        );
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
              title="Unopened"
              value={stats.unopened}
              icon={<Clock className="w-6 h-6 text-yellow-600" />}
              color="bg-yellow-100"
              subtitle={`In Queue:${stats.unopened}`}
              // subtitle={`In Queue:${stats.unsent + stats.pending}`}
            />
          </div>
        )}

        {/*Email Table & Filters and Search */}
        <EmailTable
          filteredHistory={filteredHistory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onViewRSVP={handleViewRSVP}
        />
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
