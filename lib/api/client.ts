// lib/api/client.ts
import { apiConfig } from "@/config/api";
import type { ApiError } from "@/types/api";

class ApiClient {
  private baseUrl: string;
  private baseUrlEn: string;

  constructor() {
    this.baseUrl = apiConfig.equran.baseUrl;
    this.baseUrlEn = apiConfig.equran.baseUrlEn;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        code: response.status,
        message: response.statusText,
        error: `HTTP Error ${response.status}`,
      };
      throw error;
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw {
        code: 500,
        message: "Failed to parse response",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, locale: "id" | "en" = "id"): Promise<T> {
    const baseUrl = locale === "en" ? this.baseUrlEn : this.baseUrl;
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error && typeof error === "object" && "code" in error) {
        throw error;
      }
      throw {
        code: 500,
        message: "Network error",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiError;
    }
  }

  async getNoCache<T>(
    endpoint: string,
    locale: "id" | "en" = "id"
  ): Promise<T> {
    const baseUrl = locale === "en" ? this.baseUrlEn : this.baseUrl;
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error && typeof error === "object" && "code" in error) {
        throw error;
      }
      throw {
        code: 500,
        message: "Network error",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiError;
    }
  }
}

export const apiClient = new ApiClient();
