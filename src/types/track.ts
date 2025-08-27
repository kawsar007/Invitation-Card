import { GuestInfo } from "./types";

export interface EmailHistory {
  id: number;
  user_id: number;
  event_id: number;
  contact_id: number;
  message_id: string;
  rsvp_id: string | null;
  status: "PENDING" | "SENT" | "OPENED" | "UNOPENED" | "UNSENT";
  to: string;
  subject: string;
  sent_at: string | null;
  opened_at: string | null;
  submit_rsvp: boolean;
  error: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  event: {
    id: number;
    name: string;
  };
  contact: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface SubmitRSVPResponse {
  id: number;
  rsvp_id: string;
  user_id: number;
  contact_id: number;
  attendance: string;
  food_allergies: string;
  allergy_details: string;
  transportation: string[];
  message: string;
  bring_guest: boolean;
  guest_info: GuestInfo[];
  submitted_at: string;
  created_at: string;
  updated_at: string;
  rsvp: {
    id: number;
    contact_id: number;
    allow_count: number;
    allow: any[];
    event_id: number;
    invitation_card_id: number;
    version: number;
    user_id: number;
    tags: any[];
    unique_id: string;
    created_at: string;
    updated_at: string;
    event: {
      id: number;
      name: string;
      sender_name: string;
      location_type: string;
      venue_name: string | null;
      venue_address: string | null;
      virtual_description: string | null;
      virtual_link: string;
      date: string;
      time_zone: string;
      location_additional_information: string | null;
      is_deleted: boolean;
      created_by: number;
      created_at: string;
      updated_at: string;
    };
    contact: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      has_tied_contact: boolean;
      tied_contacts: any;
      tags: any;
      is_deleted: boolean;
      user_id: number;
      created_at: string;
      updated_at: string;
    };
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
    };
  };
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  data: SubmitRSVPResponse;
}

export interface EmailStats {
  total: number;
  pending: number;
  sent: number;
  opened: number;
  unopened: number;
  unsent: number;
}
