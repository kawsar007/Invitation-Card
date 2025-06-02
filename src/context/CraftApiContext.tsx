
import { CraftApiResponse, InvitationCard, PreviewData } from '@/types/craftApi';
import { getAuthToken } from "@/utils/auth";
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { toast } from 'sonner';

interface CraftApiContextType {
  // state
  invitations: InvitationCard[];
  loading: boolean;
  error: string | null;
  previewLoading: boolean;
  previewData: PreviewData | null;

  lastCraftedInvitation: InvitationCard | null;

  // Actions
  craftInvitation: (eventId: string, formattedContent: string) => Promise<boolean>;
  fetchInvitations: (eventId: string) => Promise<void>;
  refreshInvitations: () => Promise<void>;

  previewInvitation: (eventId: string, version: number) => Promise<PreviewData | null>;
  craftAndPreview: (eventId: string, formattedContent: string) => Promise<{ success: boolean; previewData?: PreviewData }>;
  clearPreview: () => void;

  // Utilities
  getInvitationById: (id: number) => InvitationCard | undefined;
  getLatestInvitation: () => InvitationCard | undefined;
  clearError: () => void;
  canProceedToNext: () => boolean;
}

const CraftApiContext = createContext<CraftApiContextType | undefined>(undefined);
interface CraftApiProviderProps {
  children: ReactNode;
}

export const CraftApiProvider: React.FC<CraftApiProviderProps> = ({ children }) => {
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [lastCraftedInvitation, setLastCraftedInvitation] = useState(null);

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
      setLastCraftedInvitation(result?.data);
      console.log("Craft Result: ", result.data);

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

  // Preview invitation function
  const previewInvitation = useCallback(async (eventId: string, version: number): Promise<PreviewData | null> => {
    setPreviewLoading(true);
    setError(null);
    try {
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/preview?version=${version}`
      );

      const result: PreviewData = await response.json();

      if (result.success) {
        setPreviewData(result);
        toast.success(result?.message || "Preview generated successfully!");
        return result;
      } else {
        const errorMsg = result.message || "Failed to generate preview";
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      }

    } catch (error) {
      const errorMsg = "Failed to generate preview";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error calling preview API:', error);
      return null;
    } finally {
      setPreviewLoading(false);
    }
  }, [makeAuthenticatedRequest]);

  // Craft and immediately preview
  const craftAndPreview = useCallback(async (eventId: string, formattedContent: string): Promise<{ success: boolean; previewData?: PreviewData }> => {
    const craftSuccess = await craftInvitation(eventId, formattedContent);
    if (craftSuccess && lastCraftedInvitation) {
      const previewResult = await previewInvitation(eventId, lastCraftedInvitation.version);
      return {
        success: true,
        previewData: previewResult || undefined
      };
    }

    return { success: craftSuccess };
  }, [craftInvitation, lastCraftedInvitation, previewInvitation]);

  // Clear preview data
  const clearPreview = useCallback(() => {
    setPreviewData(null);
  }, []);

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

  // Check if user can proceed to next step (has successfully crafted and previewed)
  const canProceedToNext = useCallback((): boolean => {
    return Boolean(lastCraftedInvitation && previewData?.success);
  }, [lastCraftedInvitation, previewData]);

  const value: CraftApiContextType = {
    // state
    invitations,
    loading,
    error,
    previewLoading,
    previewData,
    lastCraftedInvitation,

    // Actions
    craftInvitation,
    fetchInvitations,
    refreshInvitations,

    // Preview Actions
    previewInvitation,
    craftAndPreview,
    clearPreview,

    // Utilities
    getInvitationById,
    getLatestInvitation,
    clearError,
    canProceedToNext
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