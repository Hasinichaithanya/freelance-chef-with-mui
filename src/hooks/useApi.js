/**
 * Custom React Hook for API calls with loading and error handling
 * Simplifies state management for API requests
 */

import { useState, useCallback } from "react";
import {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
} from "../services/apiService";

/**
 * useApi Hook
 * Manages loading, error, and data states for API calls
 * @param {string} initialEndpoint - Optional initial endpoint to fetch
 * @returns {object} - { data, loading, error, execute, setData, setError }
 */
export const useApi = (initialEndpoint = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (endpoint, method = "GET", payload = null) => {
      setLoading(true);
      setError(null);

      try {
        let result;

        switch (method.toUpperCase()) {
          case "GET":
            result = await apiGet(endpoint);
            break;
          case "POST":
            result = await apiPost(endpoint, payload);
            break;
          case "PUT":
            result = await apiPut(endpoint, payload);
            break;
          case "PATCH":
            result = await apiPatch(endpoint, payload);
            break;
          case "DELETE":
            result = await apiDelete(endpoint);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err.message || "An error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Auto-fetch if initial endpoint is provided
  const initialFetch = useCallback(async () => {
    if (initialEndpoint) {
      try {
        await execute(initialEndpoint, "GET");
      } catch (err) {
        console.error("Initial fetch error:", err);
      }
    }
  }, [initialEndpoint, execute]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    setError,
    initialFetch,
  };
};

export default useApi;
