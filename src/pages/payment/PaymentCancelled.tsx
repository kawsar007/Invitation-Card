import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export const PaymentCancelled: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("transaction");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        {transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Transaction ID: <span className="font-mono">{transactionId}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate("/subscription/plans")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
          >
            Choose Plan Again
          </button>

          <button
            onClick={() => navigate("/subscription/usage")}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          You can retry your subscription upgrade anytime.
        </p>
      </div>
    </div>
  );
};
