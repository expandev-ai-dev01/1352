/**
 * @types APITypes
 * @summary Common API-related type definitions
 * @domain core
 * @category types
 */

export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
