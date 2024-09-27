"use client";
import { Box, Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progess", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <Box>
        <ResponsiveContainer width="100%" height={300} className='-mx-3'>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize={60}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default IssueChart;
