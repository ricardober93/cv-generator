import { jsonb } from 'drizzle-orm/pg-core';
import { queryOptions } from "@tanstack/react-query";
import { type ApiManager } from "@server/app";
import { CreatCurriculumInput, Curriculum } from "@server/models/Curruculum";
import { hc } from "hono/client";

const managerClient = hc<ApiManager>("/");

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


export const getCurriculum = async (id: string) => {
  const response = await managerClient.api.manager[":id"].$get({
    param: { id },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch curriculum");
  }

  const data = await response.json();
  return data;
};


export const createCurriculum = async ( {
  name,
  email,
  phone,
  profile,
  city,
  education,
  experience,
  skills,
}: CreatCurriculumInput ) => {
  const response = await managerClient.api.manager["create"].$post({
    json: {
      name,
      email,
      phone,
      profile,
      city,
      education,
      experience,
      skills,
    },
  });
  const data = await response.json();
  return data;
};

export const updateCurriculum = async (id: string, body: Curriculum) => {
  const response = await managerClient.api.manager[":id"].$patch({
    param: { id },
    json: body,
  });

  if (response.status !== 200) {
    throw new Error("Failed to update curriculum");
  }

  const data = await response.json();
  return data
}



export const deleteNote = async (id: number) => {
  const response = await managerClient.api.manager[":id"].$delete({
    param: { id: id.toString() },
  });
  const data = await response.json();
  return data;
};
