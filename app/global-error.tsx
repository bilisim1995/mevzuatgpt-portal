"use client";

import { GlobalError } from '@/components/error-boundary';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalError error={error} reset={reset} />;
}
