"use client";

import { useEffect } from "react";
import { mountSurvey } from "@/lib/survey-engine";

type Props = {
  surveyId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export function SurveyInit({ surveyId, data }: Props) {
  useEffect(() => {
    const root = document.getElementById(surveyId);
    if (!root) return;
    return mountSurvey(root, data);
  }, [surveyId, data]);

  return null;
}
