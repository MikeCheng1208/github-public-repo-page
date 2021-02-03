<script>
import { onMounted, provide } from "vue";
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
    onMounted(async () => {
      await store.fetchUserData("MikeCheng1208");
      await store.fetchGetRepos(
        store.state.username,
        store.state.page,
        store.state.limit
      );
    });
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
