import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Event } from '@/types/event';
import {
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Info,
  MapPin,
  Users,
  Video
} from "lucide-react";
import React, { useState } from 'react';

interface ViewEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewEventModal: React.FC<ViewEventModalProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopyLink = async () => {
    if (event.virtual_link) {
      try {
        await navigator.clipboard.writeText(event.virtual_link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const handleJoinEvent = () => {
    if (event.location_type === 'virtual' && event.virtual_link) {
      window.open(event.virtual_link, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-2xl font-bold text-slate-800 leading-tight mb-3">
                {event.name}
              </DialogTitle>
              <Badge
                variant={event.location_type === 'virtual' ? 'secondary' : 'default'}
                className={`${event.location_type === 'virtual'
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                  } font-medium text-sm px-3 py-1`}
              >
                {event.location_type === 'virtual' ? (
                  <>
                    <Video className="h-3 w-3 mr-1" />
                    Virtual Event
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3 mr-1" />
                    In-Person Event
                  </>
                )}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details Section */}
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-slate-600" />
              Event Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organizer */}
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Organized by</p>
                  <p className="font-semibold text-slate-800">{event.sender_name}</p>
                </div>
              </div>

              {/* Event ID */}
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-slate-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-600">#</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Event ID</p>
                  <p className="font-semibold text-slate-800">#{event.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Date & Time
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Date</p>
                  <p className="font-semibold text-slate-800">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Time</p>
                  <p className="font-semibold text-slate-800">
                    {formatTime(event.date)} ({event.time_zone})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className={`rounded-lg p-6 ${event.location_type === 'virtual'
            ? 'bg-gradient-to-r from-green-50 to-teal-50'
            : 'bg-gradient-to-r from-emerald-50 to-green-50'
            }`}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              {event.location_type === 'virtual' ? (
                <Video className="h-5 w-5 text-green-600" />
              ) : (
                <MapPin className="h-5 w-5 text-green-600" />
              )}
              Location Details
            </h3>

            {event.location_type === 'virtual' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Event Type</p>
                    <p className="font-semibold text-slate-800">Virtual Meeting</p>
                  </div>
                </div>

                {event.virtual_link && (
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm font-medium text-slate-600 mb-2">Meeting Link</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-slate-700 bg-slate-100 px-3 py-2 rounded flex-1 truncate">
                        {event.virtual_link}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyLink}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {event.virtual_description && (
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Description</p>
                    <p className="text-slate-700">{event.virtual_description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {event.venue_name && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">Venue</p>
                      <p className="font-semibold text-slate-800">{event.venue_name}</p>
                    </div>
                  </div>
                )}

                {event.venue_address && (
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm font-medium text-slate-600 mb-2">Address</p>
                    <p className="text-slate-700">{event.venue_address}</p>
                  </div>
                )}
              </div>
            )}

            {event.location_additional_information && (
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-600 mb-1">Additional Information</p>
                <p className="text-slate-700">{event.location_additional_information}</p>
              </div>
            )}
          </div>

          {/* Metadata Section */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Event Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-slate-600">Created</p>
                <p className="text-slate-700">{formatDateTime(event.created_at)}</p>
              </div>
              <div>
                <p className="font-medium text-slate-600">Last Updated</p>
                <p className="text-slate-700">{formatDateTime(event.updated_at)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            {event.location_type === 'virtual' && event.virtual_link && (
              <Button
                onClick={handleJoinEvent}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Event
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};