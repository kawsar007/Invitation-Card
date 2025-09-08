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
  message?: string;
  error?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: any;
}

export interface PaymentHistoryResponse {
  success: boolean;
  data: Payment[];
  message?: string;
}

export interface PaymentDetailsResponse {
  success: boolean;
  data: Payment;
  message?: string;
}

class PatmentService {
  private getAuthHeaders() {
    const token = getAuthToken(); // Assuming getAuthToken is defined elsewhere
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(
        data.message || `HTTP error! status: ${response.status}`
      );
    }

    // Handle application-level errors
    if (!data.success) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  }

  async initiatePayment(plan: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/payment/initiate`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ plan }),
        }
      );

      const data = await response.json();

      // Handle both successful and error responses from your backend
      if (!response.ok || !data.success) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("Payment initiation error:", error);
      throw error;
    }
  }

  async getPaymentHistory(): Promise<{ success: boolean; data: Payment[] }> {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/payment/history`,
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
      `${import.meta.env.VITE_BASE_URL}/payments/transaction/${transactionId}`,
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
