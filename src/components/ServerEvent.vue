<script setup lang="ts">
import { useServerEvents } from "~/composables/serverEvent";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const rxProps = reactive(props);

const { messages, eventSource, status } = useServerEvents(rxProps.url);

watch(eventSource, (newVal, oldVal) => {
  if (oldVal) {
    oldVal.close();
  }
  eventSource.value = newVal;
});
</script>
<template>
  <div v-if="status === 'OPEN'">
    <slot :messages="messages" />
  </div>
  <div v-else-if="status === 'CONNECTING'">
    <slot name="loading">
      <Icon icon="mdi-loading" class="animate-spin x2" />
    </slot>
  </div>
  <div v-else-if="status === 'CLOSED'">
    <slot name="error">
      <p class="text-error">Connection closed</p>
    </slot>
  </div>
</template>
