import React, { useState, useEffect } from "react";
import { CheckCircle, X, Loader2, Crown, Zap, Star } from "lucide-react";
import {
  Subscription,
  SubscriptionPlan,
  subscriptionService,
} from "@/services/subscription.service";
import { paymentService } from "@/services/payment.service";

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("Current Subscription --->", currentSubscription);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansResponse, subscriptionResponse] = await Promise.all([
        subscriptionService.getPlans(),
        subscriptionService.getMySubscription(),
      ]);

      if (plansResponse.success) {
        setPlans(plansResponse.data.plans);
      }

      if (subscriptionResponse.success) {
        setCurrentSubscription(subscriptionResponse.data);
      }
    } catch (err) {
      setError("Failed to load subscription plans");
      console.error("Error fetching subscription data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planName: string) => {
    if (planName === "FREE" || planName === currentSubscription?.plan) return;

    try {
      setProcessingPlan(planName);

      if (planName === "PREMIUM" || planName === "PROFESSIONAL") {
        // Initiate payment
        const paymentResponse = await paymentService.initiatePayment(planName);

        if (
          paymentResponse.success &&
          paymentResponse.data.data.GatewayPageURL
        ) {
          // Redirect to SSLCommerz payment gateway
          window.location.href = paymentResponse.data.data.GatewayPageURL;
        } else {
          throw new Error("Failed to initiate payment");
        }
      } else {
        // Free upgrade (shouldn't happen, but just in case)
        await subscriptionService.upgradeSubscription(planName);
        await fetchData(); // Refresh data
      }
    } catch (err) {
      setError(`Failed to upgrade to ${planName} plan`);
      console.error("Upgrade error:", err);
    } finally {
      setProcessingPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm("Are you sure you want to cancel your subscription?"))
      return;

    try {
      setLoading(true);
      await subscriptionService.cancelSubscription();
      await fetchData();
    } catch (err) {
      setError("Failed to cancel subscription");
      console.error("Cancel error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case "FREE":
        return <Star className="w-8 h-8 text-gray-500" />;
      case "PREMIUM":
        return <Crown className="w-8 h-8 text-blue-500" />;
      case "PROFESSIONAL":
        return <Zap className="w-8 h-8 text-purple-500" />;
      default:
        return <Star className="w-8 h-8 text-gray-500" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case "FREE":
        return "border-gray-200";
      case "PREMIUM":
        return "border-blue-200 bg-blue-50";
      case "PROFESSIONAL":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-gray-200";
    }
  };

  const getButtonColor = (planName: string) => {
    if (currentSubscription?.plan === planName) {
      return "bg-green-500 text-white cursor-not-allowed";
    }
    switch (planName) {
      case "FREE":
        return "bg-gray-500 hover:bg-gray-600 text-white";
      case "PREMIUM":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "PROFESSIONAL":
        return "bg-purple-500 hover:bg-purple-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  if (loading && !plans.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading subscription plans...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-600">
          Select the perfect plan for your event management needs
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <X className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {currentSubscription && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Current Plan: {currentSubscription.plan}</span>
              {currentSubscription.status === "ACTIVE" &&
                currentSubscription.ends_at && (
                  <span className="ml-2 text-sm">
                    (Expires:{" "}
                    {new Date(currentSubscription.ends_at).toLocaleDateString()}
                    )
                  </span>
                )}
            </div>
            {currentSubscription.plan !== "FREE" &&
              currentSubscription.status === "ACTIVE" && (
                <button
                  onClick={handleCancelSubscription}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                  disabled={loading}
                >
                  Cancel Subscription
                </button>
              )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentSubscription?.plan === plan.name;
          const canUpgrade = !isCurrentPlan && plan.name !== "FREE";
          const isProcessing = processingPlan === plan.name;

          return (
            <div
              key={plan.name}
              className={`border-2 rounded-lg p-6 ${getPlanColor(plan.name)} ${
                plan.name === "PREMIUM" ? "transform scale-105 shadow-lg" : ""
              }`}
            >
              <div className="text-center mb-4">
                {getPlanIcon(plan.name)}
                <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
                {plan.name === "PREMIUM" && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold">৳{plan.price}</span>
                {plan.name !== "FREE" && (
                  <span className="text-gray-500">/year</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm text-gray-600">
                  <strong>Limits:</strong>
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    Events:{" "}
                    {plan.limits.events === -1
                      ? "Unlimited"
                      : plan.limits.events}
                  </div>
                  <div>
                    Invitations:{" "}
                    {plan.limits.invitations === -1
                      ? "Unlimited"
                      : plan.limits.invitations}{" "}
                    per event
                  </div>
                  <div>
                    Contacts:{" "}
                    {plan.limits.contacts === -1
                      ? "Unlimited"
                      : plan.limits.contacts}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={isCurrentPlan || isProcessing || loading}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${getButtonColor(
                  plan.name
                )}`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </div>
                ) : isCurrentPlan ? (
                  "Current Plan"
                ) : plan.name === "FREE" ? (
                  "Free Forever"
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
