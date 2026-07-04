import apiRequestGlobal, { apiRequestForm } from "../config/axios.config";

interface RequestOptions<T = unknown> {
  url: string;
  data?: T;
}

interface GetRequestOptions {
  url: string;
  searchParams?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

export const handleGlobalPostRequest = async <
  TResponse,
  TRequest = unknown
>({
  url,
  data,
}: RequestOptions<TRequest>): Promise<TResponse> => {
  const response = await apiRequestGlobal.post<TResponse>(url, data);
  return response.data;
};

export const handleGlobalPostFormRequest = async <
  TResponse,
  TRequest = FormData
>({
  url,
  data,
}: RequestOptions<TRequest>): Promise<TResponse> => {
  const response = await apiRequestForm.post<TResponse>(url, data);
  return response.data;
};

export const handleGlobalGetRequestQuery = async <TResponse>({
  url,
  searchParams = {},
  signal,
}: GetRequestOptions): Promise<TResponse> => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await apiRequestGlobal.get<TResponse>(
    params.toString() ? `${url}?${params.toString()}` : url,
    { signal }
  );

  return response.data;
};