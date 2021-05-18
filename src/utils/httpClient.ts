/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance } from 'axios';
import { getEnv } from './env';

export interface HttpClientHook {
  getAsync: <T>(url: string) => Promise<T>;
  postAsync: <T>(url: string, payload: any) => Promise<T>;
  patchAsync: <T>(url: string, payload: any) => Promise<T>;
  deleteAsync: <T>(url: string) => Promise<T>;
}

const createClient = async (baseURL: string): Promise<AxiosInstance> => {
  return axios.create({
    baseURL,
    withCredentials: true, // Pass the cookie along
  });
};

const getAsync = async <T>(url: string, baseURL: string): Promise<T> => {
  const client = await createClient(baseURL);
  const result = await client.get<T>(url);
  return result.data;
};

const postAsync = async <T>(url: string, payload: any, baseURL: string): Promise<T> => {
  const client = await createClient(baseURL);
  const result = await client.post<T>(url, payload);
  return result.data;
};

const patchAsync = async <T>(url: string, payload: any, baseURL: string): Promise<T> => {
  const client = await createClient(baseURL);
  const result = await client.patch<T>(url, payload);
  return result.data;
};

const deleteAsync = async <T>(url: string, baseURL: string): Promise<T> => {
  const client = await createClient(baseURL);
  const result = await client.delete<T>(url);
  return result.data;
};

const buildHttpClient = (): HttpClientHook => {
  const { timesheetUrl } = getEnv();
  const baseURL = `${timesheetUrl}/api`;
  return {
    getAsync: (url: string) => getAsync(url, baseURL),
    postAsync: (url: string, payload: any) => postAsync(url, payload, baseURL),
    patchAsync: (url: string, payload: any) => patchAsync(url, payload, baseURL),
    deleteAsync: (url: string) => deleteAsync(url, baseURL),
  };
};

export { buildHttpClient };
