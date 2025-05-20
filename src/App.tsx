import "../src/styles/globals.css";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./landing-page";
import Navbar from "./landing-page/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('light');

  // Define routes where navbar should be hidden
  const hideNavbarRoutes = ['/editor', '/sign-in', '/sign-up'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <>
      {shouldShowNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <Toaster />
      <Sonner />
      <Routes>
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/editor" element={<Index />} /> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}

export default App;