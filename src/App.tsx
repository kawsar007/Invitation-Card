import "../src/styles/globals.css";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import FinalEnvelope from "./components/final-envelope";
import EmailTemplateGenerator from "./components/send-ui/contact/EmailTemplate";
import { CraftApiProvider } from "./context/CraftApiContext";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./landing-page";
import Navbar from "./landing-page/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RequireEventId from "./pages/RequireEventId";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import EventsPage from "./pages/events";
import TemplatesPage from "./pages/templates";
import { ProfilePage } from "./pages/profile/profile";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  // Define routes where navbar should be hidden
  const hideNavbarRoutes = [
    "/editor",
    "/sign-in",
    "/sign-up",
    "/trouble-signing-in",
    "/envelope",
  ];
  // const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowNavbar =
    !location.pathname.startsWith("/editor") &&
    !location.pathname.startsWith("/envelope") &&
    !hideNavbarRoutes.includes(location.pathname);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <>
      {shouldShowNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <Toaster />
      <Sonner />
      <Routes>
        <Route
          path="/editor/:templateId?"
          element={
            <ProtectedRoute>
              <RequireEventId>
                <Index />
              </RequireEventId>
            </ProtectedRoute>
          }
        />
        <Route path="/email-template" element={<EmailTemplateGenerator />} />
        {/* <Route path="/editor" element={<Index />} /> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/trouble-signing-in" element={<ForgotPassword />} />
        <Route path="/templates" element={<TemplatesPage theme={theme} />} />
        <Route path="/envelope/:rsvpId" element={<FinalEnvelope />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage theme={theme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage
                user={{
                  id: 2,
                  first_name: "Kawsar",
                  last_name: "Ahamed",
                  email: "imkawsar007@gmail.com",
                  role: "host",
                  profile_photo: null,
                  created_at: "2025-08-21T07:59:27.000Z",
                  updated_at: "2025-08-21T07:59:27.000Z",
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<LandingPage theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <TooltipProvider>
        <UserProvider>
          <CraftApiProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </CraftApiProvider>
        </UserProvider>
      </TooltipProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};

export default App;
