import { EditorFormProps } from "@/lib/types";
import React from "react";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: React.lazy(() => import("./_components/general-info-form")), //load the component only when it is needed
    key: "general-info",
  },
  {
    title: "Personal info",
    component: React.lazy(() => import("./_components/personal-info-form")),
    key: "personal-info",
  },
  {
    title: "Work experience",
    component: React.lazy(() => import("./_components/work-experience-form")),
    key: "work-experience",
  },
  {
    title: "Education",
    component: React.lazy(() => import("./_components/education-form")),
    key: "education",
  },
];
