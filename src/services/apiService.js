/**
 * Centralized API Service
 * Handles all API calls for the application
 * Uses environment variables for base URL configuration
 */

import axios from "axios";

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
    const response = await axios(url, config);
    // Axios automatically parses JSON; use response.data (not response.json())
    return response.data;
  } catch (error) {
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
    data: JSON.stringify(data),
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
    data: JSON.stringify(data),
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
    data: JSON.stringify(data),
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

const apiService = {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
};

export default apiService;
