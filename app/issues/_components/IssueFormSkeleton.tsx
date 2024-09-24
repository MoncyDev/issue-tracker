import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-md">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
