import axios from "axios";

import { API_BASE_URL } from "@/constants";
import { useAuthenticationStore } from "@/stores";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthenticationStore.getState().accessToken;
  const tokenType = useAuthenticationStore.getState().tokenType;

  if (accessToken) {
    config["headers"]["Authorization"] = `${tokenType} ${accessToken}`;
  }

  return config;
});

export { api };
