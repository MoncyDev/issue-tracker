"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { statusMap } from "@/app/components/IssueStatusBadge";
import Spinner from "@/app/components/Spinner";
import { patchIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof patchIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(patchIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An error occured.");
    }
  });

  const [status, setStatus] = useState(issue?.status as string);

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
          <Select.Root
            defaultValue={issue.status}
            size="3"
            onValueChange={setStatus}
          >
            <Select.Trigger
              {...register("status")}
              value={status}
              color={statusMap[status as Status].color}
              variant="soft"
            />
            <Select.Content>
              <Select.Item value="OPEN">Open</Select.Item>
              <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
              <Select.Item value="CLOSED">Closed</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
        <ErrorMessage>{errors.status?.message}</ErrorMessage>
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

        <Button disabled={isSubmitting} type="submit">
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
