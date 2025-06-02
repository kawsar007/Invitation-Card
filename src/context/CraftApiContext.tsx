
import { CraftApiResponse, InvitationCard } from '@/types/craftApi';
import { getAuthToken } from "@/utils/auth";
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { toast } from 'sonner';

interface CraftApiContextType {
  // state
  invitations: InvitationCard[];
  loading: boolean;
  error: string | null;

  // Actions
  craftInvitation: (eventId: string, formattedContent: string) => Promise<boolean>;
  fetchInvitations: (eventId: string) => Promise<void>;
  refreshInvitations: () => Promise<void>;

  // Utilities
  getInvitationById: (id: number) => InvitationCard | undefined;
  getLatestInvitation: () => InvitationCard | undefined;
  clearError: () => void;
}

const CraftApiContext = createContext<CraftApiContextType | undefined>(undefined);

interface CraftApiProviderProps {
  children: ReactNode;
}

export const CraftApiProvider: React.FC<CraftApiProviderProps> = ({ children }) => {
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Invitations: --->", invitations);

  const makeAuthenticatedRequest = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getAuthToken();

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }, [])


  // Fetch invitations
  const fetchInvitations = useCallback(async (eventId?: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/cards`;
      const response = await makeAuthenticatedRequest(url);
      const result: CraftApiResponse = await response.json();

      console.log("Result: --->", result);

      if (result.success && result?.data) {
        const invitationData = Array.isArray(result?.data) ? result?.data : [result?.data];
        setInvitations(invitationData);
      } else {
        setError(result?.message || "Failed to fetch invitations");
      }
    } catch (error) {
      const errorMsg = "Failed to fetch invitations";
      setError(errorMsg);
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedRequest]);

  // Craft a new invitation 
  const craftInvitation = useCallback(async (
    eventId: string,
    formattedContent: string,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/craft`, {
        method: 'POST',
        body: JSON.stringify({
          html: formattedContent
        })
      })

      const result: CraftApiResponse = await response.json();

      if (result.success) {
        toast.success(result?.message || "Invitation crafted successfully!");

        // If the response includes the new invitation data, add it to state
        if (result?.data && !Array.isArray(result?.data)) {
          setInvitations(prev => [...prev, result?.data as InvitationCard]);
        } else {
          // Otherwise, refresh the invitations list
          await fetchInvitations(eventId);
        }
        return true;
      } else {
        const errorMsg = result?.message || "Failed to craft invitation";
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }

    } catch (error) {
      const errorMsg = "Failed to craft invitation";
      setError(error.message || errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }

  }, [fetchInvitations, makeAuthenticatedRequest])



  // Refresh invitations (alias for fetchInvitations)
  const refreshInvitations = useCallback(async (): Promise<void> => {
    fetchInvitations();
  }, [fetchInvitations]);

  const getInvitationById = useCallback((id: number): InvitationCard | undefined => {
    return invitations.find(invitation => invitation.id === id);
  }, [invitations]);

  const getLatestInvitation = useCallback((): InvitationCard | undefined => {
    if (invitations.length === 0) return undefined;

    return invitations.reduce((latest, current) => new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest)
  }, [invitations]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: CraftApiContextType = {
    // state
    invitations,
    loading,
    error,

    // Actions
    craftInvitation,
    fetchInvitations,
    refreshInvitations,

    // Utilities
    getInvitationById,
    getLatestInvitation,
    clearError,
  }

  return (
    <CraftApiContext.Provider value={value}>
      {children}
    </CraftApiContext.Provider>
  )
}

// Custom hook to use the context
export const useCraftApi = (): CraftApiContextType => {
  const context = useContext(CraftApiContext);

  if (context === undefined) {
    throw new Error('useCraftApi must be used within a CraftApiProvider');
  }

  return context;
};