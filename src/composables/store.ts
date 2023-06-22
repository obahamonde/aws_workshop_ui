import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive } from "vue";
import type { Notify, User, GithubRepo } from "~/types";

export const useStore = defineStore("state", () => {
  const state = reactive({
    notifications: [] as Notify[],
    user: null as User | null,
    data: null as any,
    token: null as string | null,
    repos: [] as GithubRepo[],
    tarballs: [] as string[],
  });

  return {
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
