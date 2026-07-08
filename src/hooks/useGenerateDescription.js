import { useState } from "react";
import useApi from "./useApi";

/**
 * useGenerateDescription
 *
 * Custom hook for generating an AI chef description.
 * Can be used in Register, ProfileForm, or any other component.
 *
 * @returns {{ generateDescription, aiDescError, isGenerating }}
 *   - generateDescription({ experience, fooditems }) → Promise<string | null>
 *     Returns the generated description string on success, or null on failure.
 *   - aiDescError: string — error message if the call fails
 *   - isGenerating: boolean — true while the request is in flight
 */
const useGenerateDescription = () => {
  const { execute } = useApi();
  const [aiDescError, setAiDescError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescription = async (payload) => {
    setAiDescError("");
    setIsGenerating(true);
    try {

      const result = await execute("/chef/generate-description", "POST", payload);
      return result.description ?? null;
    } catch (err) {
      setAiDescError(err.message || "Failed to generate description.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateDescription, aiDescError, isGenerating };
};

export default useGenerateDescription;
