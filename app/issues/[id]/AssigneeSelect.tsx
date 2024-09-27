"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster, ToastOptions } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const options: ToastOptions = { position: "bottom-right" };

  async function assignIssue(userId: string | null) {
    const toastLoad = toast.loading("Assigning issue to user...", options);
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "none" ? null : userId,
      });
      if (userId !== "none")
        toast.success("Issue successfully assigned to user.", options);
      else toast.success("Unassigned", options);
      toast.dismiss(toastLoad);
    } catch (error) {
      toast.error("Unable to assign issue. Try again!", options);
      toast.dismiss(toastLoad);
      console.error(error);
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "none"}
        onValueChange={(userId) => assignIssue(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
