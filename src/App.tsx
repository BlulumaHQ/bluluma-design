import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LangProvider } from "@/lib/i18n";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import { CaseStudyList, CaseStudyDetail } from "./pages/CaseStudies";
import { IndustriesList, IndustryDetail } from "./pages/Industries";
import Solutions from "./pages/Solutions";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Agency from "./pages/Agency";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Start from "./pages/Start";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Realtor from "./pages/Realtor";
import Dentist from "./pages/Dentist";
import PageLoader from "./components/PageLoader";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PageLoader />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<Work />} />
              <Route path="/case-studies" element={<CaseStudyList />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/industries" element={<IndustriesList />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/process" element={<Process />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/agency" element={<Agency />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/industry/:industry" element={<Insights />} />
              <Route path="/insights/realtor" element={<Insights />} />
              <Route path="/insights/dentist" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/start" element={<Start />} />
              <Route path="/contact" element={<Start />} />
              <Route path="/proposal" element={<Start />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Route>
            <Route path="/realtor" element={<Realtor />} />
            <Route path="/dentist" element={<Dentist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  </QueryClientProvider>
);

export default App;