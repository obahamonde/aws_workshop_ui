<script setup lang="ts">
import type { ContainerCreate } from "~/types";
const $state = reactive({
  about: "Pick your template",
  templates: [
    "logos:react",
    "logos:vue",
    "logos:flask",
    "logos:express",
    "simple-icons:fastapi",
    "logos:php",
  ],
  response: null as any,
});
const { state } = useStore();

const selected = ref("");

const containerCreate = reactive<ContainerCreate>({
  login: state.user!.name,
  repo: "",
  token: state.token!,
  email: state.user!.email,
  image: computed(() =>
    selected.value ? (selected.value.split(":").pop() as string) : null
  ) as any,
});

const createRepo = async (body: ContainerCreate) => {
  const { data } = await useFetch("/api/github/workspace", {
    method: "POST",
    body: JSON.stringify(body),
  }).json();
  $state.response = unref(data);
  state.notifications.push({
    message: "Template created",
    status: "success",
  });
};

const toggle = computed(() => {
  return selected.value ? true : false;
});
</script>
<template>
  <div>
    <h1 class="text-center text-2xl font-bold text-teal-700 col center gap-4" v-if="$state.response">
      <a :href="$state.response.workspace.ip" target="_blank" class="text-teal-700">
        {{ $state.response.workspace.url }}
      </a>

      <a :href="$state.response.preview.ip" target="_blank" class="text-teal-700">
        {{ $state.response.preview.url }}
      </a>

      <a :href="$state.response.repo" target="_blank" class="text-teal-700">
        {{ $state.response.repo12 }}
      </a>
    </h1>
  </div>
  <section class="grid3">
    <div v-for="template in $state.templates" class="col center gap-8">
      <Icon :icon="template" class="template-icon" @click="selected = template"
        :class="selected === template ? 'animate-bounce' : ''" />
      <h1 class="template-name">{{ template.split(":").pop() }}</h1>
    </div>
  </section>
  <Modal v-if="toggle" :title="$state.about" @close="selected = ''">
    <div class="flex flex-col gap-4 action-button">
      <span>
        <input class="input-text" v-model="containerCreate.repo" placeholder="Repository name" />
      </span>
      <button @click="createRepo(containerCreate)" :disabled="!containerCreate.repo">
        Get started
      </button>
    </div>
  </Modal>
</template>
<style scoped>
.template-icon {
  @apply x6 cp scale text-teal-700 m-8;
}

.template-name {
  @apply text-center text-teal-700 m-4 text-lg font-bold;
}
</style>
