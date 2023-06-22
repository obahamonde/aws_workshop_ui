<script setup lang="ts">
const title = useTitle("Welcome to Blackbox");
const logo = useFavicon("/logo.svg");
const text = ref(
  "Focus on delivering value, writing business logic, and creating stunning user interfaces while Blackbox takes care of the rest.Say goodbye to infrastructure worries and operations hassle. Our platform offers seamless automation and CI / CD capabilities, empowering developers to accelerate their workflow and streamline software delivery."
);
useHead({
  title: title.value,
  meta: [
    { name: "description", content: text.value },
    {
      name: "theme-color",
      content: () => (isDark.value ? "#008080" : "#ffffff"),
    },
  ],
});
</script>
<template>
  <Landing :title="title!" :logo="logo!" :text="text" hero="/bg.png" />
</template>
<route lang="yaml">
meta:
  title: Home
  layout: noauth
</route>
