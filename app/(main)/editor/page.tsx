import { Metadata } from "next";
import ResumeEditor from "./_components/resume-editor";

export const metaData: Metadata = {
  title: "Design your resume",
};

export default function EditorPage() {
  return <ResumeEditor />;
}
