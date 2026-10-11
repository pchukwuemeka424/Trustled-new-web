import { CmsPage, cmsMetadata } from "@/components/CmsPage";
import { SurveyInit } from "@/components/SurveyInit";
import surveyData from "@/data/tracking.json";

export async function generateMetadata() {
  return cmsMetadata("responsible-ai-tracking");
}

export default async function Page() {
  return (
    <>
      <CmsPage slug="responsible-ai-tracking" />
      <SurveyInit surveyId="tracking" data={surveyData} />
    </>
  );
}
