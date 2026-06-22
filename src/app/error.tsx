"use client";
import Link from "next/link";
import { AlertTriangle, RotateCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
      <h1 className="mt-6 font-display text-3xl">Er ging iets mis</h1>
      <p className="mt-3 text-text-muted">
        Deze pagina laadde niet zoals verwacht. Probeer opnieuw of ga terug naar de homepage.
      </p>
      {error.digest && (
        <p className="mt-4 text-xs text-text-subtle tabular">Code: {error.digest}</p>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          <RotateCw className="h-4 w-4" /> Opnieuw proberen
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent"
        >
          Naar home
        </Link>
      </div>
    </div>
  );
}
