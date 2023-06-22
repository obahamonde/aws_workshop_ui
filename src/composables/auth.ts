import { UserLogin, UserSignUp } from "~/types";

const response = ref<any>(null);

export const useAuth = () => {
  const login = async (user: UserLogin) => {
    const { data } = await useFetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    response.value = unref(data);
  };

  const register = async (user: UserSignUp) => {
    const { data } = await useFetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(user),
    });

    response.value = unref(data);
  };

  const confirm = async (code: number, username: string) => {
    const { data } = await useFetch(
      "/api/confirm?code=" + code + "&username=" + username,
      {
        method: "POST",
      }
    );
    response.value = unref(data);
  };

  const userInfo = async (token: string) => {
    const { data } = await useFetch("/api/user?token=" + token).json();
    return unref(data);
  };

  const forgot = async (email: string) => {
    const { data } = await useFetch("/api/forgot?email=" + email, {
      method: "POST",
    });

    response.value = unref(data);
  };

  const confirmforgot = async (
    code: number,
    username: string,
    password: string
  ) => {
    const { data } = await useFetch("/api/confirm-forgot", {
      method: "POST",
      body: JSON.stringify({ code, username, password }),
    });
    response.value = unref(data);
  };

  const loginWithGithub = async (code: string) => {
    const { data } = await useFetch("/api/github?code=" + code, {
      method: "POST",
    }).json();

    return unref(data);
  };

  const GIHUB_URL =
    "https://github.com/login/oauth/authorize?client_id=00fc60bdaf14af17bf6f&redirect_uri=http://localhost:3000/login&scope=user,repo";

  const signinWithPopup = () => {
    window.location.href = GIHUB_URL;
  };

  watchEffect(() => {
    if (response.value) {
      console.log(response.value);
    }
  });

  return {
    login,
    register,
    confirm,
    userInfo,
    response,
    forgot,
    confirmforgot,
    signinWithPopup,
    loginWithGithub,
  };
};
