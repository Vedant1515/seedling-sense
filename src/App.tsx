import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FarmilyProvider } from "./contexts/FarmilyContext";
import { MobileNavigation } from "./components/MobileNavigation";

// Pages
import { SplashScreen } from "./pages/SplashScreen";
import { Dashboard } from "./pages/Dashboard";
import { PlantDetail } from "./pages/PlantDetail";
import { Reminders } from "./pages/Reminders";
import { LearningHub } from "./pages/LearningHub";
import { TutorialDetail } from "./pages/TutorialDetail";
import { Community } from "./pages/Community";
import { Store } from "./pages/Store";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FarmilyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plant/:plantId" element={<PlantDetail />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/tutorial/:tutorialId" element={<TutorialDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNavigation />
        </BrowserRouter>
      </FarmilyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
