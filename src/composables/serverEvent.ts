import { useJson } from "~/composables";

export const useServerEvents = (url: string) => {
  const { status, data, close, eventSource, error } = useEventSource(url);
  const { loads } = useJson();
  const messages = ref<Object[]>([]);
  const open = () => {
    if (eventSource.value) return;
    eventSource.value = new EventSource(url);
    eventSource.value.onmessage = (event) => {
      messages.value.push(loads(event.data));
    };
  };
  watch(data, (newData) => {
    if (newData) {
      messages.value.push(
        typeof newData === "string" ? loads(newData) : newData
      );
    }
  });

  onMounted(() => {
    open();
  });

  onUnmounted(() => {
    close();
  });

  return {
    status,
    messages,
    error,
    eventSource,
  };
};
