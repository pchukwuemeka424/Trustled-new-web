import { CmsPage, cmsMetadata } from "@/components/CmsPage";
import { SurveyInit } from "@/components/SurveyInit";
import surveyData from "@/data/career.json";

export async function generateMetadata() {
  return cmsMetadata("ai-career-path");
}

export default async function Page() {
  return (
    <>
      <CmsPage slug="ai-career-path" />
      <SurveyInit surveyId="career" data={surveyData} />
    </>
  );
}
