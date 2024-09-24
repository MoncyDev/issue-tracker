"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  RadioCards,
  SegmentedControl,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An error occured.");
    }
  });

  return (
    <div className="max-w-md ">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {issue && (
          <Box>
            <SegmentedControl.Root
              defaultValue={issue.status}
              size="3"
              radius="full"
            >
              <SegmentedControl.Item value="OPEN">
                <Text color="red">Open</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="IN_PROGRESS">
                <Text color="violet">In Progress</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="CLOSED">
                <Text color="green">Closed</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Box>
        )}

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field: { onChange, value } }) => (
            <SimpleMDE
              placeholder="Enter description"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
