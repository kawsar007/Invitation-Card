
import { Event } from "@/types/event";
import { getAuthToken } from "@/utils/auth";
import { toast } from "sonner";

interface CraftApiResponse {
  success: boolean;
  message?: string;
  data?: Event;
}

export const callCraftApi = async (eventId: string, formattedContent: string) => {
  const token = getAuthToken();

  try {
    const craftResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/invitation/${eventId}/craft`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        html: formattedContent,
      }),
    });

    const craftResult: CraftApiResponse = await craftResponse.json();

    if (craftResult.success) {
      toast.success(craftResult?.message || "Invitation crafted successfully!");
      return true;
    } else {
      toast.error(craftResult.message || "Failed to craft invitation");
      return false;
    }

  } catch (error) {
    console.error('Error calling craft API:', error);
    toast.error("Failed to craft invitation");
    return false;
  }
}