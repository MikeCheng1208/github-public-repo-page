<script>
import { provide } from "vue";
import store from "@/composition/store";
import UserTitle from "@/components/UserTitle.vue";
import ReposList from "@/components/ReposList.vue";
export default {
  name: "App",
  components: {
    UserTitle,
    ReposList
  },
  setup() {
    provide("mapStore", store);
  }
};
</script>

<template>
  <div id="app">
    <UserTitle />
    <ReposList />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  background-color: #e5e5e5;
  padding-bottom: 10px;
}
#app {
  width: 100%;
}
</style>
