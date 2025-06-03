// Type definitions
export interface Event {
  id: number;
  name: string;
  sender_name: string;
  location_type: 'virtual' | 'physical';
  venue_name: string | null;
  venue_address: string | null;
  virtual_description: string | null;
  virtual_link: string | null;
  date: string;
  time_zone: string;
  location_additional_information: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface EventApiResponse {
  success: boolean;
  message: string;
  data: Event[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface FilterState {
  searchQuery: string;
  startDate: string;
  endDate: string;
  locationType: string;
  page: number;
  limit: number;
}

export interface EventResponseObject {
  success: boolean;
  message: string;
  data: Event;
}