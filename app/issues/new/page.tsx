import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Heading } from "@radix-ui/themes";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <>
    <Heading mb='4'>Add Issue</Heading>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
