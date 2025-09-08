import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { paymentService } from '@/services/payment.service';

// Payment Success Component
export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  
  const transactionId = searchParams.get('transaction');
  const plan = searchParams.get('plan');

  useEffect(() => {
    if (transactionId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
    }
  }, [transactionId]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await paymentService.getPaymentDetails(transactionId!);
      if (response.success) {
        setPaymentDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your subscription has been activated successfully.
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">{paymentDetails.transaction_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{plan || paymentDetails.subscription?.plan}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">৳{paymentDetails.amount}</span>
              </div>
              {paymentDetails.paid_at && (
                <div className="flex justify-between">
                  <span>Paid At:</span>
                  <span>{new Date(paymentDetails.paid_at).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/subscription/usage')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          
          <button
            onClick={() => navigate('/subscription')}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium"
          >
            View Subscription Details
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          You will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  );
};