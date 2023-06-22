<script setup lang="ts">
import type { ContainerCreate } from "~/types";
const { state } = useStore();
const query = ref("");
const q = computed(() => query.value);
const res = ref();
const save = (data: any) => {
  state.repos = data;
  return state.repos;
};
const handleUpload = async (repo: string) => {
  const obj: ContainerCreate = {
    login: state.user!.name,
    repo: repo,
    token: state.token!,
    email: state.user!.email,
  };
  const { data } = await useFetch("/api/github/connect", {
    method: "PATCH",
    body: JSON.stringify(obj),
  });
  res.value = unref(data);
};

const deleteRepo = async (repo: string) => {
  const { data } = await useFetch(
    "/api/github/repo?token=" +
      state.token +
      "&repo=" +
      repo +
      "&login=" +
      state.user!.name,
    {
      method: "DELETE",
    }
  ).json();
  res.value = unref(data);
  state.notifications.push({
    message: "Repo deleted",
    status: "success",
  });
};
</script>
<template>
  <main class="container">
    <input
      type="text"
      v-model="query"
      class="input-text top-12 absolute"
      placeholder="Search for your repositories"
    />
    <Request
      :url="`/api/github/repos?token=${state.token}&query=${q}&login=${state.user!.name}`"
      v-if="q"
    >
      <template #default="{ res }">
        <div class="grid3">
          <div class="card" v-for="repo in save(res)">
            <GithubRepository
              :repo="repo"
              @upload="handleUpload($event)"
              @delete="deleteRepo($event)"
            />
          </div>
        </div>
      </template>
      <template #loading="{ fetching }">
        <div v-if="fetching">Loading...</div>
      </template>
      <template #error="{ error }">
        <div v-if="error">Error: {{ error }}</div>
      </template>
    </Request>
  </main>
</template>
