import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card variant="surface" key={container.label} className="hover:bg-violet-200">
            <Link
              href={`/issues?status=${container.status}`}
              className="text-sm font-medium"
            >
          <Flex direction="column" gap="1">
              {container.label}
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
            </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
