<template>
  <nav class="navbar">
    <router-link to="/" class="nav-left">{{ title }}</router-link>
    <div class="navbar-div" v-for="(rota, i) in rotas" :key="i">
      <router-link :to="rota.path ? rota.path : '/'" class="nav-item">{{ rota.title }}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      title: "Alurapic"
    };
  },

  props: {
    rotas: {
      type: Array,
      required: true
    }
  }
};

</script>

<style>
.navbar {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  background-color: beige;
  align-items: center;
  justify-content: center;
}

.navbar-div {
  display: flex;
  align-items: center;
}

.nav-left {
  font-weight: bold;
  font-size: 2em;
  text-decoration: none;
  color: black;
  margin-right: 60%;
}

.nav-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: black;
}
</style>
