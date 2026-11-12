import PropertyIndustryPage from "@/components/PropertyIndustryPage";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

export default function Presale() {
  useDocumentMeta({ title: "Pre-sale & Real Estate Development Website Design | Bluluma", description: "Project websites for developers and pre-sale marketing teams, with VIP registration, floorplans and qualified lead routing.", canonicalPath: "/presale" });
  return <PropertyIndustryPage developer />;
}