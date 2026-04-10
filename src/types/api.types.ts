// general api response
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// pagination response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}