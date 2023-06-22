<template>
  <main class="container">
    <Dark class="x4" />
    <Auth>
      <Notifier />
      <NavBar />
      <RouterView />
    </Auth>
  </main>
</template>
<style>
main {
  background-image: url(/bg.png);
}
</style>
