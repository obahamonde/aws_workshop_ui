<script setup lang="ts">
import { useAuth } from "~/composables";
import { UserLogin, UserSignUp } from "~/types";
const {
  login,
  register,
  confirm,
  userInfo,
  response,
  forgot,
  confirmforgot,
  signinWithPopup,
  loginWithGithub,
} = useAuth();
const { query } = useRoute();
const { loads } = useJson();
const { state } = useStore();
const toggle = ref(false);
const code = ref<number | null>(null);
const userLogin = reactive<UserLogin>({
  username: "",
  password: "",
});

const userSignUp = reactive<UserSignUp>({
  name: "",
  email: "",
  password: "",
  picture: "",
});

const handleUpload = (url: string) => {
  userSignUp.picture = url;
  state.notifications.push({
    message: "Upload successful",
    status: "success",
  });
};

const registerhook = async () => {
  if (!userSignUp.email || !userSignUp.password || !userSignUp.name) {
    state.notifications.push({
      message: "Please fill all fields",
      status: "error",
    });
    return;
  }
  await register(userSignUp);
  state.notifications.push({
    message: "A verification code has been sent to your email",
    status: "info",
  });
};

const forgothook = async () => {
  if (!userLogin.username) {
    state.notifications.push({
      message: "Please enter your email",
      status: "error",
    });
    return;
  }
  await forgot(userLogin.username);
  const { Destination, DeliveryMedium } = loads(state.data);
  state.notifications.push({
    message: `A verification code has been sent to your ${DeliveryMedium} ${Destination} `,
    status: "info",
  });
};

const confirmforgothook = async () => {
  if (!code.value || !userLogin.username) {
    state.notifications.push({
      message: "Please enter a code",
      status: "error",
    });
    return;
  } else {
    await confirmforgot(code.value, userLogin.username, userLogin.password);
    state.notifications.push({
      message: "Password reset successful",
      status: "success",
    });
  }
};

const loginhook = async () => {
  if (!userLogin.username || !userLogin.password) {
    state.notifications.push({
      message: "Please fill all fields",
      status: "error",
    });
    return;
  }
  await login(userLogin);
  state.notifications.push({
    message: "Login successful",
    status: "success",
  });
};

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

const confirmation = async () => {
  if (!code.value) {
    state.notifications.push({
      message: "Please enter a code",
      status: "error",
    });
    return;
  }
  await confirm(code.value, userSignUp.email);
  state.notifications.push({
    message: "Confirmation successful",
    status: "success",
  });
  toggle.value = !toggle.value;
};

const handleFocus = (e: FocusEvent) => {
  const target = e.target as HTMLInputElement;
  target.parentElement!.parentElement!.classList.add("box-animation");
};

const handleBlur = (e: FocusEvent) => {
  const target = e.target as HTMLInputElement;
  target.parentElement!.parentElement!.classList.remove("box-animation");
};
const token = computed(() => loads(response.value)?.AccessToken);

const sub = computed(() => loads(response.value)?.UserSub);

const dest = computed(() => loads(response.value)?.Destination);

const authCode = computed(() => query?.code?.toString());

watch(token, async (token) => {
  if (token) {
    state.user = await userInfo(token);
  }
});

watch(response, (response) => {
  state.data = loads(response as any);
});

onMounted(async () => {
  if (authCode.value) {
    await githubhook(authCode.value);
  }
});
</script>
<template>
  <section v-if="state.user">
    <slot />
  </section>

  <form class="main-form-container" v-else>
    <div class="form-container" :class="toggle ? 'left-right' : 'right-left'">
      <div class="login-form form-wraper">
        <div>
          <div class="form-title">
            <h2 class="text-center text-lg">Login</h2>
          </div>
          <div class="input-group">
            <div class="box">
              <span>
                <input
                  placeholder="Email"
                  class="myInput"
                  type="email"
                  v-model="userLogin.username"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                />
              </span>
            </div>
          </div>
          <div class="input-group">
            <div class="box">
              <span>
                <input
                  placeholder="Password"
                  class="myInput"
                  type="password"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="userLogin.password"
                />
              </span>
            </div>
          </div>
          <div class="input-group" v-if="dest">
            <div class="box">
              <span>
                <input
                  placeholder="Code"
                  class="myInput"
                  type="number"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="code"
                />
              </span>
            </div>
          </div>
          <div class="action-button">
            <button class="social-login" @click.prevent="signinWithPopup()">
              Login with Github
              <Icon icon="logos:github-icon" class="social-btn" />
            </button>
          </div>
          <div class="action-button">
            <button @click.prevent="loginhook()"><span>Login</span></button>
          </div>
          <div>
            <button
              class="hover:underline my-4"
              @click.prevent="forgothook()"
              v-if="!dest"
            >
              Forgot Password?
            </button>
            <button
              class="hover:underline my-4"
              @click.prevent="confirmforgothook()"
              v-if="dest"
            >
              Confirm Forgot Password?
            </button>
          </div>
        </div>
      </div>
      <div class="signUp-form form-wraper">
        <div>
          <div class="form-title">
            <h2 class="text-center text-lg"><span>Sign Up</span></h2>
          </div>
          <div class="input-group">
            <div class="box">
              <span>
                <input
                  placeholder="Full Name"
                  class="myInput"
                  type="text"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="userSignUp.name"
                />
              </span>
            </div>
          </div>
          <div class="input-group">
            <div class="box">
              <span>
                <input
                  placeholder="Email"
                  class="myInput"
                  type="email"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="userSignUp.email"
                />
              </span>
            </div>
          </div>
          <div class="input-group">
            <div>
              <span>
                <Upload @upload="handleUpload($event)" />
              </span>
            </div>
          </div>
          <div style="margin-bottom: 0px" class="input-group" v-if="!sub">
            <div class="box">
              <span>
                <input
                  placeholder="Password"
                  class="myInput"
                  type="password"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="userSignUp.password"
                />
              </span>
            </div>
          </div>
          <div style="margin-bottom: 0px" class="input-group">
            <div class="box" v-if="sub">
              <span>
                <input
                  placeholder="Confirmation Code"
                  class="myInput"
                  type="number"
                  @focus="handleFocus($event)"
                  @blur="handleBlur($event)"
                  v-model="code"
                />
              </span>
            </div>
          </div>
          <div class="action-button">
            <button v-if="!sub" @click.prevent="registerhook()">
              <span>Sign Up</span>
            </button>
            <button v-if="sub" @click.prevent="confirmation()">
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="multiple-btn" class="bg-btn-container">
      <div class="action-button">
        <button @click.prevent="toggle = !toggle">Login</button>
      </div>
      <div class="action-button">
        <button @click.prevent="toggle = !toggle"><span>Sign Up</span></button>
      </div>
    </div>
  </form>
</template>
<route lang="yaml">
meta:
  title: Login
  description: Login
  keywords: Login
  layout: home
</route>
