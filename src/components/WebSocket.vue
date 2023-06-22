<script setup lang="ts">
import { useWebsockets } from "~/composables/webSockets";
const props = defineProps<{ url: string }>();
const rxProps = reactive<{ url: string }>({ url: props.url });
const { status, messages, webSocket, send } = useWebsockets(rxProps.url);
const message = ref<string | Object>();
</script>

<template>
  <slot :this="{ message, status, messages, webSocket, send }" />
</template>
