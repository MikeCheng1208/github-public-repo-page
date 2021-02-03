<script>
import { inject, toRefs, watch } from "vue";
import { useScrollDown } from "../composition/useScrollDown";
import Loading from "./Loading.vue";
export default {
  name: "ReposList",
  components: {
    Loading
  },
  setup() {
    const mapStore = inject("mapStore");
    const { state, fetchGetRepos, setPage } = mapStore;
    const { isDown } = useScrollDown();

    watch(isDown, newVal => {
      if (!newVal) return;
      setPage();
      fetchGetRepos(state.username, state.page, state.limit);
    });

    return {
      ...toRefs(state),
      isDown
    };
  }
};
</script>

<template>
  <ul class="card-box">
    <li v-for="item in repoList" :key="item.name">
      <h1 class="title">{{ item.name }}</h1>
      <h2 class="description">{{ item.description }}</h2>
      <a class="url" :href="item.html_url" target="_blank">
        {{ item.html_url }}
      </a>
      <div class="star-box">
        <img class="star-icon" src="../assets/star.svg" alt="" />
        {{ item.stargazers_count }}
      </div>
    </li>
  </ul>
  <Loading v-if="page < all_page" />
</template>

<style lang="scss" scoped>
.card-box {
  > li {
    display: block;
    width: 500px;
    margin: 0 auto 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(rgb(71, 71, 71), 0.1);
    h1,
    h2,
    a,
    div {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
    > h1.title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    > h2.description {
      color: #7f7f7f;
      font-size: 16px;
      margin-bottom: 5px;
    }
    > a {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #888;
      text-decoration: none;
      margin-bottom: 5px;
      &:hover {
        color: #3d638a;
        font-weight: bold;
      }
    }
    .star-box {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      font-weight: bold;
      color: #888;
      > img.star-icon {
        display: block;
        width: 20px;
        margin-right: 4px;
      }
    }
  }
}
</style>
