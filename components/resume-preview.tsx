import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useDimensions } from "@/hooks/use-dimensions";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

type ResumePreviewProps = {
  resumeData: ResumeValues;
  className?: string;
};

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        style={{ zoom: (1 / 794) * width }}
        className={cn("space-y-6 p-6", !width && "invisible")}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

type ResumeSectionProps = {
  resumeData: ResumeValues;
};

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    state,
    country,
    phone,
    email,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="profile photo"
          width={100}
          height={100}
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && state ? ", " : ""}
          {state}
          {state && country ? ", " : ""}
          {country}
          {state || (country && phone) || email ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-1 border-gray-200" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Professional Profile</p>
        <div className="whitespace-pre">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (workExperience) =>
      Object.values(workExperience).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-1 border-gray-200" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work Experience</p>
        {workExperiencesNotEmpty.map((workExperience, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{workExperience.position}</span>
              {workExperience.startDate && (
                <span>
                  {formatDate(workExperience.startDate, "MM/yyyy")} -{" "}
                  {workExperience.endDate
                    ? formatDate(workExperience.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{workExperience.company}</p>
            <div className="whitespace-pre-line text-xs">
              {workExperience.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  const educationNotEmpty = educations?.filter(
    (education) => Object.values(education).filter(Boolean).length > 0,
  );

  if (!educationNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-1 border-gray-200" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Education</p>
        {educationNotEmpty?.map((education, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{education.degree}</span>
              {education.startDate && (
                <span>
                  {education.startDate &&
                    `${formatDate(education.startDate, "MM/yyyy")} ${
                      education.endDate
                        ? `- ${formatDate(education.endDate, "MM/yyyy")}`
                        : ""
                    }`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{education.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-1 border-gray-200" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black/80"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
