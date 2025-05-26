import { createUser } from "../../redux/action/common";

export interface ApiEndpoint {
  api: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  baseURL: 'normal' | 'auth';
}

export const Auth: Record<string, ApiEndpoint> = {
  login: {
    api: "/login",
    method: "post",
    baseURL: "auth",
  },
};
export const data: Record<string, ApiEndpoint> = {
  getData: {
    api: "/users",
    method: "get",
    baseURL: "auth",
  },
  createUser: {
    api: "/users",
    method: "post",
    baseURL: "auth",
  },
  delete: {
    api: "/users",
    method: "post",
    baseURL: "auth",
  },
};