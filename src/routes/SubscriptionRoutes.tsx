import ProtectedRoute from "@/components/ProtectedRoute";
import { PaymentCancelled } from "@/pages/payment/PaymentCancelled";
import { PaymentFailed } from "@/pages/payment/PaymentFailed";
import { PaymentSuccess } from "@/pages/payment/PaymentSuccess";
import SubscriptionPlans from "@/pages/subscription-plans";
import UsageDashboard from "@/pages/usage-dashboard";
import { Route, Routes } from "react-router-dom";

const SubscriptionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <SubscriptionPlans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usage"
        element={
          <ProtectedRoute>
            <UsageDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/failed"
        element={
          <ProtectedRoute>
            <PaymentFailed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cancelled"
        element={
          <ProtectedRoute>
            <PaymentCancelled />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default SubscriptionRoutes;
