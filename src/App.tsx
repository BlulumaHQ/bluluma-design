import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import { CaseStudyList, CaseStudyDetail } from "./pages/CaseStudies";
import { IndustriesList, IndustryDetail } from "./pages/Industries";
import Solutions from "./pages/Solutions";
import Agency from "./pages/Agency";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<div className="section-container section-padding"><p>TBD — Individual project page</p></div>} />
            <Route path="/case-studies" element={<CaseStudyList />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/industries" element={<IndustriesList />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
