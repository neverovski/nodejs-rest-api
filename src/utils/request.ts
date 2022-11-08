import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig<T>,
): Promise<AxiosResponse<T>> => {
  return axios.get(url, config);
};
