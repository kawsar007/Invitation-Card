import { getAuthToken } from "@/utils/auth";

export interface SubscriptionPlan {
  name: "FREE" | "PREMIUM" | "PROFESSIONAL";
  price: number;
  currency: string;
  features: string[];
  limits: {
    events: number;
    invitations: number;
    contacts: number;
  };
}

export interface Subscription {
  id: number;
  plan: "FREE" | "PREMIUM" | "PROFESSIONAL";
  status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING";
  starts_at: string;
  ends_at: string | null;
  max_events: number;
  max_invitations: number;
  max_contacts: number;
  price: number;
  auto_renewal: boolean;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UsageLimits {
  events: {
    current: number;
    max: number;
    canCreate: boolean;
  };
  contacts: {
    current: number;
    max: number;
    canCreate: boolean;
  };
  invitations: {
    max: number;
    canCreate: boolean;
  };
}

class SubscriptionService {
  private getAuthHeaders() {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getPlans(): Promise<{
    success: boolean;
    data: { plans: SubscriptionPlan[] };
  }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/plans`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getMySubscription(): Promise<{ success: boolean; data: Subscription }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/my-subscription`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUsageLimits(): Promise<{ success: boolean; data: UsageLimits }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/usage-limits`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async upgradeSubscription(
    plan: string
  ): Promise<{ success: boolean; data: Subscription; message: string }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/upgrade`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ plan }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async cancelSubscription(): Promise<{
    success: boolean;
    data: Subscription;
    message: string;
  }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/cancel`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getSubscriptionHistory(): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/subscription/history`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const subscriptionService = new SubscriptionService();
