import { getAuthToken } from "@/utils/auth";

export interface Payment {
  id: number;
  transaction_id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "REFUNDED";
  payment_method: string | null;
  paid_at: string | null;
  created_at: string;
  subscription: {
    plan: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  data: {
    data: {
      GatewayPageURL: string;
    };
    paymentId: number;
    transactionId: string;
  };
}

class PatmentService {
  private getAuthHeaders() {
    const token = getAuthToken(); // Assuming getAuthToken is defined elsewhere
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async initiatePayment(plan: string): Promise<PaymentResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/payment/initiate`,
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

  async getPaymentHistory(): Promise<{ success: boolean; data: Payment[] }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/payment/history`,
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

  async getPaymentDetails(
    transactionId: string
  ): Promise<{ success: boolean; data: Payment }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/payment/transaction/${transactionId}`,
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

export const paymentService = new PatmentService();
