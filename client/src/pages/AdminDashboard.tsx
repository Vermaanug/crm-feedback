import {
  Container,
  Grid,
  Paper,
  Select,
  Table,
  Text,
  TextInput,
  Title,
  Badge,
  Alert,
  Center,
  Loader,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { handleGlobalGetRequestQuery } from "../services/functions/globalApiFunction";

const CATEGORIES = ["Product", "Support", "Billing", "Feature Request", "Other"] as const;
const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

const STATUS_COLOR: Record<string, string> = {
  Received: "blue",
  "In Progress": "yellow",
  Resolved: "green",
};

interface FeedbackItem {
  _id: string;
  category: string;
  comment: string;
  email?: string;
  status: string;
  createdAt: string;
}

interface FeedbackSummary {
  totalCount: number;
  categoryBreakdown: { category: string; count: number }[];
  recent: FeedbackItem[];
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper radius="lg" p="md" withBorder shadow="sm">
      <Text size="xs" c="dimmed" tt="uppercase" fw={500}>
        {label}
      </Text>
      <Text size="xl" fw={700} mt={4}>
        {value}
      </Text>
    </Paper>
  );
}

export default function AdminDashboard() {
  const [category, setCategory] = useState<string | null>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const summaryQuery = useQuery<{ success: boolean; data: FeedbackSummary }>({
    queryKey: ["feedback-summary"],
    queryFn: () => handleGlobalGetRequestQuery({ url: "/api/feedback/summary" }),
  });

  const feedbackQuery = useQuery<{ success: boolean; data: FeedbackItem[] }>({
    queryKey: ["feedback-list", category, debouncedSearch],
    queryFn: () =>
      handleGlobalGetRequestQuery({
        url: "/api/feedback",
        searchParams: {
          category: category || undefined,
          search: debouncedSearch || undefined,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

  const summary = summaryQuery.data?.data;
  const items = feedbackQuery.data?.data ?? [];

  return (
    <Container size={1100} py={40}>
      <Title order={2}>Overview</Title>
      <Text size="sm" c="dimmed" mb="lg">
        Real-time summary of customer feedback
      </Text>

      {(summaryQuery.isError || feedbackQuery.isError) && (
        <Alert color="red" variant="light" mb="lg">
          Failed to load feedback. Is the backend running?
        </Alert>
      )}

      <Grid mb="lg">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StatCard label="Total Feedback" value={summary?.totalCount ?? "—"} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StatCard
            label="Top Category"
            value={summary?.categoryBreakdown?.[0]?.category ?? "—"}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StatCard
            label="Categories Tracked"
            value={summary?.categoryBreakdown?.length ?? "—"}
          />
        </Grid.Col>
      </Grid>

      <Grid mb="lg">
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Paper radius="lg" p="md" withBorder shadow="sm" h="100%">
            <Text size="sm" fw={500} mb="sm">
              Category Distribution
            </Text>
            {!summary?.categoryBreakdown?.length ? (
              <Center h={220}>
                <Text size="sm" c="dimmed">
                  No data yet
                </Text>
              </Center>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={summary.categoryBreakdown}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category: cat, count }) => `${cat}: ${count}`}
                  >
                    {summary.categoryBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper radius="lg" p="md" withBorder shadow="sm" h="100%">
            <Text size="sm" fw={500} mb="sm">
              Filter & Search
            </Text>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 5 }}>
                <Select
                  placeholder="All categories"
                  data={CATEGORIES as unknown as string[]}
                  value={category}
                  onChange={setCategory}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 7 }}>
                <TextInput
                  placeholder="Search feedback text..."
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>

      <Text size="sm" fw={500} mb="sm">
        Recent Feedback
      </Text>

      <Paper radius="lg" withBorder shadow="sm" style={{ overflow: "hidden" }}>
        {feedbackQuery.isLoading ? (
          <Center py="xl">
            <Loader size="sm" />
          </Center>
        ) : items.length === 0 ? (
          <Center py="xl">
            <Text size="sm" c="dimmed">
              No feedback matches your filters.
            </Text>
          </Center>
        ) : (
          <Table.ScrollContainer minWidth={600}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Feedback</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((item) => (
                  <Table.Tr key={item._id}>
                    <Table.Td style={{ maxWidth: 320 }}>
                      <Text truncate="end" title={item.comment}>
                        {item.comment}
                      </Text>
                    </Table.Td>
                    <Table.Td>{item.category}</Table.Td>
                    <Table.Td>{item.email || "—"}</Table.Td>
                    <Table.Td>{new Date(item.createdAt).toLocaleString()}</Table.Td>
               
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Paper>
    </Container>
  );
}