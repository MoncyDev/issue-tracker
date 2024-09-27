import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "../../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: string;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value, order },
                  }}
                >
                  {column.label}
                </Link>
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
          <Table.Row key={issue.id} className="hover:bg-gray-50">
            <Table.Cell>
              <Flex justify="between" className="w-full">
                <div>
                  <Link
                    href={`/issues/${issue.id}`}
                    className="hover:text-blue-800 hover:underline"
                  >
                    {issue.title}
                  </Link>
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
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

export default IssueTable;
