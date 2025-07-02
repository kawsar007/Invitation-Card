
export interface TiedContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  has_tied_contact: boolean;
  tied_contacts: TiedContact[];
  tags: string[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
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