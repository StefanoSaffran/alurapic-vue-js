<template>
  <div id="app">
    <my-menu :rotas="routes"></my-menu>

    <transition name="change-page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Menu from "./components/shared/menu/Menu.vue"
import { routes } from "./routes";
export default {
  name: "app",

  data() {
    return {
       routes: routes.filter(route => route.menu)
    };
  },

  components: {
    "my-menu": Menu
  },
};
</script>

<style>

body {
  background: wheat;
}
#app {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;

}

.change-page-enter, .change-page-leave-active {
  opacity: 0
}

.change-page-enter-active, .change-page-leave-active {
  transition: opacity .2s
}
</style>
