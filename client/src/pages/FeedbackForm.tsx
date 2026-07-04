import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { handleGlobalPostRequest } from "../services/functions/globalApiFunction";

const CATEGORIES = [
  "Product",
  "Support",
  "Billing",
  "Feature Request",
  "Other",
] as const;

const feedbackSchema = z.object({
  category: z.enum(CATEGORIES, {
    message: "Please select a category",
  }),

  comment: z
    .string()
    .trim()
    .min(5, "Feedback must be at least 5 characters")
    .max(2000, "Feedback cannot exceed 2000 characters"),

  email: z
    .union([z.string().email("Invalid email address"), z.literal("")])
    .optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: undefined,
      comment: "",
      email: "",
    },
  });

  const comment = watch("comment");

  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: FeedbackFormData) => {
      return handleGlobalPostRequest({
        url: "/api/feedback/submit",
        data,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleFormSubmit = async (data: FeedbackFormData) => {
    await submitFeedbackMutation.mutateAsync(data);
  };

  function handleReset() {
    reset();
    setSubmitted(false);
    submitFeedbackMutation.reset();
  }

  if (submitted) {
    return (
      <Container size={480} py={60}>
        <Paper
          radius="lg"
          p="xl"
          withBorder
          shadow="sm"
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" strokeWidth={2.2} />
          </div>
          <Title order={2} mt="md">
            Feedback submitted!
          </Title>
          <Text size="sm" c="dimmed" mt={4}>
            Thank you for helping us improve.
          </Text>
          <Button onClick={handleReset} fullWidth size="md" mt="xl">
            Submit another
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size={480} py={60}>
      <Paper radius="lg" p="xl" withBorder shadow="sm">
        <Title order={2}>We value your feedback</Title>

        <Text size="sm" c="dimmed" mb="lg">
          Help us improve by sharing your experience.
        </Text>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Stack>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  placeholder="Select a category"
                  data={CATEGORIES}
                  withAsterisk
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.category?.message}
                />
              )}
            />

            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Your Feedback"
                  placeholder="Share your thoughts..."
                  withAsterisk
                  minRows={5}
                  autosize
                  {...field}
                  error={errors.comment?.message}
                />
              )}
            />

            <Text size="xs" c="dimmed" ta="right">
              {comment?.length ?? 0}/2000
            </Text>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Email (Optional)"
                  placeholder="you@example.com"
                  type="email"
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />

            {submitFeedbackMutation.isError && (
              <Text size="sm" c="red">
                {(submitFeedbackMutation.error as any)?.response?.data?.message ||
                  "Something went wrong. Please try again."}
              </Text>
            )}

            <Button type="submit" loading={isSubmitting} fullWidth size="md">
              Submit Feedback
            </Button>
          </Stack>
        </form>

        <Text size="xs" c="dimmed" ta="center" mt="md">
          Your feedback is secure and anonymous.
        </Text>
      </Paper>
    </Container>
  );
}