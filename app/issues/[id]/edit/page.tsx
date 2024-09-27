import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { Heading } from "@radix-ui/themes";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <>
      <Heading mb="4">Edit Issue</Heading>
      <IssueForm issue={issue} />
    </>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Edit issue",
  description: "Edit project issues",
};

export default EditIssuePage;
