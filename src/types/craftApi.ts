export interface InvitationCard {
  id: number;
  event_id: number;
  user_id: number;
  version: number;
  html: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CraftApiResponse {
  success: boolean;
  message?: string;
  data?: InvitationCard[] | InvitationCard;
}

export interface PreviewData {
  success: boolean;
  message?: string;
  data?: {
    imageUrl?: string;
    status?: string;
  };
}