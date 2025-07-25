import axios from 'axios';


export interface EmailHistory {
  id: number;
  user_id: number;
  event_id?: number;
  contact_id?: number;
  message_id?: string;
  status: 'PENDING' | 'SENT' | 'OPENED' | 'UNOPENED' | 'UNSENT';
  to: string;
  subject: string;
  sent_at?: string;
  opened_at?: string;
  error?: string;
  created_at: string;
  updated_at: string;
  user: { id: number; first_name: string; last_name: string; email: string };
  event?: { id: number; name: string };
  contact?: { id: number; first_name: string; last_name: string; email: string };
}

export interface EmailStats {
  total: number;
  pending: number;
  sent: number;
  opened: number;
  unopened: number;
  unsent: number;
}

export const EmailHistoryService = {
  async getEmailHistory(params: {
    userId?: number;
    eventId?: number;
    contactId?: number;
    status?: 'PENDING' | 'SENT' | 'OPENED' | 'UNOPENED' | 'UNSENT';
  }): Promise<EmailHistory[]> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/email-history`, { params });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching email history:', error);
      throw error;
    }
  },

  async getEmailStats(userId: number, eventId?: number): Promise<EmailStats> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/email-history/stats`, {
        params: { userId, eventId },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching email stats:', error);
      throw error;
    }
  },

  async getOpenedEmailCount(userId: number, eventId?: number): Promise<number> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/email-history/opened-count`, {
        params: { userId, eventId },
      });
      return response.data.data.opened;
    } catch (error) {
      console.error('Error fetching opened email count:', error);
      throw error;
    }
  }
}