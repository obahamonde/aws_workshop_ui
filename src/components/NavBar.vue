<script setup lang="ts">
const { state } = useStore();
const { user } = state;
const routes = ref([
  {
    title: "Home",
    to: "/",
    icon: "mdi-home",
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Profile",
    to: "/profile",
    icon: "mdi-account",
  },
  {
    title: "Settings",
    to: "/settings",
    icon: "mdi-cog",
  },
]);

const logout = () => {
  state.user = null;
  const router = useRouter();
  router.push("/");
};
</script>
<template>
  <div class="sidebar">
    <div class="rf col center">
      <img
        src="/logo.svg"
        alt="logo"
        class="x3 rf text-center my-4 p-1 logo hover:animate-spin"
      />
    </div>
    <ul class="nav-list">
      <li class="nav-item" v-for="route in routes">
        <RouterLink :to="route.to" :key="route.to">
          <span class="nav-item__icon">
            <Icon :icon="route.icon" />
          </span>
          <span class="nav-item__text">
            {{ route.title }}
          </span>
        </RouterLink>
      </li>
    </ul>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="#">
          <span class="nav-item__icon avatar">
            <img :src="user!.picture" alt="avatar" />
          </span>
          <span class="nav-item__text">
            {{ user!.name }}
          </span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#">
          <span class="nav-item__icon logout cp" @click="logout()">
            <Icon icon="mdi-logout" />
          </span>
          <span class="nav-item__text"> Logout </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: #fff;
  text-decoration: none;
}

body {
  font-family: "Roboto", sans-serif;
}

.sidebar {
  width: 4rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  cursor: pointer;
  background: #008080;
  transition: 0.5s;
  overflow: hidden;
}

.sidebar:hover {
  width: 12rem;
}

.brand {
  margin: 1rem 0;
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  color: #fff;
}

.brand:hover {
  background: #007080;
}

.brand span {
  display: none;
}

.nav-list {
  list-style: none;
}

.nav-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item:hover {
  background: #007080;
}

.nav-item a {
  position: relative;
  white-space: nowrap;
  display: flex;
  gap: 1rem;
}

.nav-item__icon {
  position: relative;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item__text {
  position: relative;
  display: none;
  font-size: 0.75em;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: 700;
}

.logout {
  margin-left: 0.2rem;
}

.sidebar:hover .brand span {
  display: inline;
}

.sidebar:hover .nav-item {
  justify-content: start;
}

.sidebar:hover .nav-item__text {
  display: flex;
  align-items: center;
}

.router-link-exact-active {
  @apply text-#00ffff;
}
</style>
