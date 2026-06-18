export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface SelectOption {
  label: string;
  value: string | number;
}
