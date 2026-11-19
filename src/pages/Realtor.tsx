import { Navigate, useLocation } from "react-router-dom";
import PropertyIndustryPage from "@/components/PropertyIndustryPage";
import { developerAudience } from "@/lib/industryPortfolio";

export default function Realtor() {
  const { search } = useLocation();
  if (developerAudience(search)) return <Navigate to="/presale" replace />;
  return <PropertyIndustryPage developer={false} />;
}
