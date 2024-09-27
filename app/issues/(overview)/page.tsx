import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "../IssueActions";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export interface searchParams {
  searchParams: { status: Status; orderBy: keyof Issue; order: string };
}

const IssuesPage = async ({ searchParams }: searchParams) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order || "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isCurrentColumn = column.value === searchParams.orderBy;
              const order = isCurrentColumn
                ? searchParams.order === "desc"
                  ? undefined
                  : "desc"
                : undefined;
              return (
                <Table.ColumnHeaderCell key={column.value}>
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value, order },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {isCurrentColumn &&
                    (order ? (
                      <ArrowUpIcon className="inline" />
                    ) : (
                      <ArrowDownIcon className="inline" />
                    ))}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
