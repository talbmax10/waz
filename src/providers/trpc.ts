import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../../api/router";
import { useState, type ReactNode } from "react";

export const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 15_000, retry: 1, refetchOnWindowFocus: false },
      mutations: { retry: 0 },
    },
  }));

  const [trpcClient] = useState(() => trpc.createClient({
    transformer: superjson,
    links: [
      httpBatchStreamLink({
        url: `${window.location.origin}/api/trpc`,
        fetch(url, options) {
          return fetch(url, { ...options, credentials: "same-origin" });
        },
      }),
    ],
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
