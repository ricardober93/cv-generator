import { queryOptions } from "@tanstack/react-query";
import { type ApiManager } from "@server/app";
import { hc } from "hono/client";

const managerClient = hc<ApiManager>("/");

const getCurruculum = async () => {
  const response = await managerClient.api.manager["total"].$get();
  const data = await response.json();
  return data;
};

export const getCurruculumQueryOption = queryOptions({
  queryKey: ["Curruculum"],
  queryFn: getCurruculum,
});

const getUser = async () => {
  const response = await managerClient.api.me.$get();

  if (response.status !== 200) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
};

export const userQueryOptions = queryOptions({
  queryKey: ["currentUser"],
  queryFn: getUser,
  staleTime: Infinity,
});

const allCurruculum = async () => {
  const response = await managerClient.api.manager.$get();

  if (response.status !== 200) {
    throw new Error("Failed to fetch allCurruculum");
  }

  const data = await response.json();

  return data;
};

export const allCurruculumQueryOptions = queryOptions({
  queryKey: ["allCurruculum"],
  queryFn: allCurruculum,
});

export const createNote = async (title: string, content: string) => {
  const response = await managerClient.api.manager["create"].$post({
    json: {
      title,
      content,
    },
  });
  const data = await response.json();
  return data;
};

export const deleteNote = async (id: number) => {
  const response = await managerClient.api.manager[":id"].$delete({
    param: { id: id.toString() },
  });
  const data = await response.json();
  return data;
};
