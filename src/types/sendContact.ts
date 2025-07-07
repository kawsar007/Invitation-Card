
export interface TiedContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  has_tied_contact: boolean;
  tied_contacts: TiedContact[];
  couple_greeting?: string;
  plus_one_count?: number;
  contact_type?: "individual" | "couple";
  group_size?: number;
  tags: string[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface ContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  has_tied_contact: boolean;
  tied_contacts?: TiedContact[];
  tags?: string[];
}

export interface ContactsResponseObject {
  success: boolean;
  message: string;
  contacts: Contact[];
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface ContactsResponseObject {
  contacts: Contact[];
}

export type ContactType = 'individual' | 'couple';
export type TabType = 'All' | 'Unsent' | 'Unopened' | 'Opened';