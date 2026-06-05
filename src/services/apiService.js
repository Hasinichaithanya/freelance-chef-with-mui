/**
 * Centralized API Service
 * Handles all API calls for the application
 * Uses environment variables for base URL configuration
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Generic API call function
 * @param {string} endpoint - API endpoint path (e.g., '/get-all')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - Response data
 */
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Call Error [${endpoint}]:`, error);
    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<any>} - Response data
 */
export const apiGet = (endpoint) => {
  return apiCall(endpoint, { method: "GET" });
};

/**
 * POST request
 * @param {string} endpoint - API endpoint path
 * @param {object} data - Request body data
 * @returns {Promise<any>} - Response data
 */
export const apiPost = (endpoint, data) => {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint path
 * @param {object} data - Request body data
 * @returns {Promise<any>} - Response data
 */
export const apiPut = (endpoint, data) => {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * PATCH request
 * @param {string} endpoint - API endpoint path
 * @param {object} data - Request body data
 * @returns {Promise<any>} - Response data
 */
export const apiPatch = (endpoint, data) => {
  return apiCall(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<any>} - Response data
 */
export const apiDelete = (endpoint) => {
  return apiCall(endpoint, { method: "DELETE" });
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
};
