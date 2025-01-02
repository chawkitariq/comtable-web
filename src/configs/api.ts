import axios from "axios";

import { API_BASE_URL } from "@/constants";
import { useAuthenticationStore } from "@/stores";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const authenticationStore = useAuthenticationStore.getState();
  const accessToken = authenticationStore.accessToken;
  const tokenType = authenticationStore.tokenType;

  if (accessToken) {
    config["headers"]["Authorization"] = `${tokenType} ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthenticationStore.getState().logout();
    }

    return error;
  }
);

export { api };
