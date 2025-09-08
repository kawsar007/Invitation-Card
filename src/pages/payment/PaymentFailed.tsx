import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';


export const PaymentFailed: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const transactionId = searchParams.get('transaction');
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Transaction ID: <span className="font-mono">{transactionId}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/subscription/plans')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/subscription/usage')}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          If you continue to experience issues, please contact our support team.
        </p>
      </div>
    </div>
  );
};
