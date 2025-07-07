import axios from "axios";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const parseApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || "Erro desconhecido";
    const status = error.response?.status ?? 500;
    return new ApiError(message, status);
  }

  return new ApiError("Erro inesperado", 500);
};

