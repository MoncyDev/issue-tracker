import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "../IssueActions";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order: string;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
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

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order || "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

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
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
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
                <Flex justify="between" className="w-full">
                  <div>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <div className="block mt-2 md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </div>
                  <div className="text-gray-500 md:hidden">
                    {issue.createdAt.toLocaleDateString()}
                  </div>
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
