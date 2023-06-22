import { useJson } from "~/composables/json";

export const useWebsockets = (url: string) => {
  const { status, data, close, ws: webSocket, open, send } = useWebSocket(url);
  const { loads } = useJson();
  const messages = ref<Object[]>([]);
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
    send,
    webSocket,
  };
};
