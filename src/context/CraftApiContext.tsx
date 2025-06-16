import { CraftApiResponse, InvitationCard, PreviewData } from '@/types/craftApi';
import { getAuthToken } from "@/utils/auth";
import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ImageGenerationResponse {
  success: boolean;
  message: string;
  data?: {
    status: 'queued';
    cardId: number;
    version: number;
  };
}

interface CraftApiContextType {
  // state
  invitations: InvitationCard[];
  loading: boolean;
  error: string | null;
  previewLoading: boolean;
  previewData: PreviewData | null;
  imageGenerating: boolean;
  // lastCraftedInvitation: InvitationCard | null;
  versionNo: number; // Add this lin

  // Actions
  craftInvitation: (eventId: string, formattedContent: string) => Promise<{ success: boolean; data?: InvitationCard }>;
  fetchInvitations: (eventId: string) => Promise<void>;
  refreshInvitations: () => Promise<void>;

  // Image generation actions
  generateImage: (eventId: string, version: number) => Promise<ImageGenerationResponse | null>;
  craftPreviewAndGenerate: (eventId: string, formattedContent: string) => Promise<{
    success: boolean;
    previewData?: PreviewData;
    imageGeneration?: ImageGenerationResponse;
  }>;

  // Preview Actions
  previewInvitation: (eventId: string, version: number) => Promise<PreviewData | null>;
  craftAndPreview: (eventId: string, formattedContent: string) => Promise<{
    success: boolean;
    previewData?: PreviewData;
    craftedData?: InvitationCard;
  }>;
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
  const [imageGenerating, setImageGenerating] = useState(false);
  // const [lastCraftedInvitation, setLastCraftedInvitation] = useState<InvitationCard | null>(null);
  const lastCraftedRef = useRef<InvitationCard | null>(null);


  const version = lastCraftedRef.current?.version || 0;

  const makeAuthenticatedRequest = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getAuthToken();
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, []);

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
      setError("Failed to fetch invitations");
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  }, [makeAuthenticatedRequest]);

  const craftInvitation = useCallback(async (
    eventId: string,
    formattedContent: string,
  ): Promise<{ success: boolean; data?: InvitationCard }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/craft`,
        {
          method: 'POST',
          body: JSON.stringify({ html: formattedContent })
        }
      );

      const result: CraftApiResponse = await response.json();

      if (result.success) {
        const craftedData = result?.data as InvitationCard;
        // setLastCraftedInvitation(craftedData);
        lastCraftedRef.current = craftedData;

        toast.success(result?.message || "Invitation crafted successfully!");

        if (craftedData && !Array.isArray(craftedData)) {
          setInvitations(prev => [...prev, craftedData]);
        } else {
          await fetchInvitations(eventId);
        }

        return { success: true, data: craftedData };
      } else {
        const errorMsg = result?.message || "Failed to craft invitation";
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false };
      }
    } catch (error) {
      const errorMsg = "Failed to craft invitation";
      setError(error.message || errorMsg);
      toast.error(errorMsg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [fetchInvitations, makeAuthenticatedRequest]);

  const generateImage = useCallback(async (
    eventId: string,
    version: number
  ): Promise<ImageGenerationResponse | null> => {
    setImageGenerating(true);
    setError(null);

    try {
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/generate?version=${lastCraftedRef?.current?.version}`
      );

      const result: ImageGenerationResponse = await response.json();

      if (result.success) {
        toast.success(result?.message || "Image generation queued successfully!");
        return result;
      } else {
        const errorMsg = result.message || "Failed to queue image generation";
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      }
    } catch (error) {
      const errorMsg = "Failed to queue image generation";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setImageGenerating(false);
    }
  }, [makeAuthenticatedRequest]);

  const previewInvitation = useCallback(async (
    eventId: string,
    version: number
  ): Promise<PreviewData | null> => {
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
      return null;
    } finally {
      setPreviewLoading(false);
    }
  }, [makeAuthenticatedRequest]);

  const craftAndPreview = useCallback(async (
    eventId: string,
    formattedContent: string
  ): Promise<{
    success: boolean;
    previewData?: PreviewData;
    craftedData?: InvitationCard;
  }> => {
    const { success, data } = await craftInvitation(eventId, formattedContent);

    if (success && data) {
      const previewResult = await previewInvitation(eventId, data.version);
      return {
        success: true,
        previewData: previewResult || undefined,
        craftedData: data
      };
    }

    return { success: false };
  }, [craftInvitation, previewInvitation]);

  const craftPreviewAndGenerate = useCallback(async (
    eventId: string,
    formattedContent: string
  ): Promise<{
    success: boolean;
    previewData?: PreviewData;
    imageGeneration?: ImageGenerationResponse;
  }> => {
    const { success, data } = await craftInvitation(eventId, formattedContent);

    if (success && data) {
      const previewResult = await previewInvitation(eventId, data.version);

      if (previewResult?.success) {
        const imageGenResult = await generateImage(eventId, data.version);
        return {
          success: true,
          previewData: previewResult,
          imageGeneration: imageGenResult || undefined
        };
      }

      return {
        success: true,
        previewData: previewResult || undefined
      };
    }

    return { success: false };
  }, [craftInvitation, previewInvitation, generateImage]);

  const clearPreview = useCallback(() => {
    setPreviewData(null);
  }, []);

  const refreshInvitations = useCallback(async (): Promise<void> => {
    await fetchInvitations();
  }, [fetchInvitations]);

  const getInvitationById = useCallback((id: number): InvitationCard | undefined => {
    return invitations.find(invitation => invitation.id === id);
  }, [invitations]);

  const getLatestInvitation = useCallback((): InvitationCard | undefined => {
    if (invitations.length === 0) return undefined;
    return invitations.reduce((latest, current) =>
      new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest
    );
  }, [invitations]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const canProceedToNext = useCallback((): boolean => {
    return Boolean(lastCraftedRef.current && previewData?.success);
  }, [previewData]);

  const value: CraftApiContextType = {
    invitations,
    loading,
    error,
    previewLoading,
    previewData,
    imageGenerating,
    // lastCraftedInvitation,
    versionNo: lastCraftedRef.current?.version || 0,

    craftInvitation,
    fetchInvitations,
    refreshInvitations,

    generateImage,
    craftPreviewAndGenerate,

    previewInvitation,
    craftAndPreview,
    clearPreview,

    getInvitationById,
    getLatestInvitation,
    clearError,
    canProceedToNext
  };

  return (
    <CraftApiContext.Provider value={value}>
      {children}
    </CraftApiContext.Provider>
  );
};

export const useCraftApi = (): CraftApiContextType => {
  const context = useContext(CraftApiContext);
  if (context === undefined) {
    throw new Error('useCraftApi must be used within a CraftApiProvider');
  }
  return context;
};