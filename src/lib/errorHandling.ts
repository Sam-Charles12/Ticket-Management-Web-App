import { toast } from "sonner";

/**
 * Resolves a human-readable error message.
 */
export const resolveErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  if (typeof error === "string" && error.trim().length > 0) {
    return error.trim();
  }
  return fallback;
};

/**
 * Displays a toast for an error and returns the resolved message.
 */
export const notifyError = (error: unknown, fallback: string): string => {
  const message = resolveErrorMessage(error, fallback);
  toast.error(message);
  return message;
};
