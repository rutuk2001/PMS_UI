import { toast } from "react-toastify";
import config from "../config";
import { handleTokenExpiration } from "../utils/tokenUtils";

const BASE_URL = config.apiUrl;

const handleResponse = async (response) => {
  if (response.status === 401) {
    handleTokenExpiration();
    toast.error("token Expired");
    throw new Error("Token expired. Redirecting to login...");
  }
  return response;
};

const apiService = {
  get: async (url) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BASE_URL}/${url}`, { headers });
    return handleResponse(response);
  },

  post: async (url, data) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let body;

    if (data instanceof FormData) {
      // If data is FormData (indicating file upload), handle it as a POST reques
      body = data;
    } else {
      // Otherwise, treat it as a regular JSON object
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers,
      body,
    });

    return handleResponse(response);
  },

  put: async (url, data) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let body;

    if (data instanceof FormData) {
      // If data is FormData (indicating file upload), handle it as a POST reques
      body = data;
    } else {
      // Otherwise, treat it as a regular JSON object
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers,
      body,
    });
    return handleResponse(response);
  },
  delete: async (url) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "DELETE",
      headers,
    });
    return handleResponse(response);
  },
  update: async (url, data) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

export default apiService;
