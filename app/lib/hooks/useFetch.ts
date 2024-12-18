// hooks/useFetch.ts

import { useState, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  signal?: AbortSignal;
}

interface UseFetchResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetchData: (url: string, options?: FetchOptions) => Promise<void>;
}

export function useFetch<T>(): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { googleAccessToken } = useAuth();

  const fetchData = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      if (!googleAccessToken && options.requireAuth) {
        setError(new Error("Authentication required but no access token provided"));
        return;
      }

      const abortController = new AbortController();
      const { signal } = options;

      try {
        setLoading(true);
        setError(null);

        const headers = new Headers(options.headers);
        headers.set("Content-Type", "application/json");

        if (options.requireAuth && googleAccessToken) {
          headers.set("Authorization", `Bearer ${googleAccessToken}`);
        }

        const response = await fetch(url, {
          ...options,
          headers,
          signal: signal || abortController.signal,
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.error?.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    },
    [googleAccessToken]
  );

  return { data, error, loading, fetchData };
}
