import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from '@/types/event';
import { Calendar, Clock, ExternalLink, Eye, MapPin, Users, Video } from "lucide-react";
import React, { useState } from 'react';
import DeleteModal from "./DeleteModal";
import { ViewEventModal } from "./ViewEventModal";

interface EventCardProps {
  event: Event;
  onDelete?: (eventId: string) => void;
  onView?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onView }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLocationDisplay = (): JSX.Element | null => {
    if (event.location_type === 'virtual') {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Video className="h-4 w-4 text-blue-500" />
          <span>Virtual Event</span>
        </div>
      );
    } else if (event.location_type === 'physical') {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-green-500" />
          <span>{event.venue_name || 'Physical Location'}</span>
        </div>
      );
    }
    return null;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(event.id.toString());
    }
    setIsDeleteDialogOpen(false);
  };

  const handleView = () => {
    setIsViewModalOpen(true);
    if (onView) {
      onView(event.id.toString());
    }
  };

  const handleJoinEvent = () => {
    if (event.location_type === 'virtual' && event.virtual_link) {
      window.open(event.virtual_link, '_blank');
    }
  };

  return (
    <>
      <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ padding: '1px' }}>
          <div className="h-full w-full bg-white rounded-lg" />
        </div>

        <div className="relative z-10">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-3">
                <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-2">
                  {event.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={event.location_type === 'virtual' ? 'secondary' : 'default'}
                    className={`${event.location_type === 'virtual'
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                      } font-medium`}
                  >
                    {event.location_type === 'virtual' ? 'Virtual' : 'In-Person'}
                  </Badge>
                </div>
              </div>

              {/* Delete Icon with Confirmation Modal */}
              {onDelete && (
                <DeleteModal
                  event={event}
                  handleDelete={handleDelete}
                  confirmDelete={confirmDelete}
                  isDeleteDialogOpen={isDeleteDialogOpen}
                  setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                />
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-6">
            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="font-medium">{event.sender_name}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{formatDate(event.date)}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{event.time_zone}</span>
              </div>

              {getLocationDisplay()}

              {/* Physical Location Address */}
              {event.location_type === 'physical' && event.venue_address && (
                <div className="pl-6 text-sm text-slate-500 bg-slate-50 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{event.venue_address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                {/* View Event Button */}
                <Button
                  variant="outline"
                  onClick={handleView}
                  className="flex-1 border-slate-200 text-slate-700 hover:text-slate-700 hover:bg-gray-50 hover:border-slate-300 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Event
                </Button>

                {/* Join Event / Virtual Event Button */}
                {event.location_type === 'virtual' && event.virtual_link && (
                  <Button
                    onClick={handleJoinEvent}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Join Event
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* View Event Modal */}
      <ViewEventModal
        event={event}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </>
  );
};