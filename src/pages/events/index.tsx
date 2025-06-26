
import { EventCard } from "@/components/all-events/EventCard";
import { EventFilters } from "@/components/all-events/EventFilters";
import { Pagination } from "@/components/all-events/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEvents } from "@/hooks/events/useEvents";
import { useUrlState } from "@/hooks/events/useUrlState";
import { getThemeStyles } from "@/styles/TemplateStyles";
import { Calendar } from "lucide-react";
import React, { useEffect } from 'react';
import { toast } from "sonner";

export interface EventsPageProps {
  theme: string;
}

const EventsPage: React.FC<EventsPageProps> = ({ theme }) => {
  const styles = getThemeStyles(theme);
  const { events, loading, error, totalPages, totalEvents, fetchEvents, deleteEvent,
    isEventDeleting,
    clearError } = useEvents();
  const { filters, updateFilters, resetFilters } = useUrlState();

  console.log("Events:", events);


  // Fetch events when filters change
  useEffect(() => {
    fetchEvents(filters);
  }, [fetchEvents, filters]);

  const hasActiveFilters = Boolean(
    filters.searchQuery || filters.startDate || filters.endDate || filters.locationType
  );

  // Delete event function
  const handleDeleteEvent = async (eventId: string) => {
    const result = await deleteEvent(eventId);

    if (result.success) {
      // Show success message
      toast.success(result.message);
    } else {
      // Show error message
      toast.error(result.message);
    }
  }

  return (
    <div className={`${styles.container} min-h-screen`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Manage and view all your events</p>
        </div>

        {/* Filters */}
        <EventFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onResetFilters={resetFilters}
          loading={loading}
        />

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {events.length} of {totalEvents} events
          </div>
          <div className="text-sm text-gray-600">
            Page {filters.page} of {totalPages}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600">Error: {error}</div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={handleDeleteEvent}
              // onView={handleViewEvent}
              // Optional: Show loading state for the specific card being deleted
              // isDeleting={isEventDeleting(event.id.toString)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                {hasActiveFilters
                  ? "Try adjusting your search criteria or filters."
                  : "No events have been created yet."}
              </p>
              {hasActiveFilters && (
                <Button onClick={resetFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {!loading && events.length > 0 && (
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => updateFilters({ page })}
          />
        )}
      </div>
    </div>
  );
};

export default EventsPage;