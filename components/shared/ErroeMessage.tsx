// components/shared/ErrorMessage.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/selia/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/selia/button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorMessage({
  title = "Error",
  message,
  onRetry,
  retryText = "Try Again",
}: ErrorMessageProps) {
  return (
    <Alert variant="danger" className="my-4">
      <AlertCircle />
      <div className="flex-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </Alert>
  );
}
