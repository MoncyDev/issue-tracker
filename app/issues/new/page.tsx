import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Heading } from "@radix-ui/themes";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <>
      <Heading mb="4">Add Issue</Heading>
      <IssueForm />
    </>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Add new Issue",
  description: "Add issue to the project",
};

export default NewIssuePage;
