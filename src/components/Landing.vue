<script setup lang="ts">
const { loginWithGithub, signinWithPopup } = useAuth();
const { query } = useRoute();

defineProps({
  title: String,
  logo: String,
  hero: String,
  text: String,
});

const authCode = computed(() => query?.code?.toString());

const { state } = useStore();
const githubhook = async (code: string) => {
  const res = await loginWithGithub(code);
  const { user, token } = res;
  state.user = user;
  state.token = token;
  state.notifications.push({
    message: `Welcome ${state.user!.name}`,
    status: "success",
  });
};

onMounted(async () => {
  if (state.user) {
    const router = useRouter();
    router.push("/dashboard");
  }
  if (authCode.value) {
    await githubhook(authCode.value);
  }
});
</script>
<template>
  <main
    class="container w-full px-64 col center mx-auto h-full"
    :style="'background-image: url(' + hero + ')'"
  >
    <img
      :src="logo"
      alt="logo"
      class="x12 m-16 logo"
      @click="signinWithPopup()"
    />
    <h1 class="text-gray-300 font-script text-4xl">{{ title }}</h1>
    <p class="text-light text-xl font-sans m-16">{{ text }}</p>

    <div class="action-button">
      <button class="social-login" @click.prevent="signinWithPopup()">
        Login with Github
        <Icon icon="logos:github-icon" class="social-btn" />
      </button>
    </div>
    <div class="action-button">
      <div class="action-button">
        <button class="social-login" @click.prevent="$router.push('/login')">
          Login with Email
          <Icon icon="mdi:email" class="social-btn" />
        </button>
      </div>
    </div>
  </main>
</template>
