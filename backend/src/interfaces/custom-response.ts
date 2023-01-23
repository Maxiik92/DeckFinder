export interface CustomResponse<T> {
  status: number;
  message: string;
  token?: string;
  data: T;
}
