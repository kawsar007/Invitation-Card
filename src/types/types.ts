// types.ts
export interface ModifiedBlock {
  id: string;
  type: string;
  originalContent: string;
  newContent: string;
  timestamp: Date;
}

export interface CardVersion {
  id: number;
  content: string;
  timestamp: Date;
  modifiedBlocks: ModifiedBlock[];
}

export interface ContentBlock {
  id: string;
  type: string;
  content: string;
  html: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  thumbnail: string;
  backgroundImage: string;
  content: string;
  description: string;
  category: string; // e.g., "wedding", "birthday", "professional"
}

// Types
export interface Font {
  value: string;
  label: string;
}

export interface Color {
  value: string;
  label: string;
}

export interface FontSize {
  value: string;
  label: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

// Submit RSVP Types

export interface GuestInfo {
  firstName: string;
  lastName: string;
  foodAllergies: 'yes' | 'no' | '';
  transportation: string[];
}

export interface SubmittedData {
  attendance: 'attend' | 'not-attend';
  message: string;
  bringGuest: boolean;
  guestInfo: GuestInfo | null;
  submittedAt: string;
}

export type AttendanceStatus = 'attend' | 'not-attend' | '';