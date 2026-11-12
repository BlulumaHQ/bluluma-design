import { Navigate, useLocation } from "react-router-dom";
import PropertyIndustryPage from "@/components/PropertyIndustryPage";
import { developerAudience } from "@/lib/industryPortfolio";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

export default function Realtor() {
  const { search } = useLocation();
  useDocumentMeta({ title: "Realtor Website Design with CREA Auto-Listings | Bluluma", description: "Personal-brand websites for REALTORS® and teams with CREA DDF® auto-listings, bilingual design and lead capture.", canonicalPath: "/real-estate" });
  if (developerAudience(search)) return <Navigate to="/presale" replace />;
  return <PropertyIndustryPage developer={false} />;
}
