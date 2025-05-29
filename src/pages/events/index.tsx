import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getThemeStyles } from "@/styles/TemplateStyles";
import { ApiResponse, Event, FilterState } from "@/types/event";
import { getAuthToken } from '@/utils/auth';
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, MapPin, Search, Users, Video } from "lucide-react";
import React, { useCallback, useEffect, useState } from 'react';

export interface EventsPageProps {
  theme: string;
}



const EventsPage: React.FC<EventsPageProps> = ({ theme }) => {
  const styles = getThemeStyles(theme);
  const token = getAuthToken();

  // State management
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');

  // Initialize state from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const search = urlParams.get('search') || '';
    const start = urlParams.get('startDate') || '';
    const end = urlParams.get('endDate') || '';
    const location = urlParams.get('locationType') || '';
    const page = parseInt(urlParams.get('page') || '1', 10);
    const pageLimit = parseInt(urlParams.get('limit') || '10', 10);

    setSearchQuery(search);
    setStartDate(start);
    setEndDate(end);
    setLocationType(location);
    setCurrentPage(page);
    setLimit(pageLimit);
  }, []);

  // Update URL params when filters change
  const updateUrlParams = useCallback((filters: Partial<FilterState>) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    // Update or remove parameters
    if (filters.searchQuery !== undefined) {
      if (filters.searchQuery) {
        params.set('search', filters.searchQuery);
      } else {
        params.delete('search');
      }
    }

    if (filters.startDate !== undefined) {
      if (filters.startDate) {
        params.set('startDate', filters.startDate);
      } else {
        params.delete('startDate');
      }
    }

    if (filters.endDate !== undefined) {
      if (filters.endDate) {
        params.set('endDate', filters.endDate);
      } else {
        params.delete('endDate');
      }
    }

    if (filters.locationType !== undefined) {
      if (filters.locationType) {
        params.set('locationType', filters.locationType);
      } else {
        params.delete('locationType');
      }
    }

    if (filters.page !== undefined) {
      if (filters.page > 1) {
        params.set('page', filters.page.toString());
      } else {
        params.delete('page');
      }
    }

    if (filters.limit !== undefined) {
      if (filters.limit !== 10) {
        params.set('limit', filters.limit.toString());
      } else {
        params.delete('limit');
      }
    }

    // Update URL without page reload
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Fetch events function
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (locationType) params.append('locationType', locationType);
      params.append('page', currentPage.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setEvents(data.data);
        setTotalPages(data.meta.pages);
        setTotalEvents(data.meta.total);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, startDate, endDate, locationType, currentPage, limit, token]);

  // Fetch events and update URL when dependencies change
  useEffect(() => {
    fetchEvents();
    updateUrlParams({
      searchQuery,
      startDate,
      endDate,
      locationType,
      page: currentPage,
      limit
    });
  }, [fetchEvents, updateUrlParams, searchQuery, startDate, endDate, locationType, currentPage, limit]);

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setLocationType('');
    setCurrentPage(1);

    // Clear URL params
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: string) => {
    setLimit(parseInt(newLimit, 10));
    setCurrentPage(1);
  };

  // Handle location type change
  const handleLocationTypeChange = (value: string) => {
    setLocationType(value === "all" ? "" : value);
    setCurrentPage(1);
  };

  // Format date for display
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

  // Get location display
  const getLocationDisplay = (event: Event): JSX.Element | null => {
    if (event.location_type === 'virtual') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Video className="h-4 w-4" />
          Virtual Event
        </div>
      );
    } else if (event.location_type === 'physical') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          {event.venue_name || 'Physical Location'}
        </div>
      );
    }
    return null;
  };

  // Generate pagination numbers
  const generatePaginationNumbers = (): number[] => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      let pageNum: number;
      if (totalPages <= 5) {
        pageNum = i + 1;
      } else if (currentPage <= 3) {
        pageNum = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNum = totalPages - 4 + i;
      } else {
        pageNum = currentPage - 2 + i;
      }
      return pageNum;
    });
  };

  return (
    <div className={`${styles.container} min-h-screen`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Manage and view all your events</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  Search
                </Button>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                  />
                </div>

                {/* Location Type */}
                <div className="space-y-2">
                  <Label>Location Type</Label>
                  <Select
                    value={locationType || "all"}
                    onValueChange={handleLocationTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Items per page */}
                <div className="space-y-2">
                  <Label>Items per page</Label>
                  <Select value={limit.toString()} onValueChange={handleLimitChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reset Filters */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {events.length} of {totalEvents} events
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600">
                Error: {error}
              </div>
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
            {events.map((event: Event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <Badge variant={event.location_type === 'virtual' ? 'secondary' : 'default'}>
                      {event.location_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Sender */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {event.sender_name}
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)}
                  </div>

                  {/* Timezone */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {event.time_zone}
                  </div>

                  {/* Location */}
                  {getLocationDisplay(event)}

                  {/* Virtual Link */}
                  {event.location_type === 'virtual' && event.virtual_link && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(event.virtual_link!, '_blank')}
                        className="w-full"
                      >
                        Join Virtual Event
                      </Button>
                    </div>
                  )}

                  {/* Venue Address */}
                  {event.location_type === 'physical' && event.venue_address && (
                    <div className="text-sm text-gray-600">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {event.venue_address}
                    </div>
                  )}
                </CardContent>
              </Card>
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
                {searchQuery || startDate || endDate || locationType
                  ? "Try adjusting your search criteria or filters."
                  : "No events have been created yet."}
              </p>
              {(searchQuery || startDate || endDate || locationType) && (
                <Button onClick={handleResetFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {!loading && events.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {generatePaginationNumbers().map((pageNum: number) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;




// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getThemeStyles } from "@/styles/TemplateStyles";
// import { getAuthToken } from '@/utils/auth';
// import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, MapPin, Search, Users, Video } from "lucide-react";
// import { useCallback, useEffect, useState } from 'react';

// const EventsPage = ({ theme }) => {
//   const styles = getThemeStyles(theme);
//   const token = getAuthToken();
//   // State management
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalEvents, setTotalEvents] = useState(0);
//   const [limit, setLimit] = useState(10);

//   // Filter and search state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [locationType, setLocationType] = useState('');

//   // Fetch events function
//   const fetchEvents = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Build query parameters
//       const params = new URLSearchParams();
//       if (searchQuery) params.append('search', searchQuery);
//       if (startDate) params.append('startDate', startDate);
//       if (endDate) params.append('endDate', endDate);
//       if (locationType) params.append('locationType', locationType);
//       params.append('page', currentPage.toString());
//       params.append('limit', limit.toString());

//       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event?${params}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }

//       const data = await response.json();

//       if (data.success) {
//         setEvents(data.data);
//         setTotalPages(data.meta.pages);
//         setTotalEvents(data.meta.total);
//       } else {
//         throw new Error(data.message || 'Failed to fetch events');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching events:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchQuery, startDate, endDate, locationType, currentPage, limit, token]);

//   // Fetch events on component mount and when dependencies change
//   useEffect(() => {
//     fetchEvents();
//   }, [fetchEvents]);

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1); // Reset to first page when searching
//     fetchEvents();
//   };

//   // Handle filter reset
//   const handleResetFilters = () => {
//     setSearchQuery('');
//     setStartDate('');
//     setEndDate('');
//     setLocationType('');
//     setCurrentPage(1);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get location display
//   const getLocationDisplay = (event) => {
//     if (event.location_type === 'virtual') {
//       return (
//         <div className="flex items-center gap-1 text-sm text-gray-600">
//           <Video className="h-4 w-4" />
//           Virtual Event
//         </div>
//       );
//     } else if (event.location_type === 'physical') {
//       return (
//         <div className="flex items-center gap-1 text-sm text-gray-600">
//           <MapPin className="h-4 w-4" />
//           {event.venue_name || 'Physical Location'}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className={`${styles.container} min-h-screen`}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
//           <p className="text-gray-600">Manage and view all your events</p>
//         </div>

//         {/* Search and Filters */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Filter className="h-5 w-5" />
//               Search & Filters
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSearch} className="space-y-4">
//               {/* Search Bar */}
//               <div className="flex gap-2">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     type="text"
//                     placeholder="Search events..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <Button type="submit" disabled={loading}>
//                   Search
//                 </Button>
//               </div>

//               {/* Filters Row */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 {/* Start Date */}
//                 <div className="space-y-2">
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>

//                 {/* End Date */}
//                 <div className="space-y-2">
//                   <Label htmlFor="endDate">End Date</Label>
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>

//                 {/* Location Type */}
//                 <div className="space-y-2">
//                   <Label>Location Type</Label>
//                   <Select value={locationType || "all"} onValueChange={(value) => setLocationType(value === "all" ? "" : value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="All locations" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All locations</SelectItem>
//                       <SelectItem value="virtual">Virtual</SelectItem>
//                       <SelectItem value="physical">Physical</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Items per page */}
//                 <div className="space-y-2">
//                   <Label>Items per page</Label>
//                   <Select value={limit.toString()} onValueChange={(value) => {
//                     setLimit(parseInt(value));
//                     setCurrentPage(1);
//                   }}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">5</SelectItem>
//                       <SelectItem value="10">10</SelectItem>
//                       <SelectItem value="20">20</SelectItem>
//                       <SelectItem value="50">50</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Reset Filters */}
//               <div className="flex justify-end">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleResetFilters}
//                 >
//                   Reset Filters
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Results Summary */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-sm text-gray-600">
//             Showing {events.length} of {totalEvents} events
//           </div>
//           <div className="text-sm text-gray-600">
//             Page {currentPage} of {totalPages}
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <Card className="mb-6 border-red-200 bg-red-50">
//             <CardContent className="pt-6">
//               <div className="text-red-600">
//                 Error: {error}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//           </div>
//         )}

//         {/* Events Grid */}
//         {!loading && events.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {events.map((event) => (
//               <Card key={event.id} className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg">{event.name}</CardTitle>
//                     <Badge variant={event.location_type === 'virtual' ? 'secondary' : 'default'}>
//                       {event.location_type}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {/* Sender */}
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Users className="h-4 w-4" />
//                     {event.sender_name}
//                   </div>

//                   {/* Date and Time */}
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Calendar className="h-4 w-4" />
//                     {formatDate(event.date)}
//                   </div>

//                   {/* Timezone */}
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Clock className="h-4 w-4" />
//                     {event.time_zone}
//                   </div>

//                   {/* Location */}
//                   {getLocationDisplay(event)}

//                   {/* Virtual Link */}
//                   {event.location_type === 'virtual' && event.virtual_link && (
//                     <div className="pt-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => window.open(event.virtual_link, '_blank')}
//                         className="w-full"
//                       >
//                         Join Virtual Event
//                       </Button>
//                     </div>
//                   )}

//                   {/* Venue Address */}
//                   {event.location_type === 'physical' && event.venue_address && (
//                     <div className="text-sm text-gray-600">
//                       <MapPin className="h-4 w-4 inline mr-1" />
//                       {event.venue_address}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && events.length === 0 && (
//           <Card className="text-center py-12">
//             <CardContent>
//               <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
//               <p className="text-gray-600 mb-4">
//                 {searchQuery || startDate || endDate || locationType
//                   ? "Try adjusting your search criteria or filters."
//                   : "No events have been created yet."}
//               </p>
//               {(searchQuery || startDate || endDate || locationType) && (
//                 <Button onClick={handleResetFilters} variant="outline">
//                   Clear Filters
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         )}

//         {/* Pagination */}
//         {!loading && events.length > 0 && totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               Previous
//             </Button>

//             <div className="flex space-x-1">
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <Button
//                     key={pageNum}
//                     variant={currentPage === pageNum ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => setCurrentPage(pageNum)}
//                   >
//                     {pageNum}
//                   </Button>
//                 );
//               })}
//             </div>

//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;







// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getThemeStyles } from "@/styles/TemplateStyles";
// import { getAuthToken } from "@/utils/auth";
// import { Calendar, Loader2, MapPin, Search, X } from "lucide-react";
// import { useCallback, useEffect, useState } from 'react';

// const EventsPage = ({ theme }) => {
//   const styles = getThemeStyles(theme);
//   const token = getAuthToken();

//   // State management
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Filter and pagination state
//   const [filters, setFilters] = useState({
//     search: '',
//     startDate: '',
//     endDate: '',
//     page: 1,
//     limit: 10
//   });

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalEvents: 0,
//     hasNext: false,
//     hasPrev: false
//   });

//   // Debounced search to avoid too many API calls
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Fetch events function
//   const fetchEvents = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Build query parameters
//       const params = new URLSearchParams();

//       if (filters.search) params.append('search', filters.search);
//       if (filters.startDate) params.append('startDate', filters.startDate);
//       if (filters.endDate) params.append('endDate', filters.endDate);
//       params.append('page', filters.page.toString());
//       params.append('limit', filters.limit.toString());

//       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/event?${params}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Assuming API returns: { events: [], pagination: { ... } }
//       setEvents(data.events || data.data || data);
//       setPagination({
//         currentPage: data.pagination?.currentPage || filters.page,
//         totalPages: data.pagination?.totalPages || 1,
//         totalEvents: data.pagination?.total || data.events?.length || 0,
//         hasNext: data.pagination?.hasNext || false,
//         hasPrev: data.pagination?.hasPrev || false
//       });

//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching events:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters.endDate, filters.limit, filters.page, filters.search, filters.startDate, token]);

//   // Fetch events when filters change
//   useEffect(() => {
//     fetchEvents();
//   }, [fetchEvents]);

//   // Handle filter changes
//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [field]: value,
//       page: field !== 'page' ? 1 : value // Reset to page 1 unless changing page
//     }));
//   };

//   // Handle pagination
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       handleFilterChange('page', newPage);
//     }
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilters({
//       search: '',
//       startDate: '',
//       endDate: '',
//       page: 1,
//       limit: 10
//     });
//   };

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Format time helper
//   const formatTime = (timeString) => {
//     if (!timeString) return '-';
//     return new Date(timeString).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get event status badge
//   const getEventStatus = (event) => {
//     const now = new Date();
//     const eventDate = new Date(event.date || event.startDate);

//     if (eventDate < now) {
//       return <Badge variant="secondary">Past</Badge>;
//     } else if (eventDate.toDateString() === now.toDateString()) {
//       return <Badge variant="default">Today</Badge>;
//     } else {
//       return <Badge variant="outline">Upcoming</Badge>;
//     }
//   };

//   return (
//     <div className={`${styles.container}`}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
//           <p className="text-gray-600">Discover and explore upcoming events</p>
//         </div>

//         {/* Filters Section */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Search className="h-5 w-5" />
//               Filter Events
//             </CardTitle>
//             <CardDescription>
//               Use the filters below to find specific events
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               {/* Search Input */}
//               <div className="space-y-2">
//                 <Label htmlFor="search">Search Events</Label>
//                 <div className="relative">
//                   <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="search"
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="e.g., wedding, conference..."
//                     className="pl-8"
//                   />
//                 </div>
//               </div>

//               {/* Start Date */}
//               <div className="space-y-2">
//                 <Label htmlFor="startDate">Start Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={filters.startDate}
//                     onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                     className="pl-8"
//                   />
//                 </div>
//               </div>

//               {/* End Date */}
//               <div className="space-y-2">
//                 <Label htmlFor="endDate">End Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={filters.endDate}
//                     onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                     className="pl-8"
//                   />
//                 </div>
//               </div>

//               {/* Items per page */}
//               <div className="space-y-2">
//                 <Label htmlFor="limit">Items per page</Label>
//                 <Select
//                   value={filters.limit.toString()}
//                   onValueChange={(value) => handleFilterChange('limit', parseInt(value))}
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="5">5</SelectItem>
//                     <SelectItem value="10">10</SelectItem>
//                     <SelectItem value="20">20</SelectItem>
//                     <SelectItem value="50">50</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Clear Filters Button */}
//             <Button
//               variant="outline"
//               onClick={clearFilters}
//               className="flex items-center gap-2"
//             >
//               <X className="h-4 w-4" />
//               Clear Filters
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Results Info */}
//         <Card className="mb-6">
//           <CardContent className="py-4">
//             <div className="flex justify-between items-center text-sm text-muted-foreground">
//               <div>
//                 Showing <span className="font-medium text-foreground">{events.length}</span> of{' '}
//                 <span className="font-medium text-foreground">{pagination.totalEvents}</span> events
//               </div>
//               <div>
//                 Page <span className="font-medium text-foreground">{pagination.currentPage}</span> of{' '}
//                 <span className="font-medium text-foreground">{pagination.totalPages}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Loading State */}
//         {loading && (
//           <Card>
//             <CardContent className="flex justify-center items-center py-12">
//               <Loader2 className="h-8 w-8 animate-spin mr-2" />
//               <span className="text-muted-foreground">Loading events...</span>
//             </CardContent>
//           </Card>
//         )}

//         {/* Error State */}
//         {error && (
//           <Card className="border-destructive">
//             <CardContent className="py-6">
//               <div className="flex items-start gap-3">
//                 <div className="text-destructive">⚠️</div>
//                 <div className="flex-1">
//                   <h3 className="font-medium text-destructive">Error loading events</h3>
//                   <p className="text-sm text-muted-foreground mt-1">{error}</p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={fetchEvents}
//                     className="mt-3"
//                   >
//                     Try again
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* No Events State */}
//         {!loading && !error && events.length === 0 && (
//           <Card>
//             <CardContent className="text-center py-12">
//               <div className="text-muted-foreground text-6xl mb-4">📅</div>
//               <h3 className="text-lg font-medium mb-2">No events found</h3>
//               <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Events Table */}
//         {!loading && !error && events.length > 0 && (
//           <Card>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Event</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Time</TableHead>
//                     <TableHead>Location</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {events.map((event, index) => (
//                     <TableRow key={event.id || index}>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">
//                             {event.title || event.name || 'Untitled Event'}
//                           </div>
//                           {event.description && (
//                             <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
//                               {event.description}
//                             </div>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           {formatDate(event.date || event.startDate)}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         {formatTime(event.time || event.startTime)}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <MapPin className="h-4 w-4 text-muted-foreground" />
//                           <span className="truncate max-w-[150px]">
//                             {event.location || '-'}
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         {getEventStatus(event)}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button variant="outline" size="sm">
//                           View Details
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         )}

//         {/* Pagination */}
//         {!loading && !error && pagination.totalPages > 1 && (
//           <Card className="mt-6">
//             <CardContent className="py-4">
//               <div className="flex justify-center items-center space-x-2">
//                 {/* Previous Button */}
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(pagination.currentPage - 1)}
//                   disabled={!pagination.hasPrev}
//                 >
//                   Previous
//                 </Button>

//                 {/* Page Numbers */}
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.currentPage - 2 + i;
//                   }

//                   return (
//                     <Button
//                       key={pageNum}
//                       variant={pageNum === pagination.currentPage ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => handlePageChange(pageNum)}
//                     >
//                       {pageNum}
//                     </Button>
//                   );
//                 })}

//                 {/* Next Button */}
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(pagination.currentPage + 1)}
//                   disabled={!pagination.hasNext}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;