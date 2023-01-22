export interface CustomResponse<T> {
  status: number;
  message: string;
  data: T;
}
