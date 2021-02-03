import { reactive, readonly } from "vue";
import { apiGetUserData, apiGetRepos } from "../api";

const state = reactive({
  userName: "",
  repoList: [],
  avatarUrl: "",
  updatedAt: "",
  publicRepos: 0,
  page: 1,
  limit: 10,
  allPage: 0
});

const resetData = () => {
  state.userName = "";
  state.repoList = [];
  state.page = 1;
  state.allPage = 0;
  state.avatarUrl = "";
  state.updatedAt = "";
};

const setPage = () => {
  state.page++;
};

const setUserName = name => {
  state.userName = name;
};

// 取得user資料
const fetchUserData = async name => {
  try {
    const ud = await apiGetUserData(name);
    const { login, avatar_url, public_repos, updated_at } = ud.data;

    state.userName = login;
    state.avatarUrl = avatar_url;
    state.updatedAt = updated_at;
    state.publicRepos = public_repos;
    state.allPage = Math.ceil(state.publicRepos / state.limit);
  } catch (error) {
    if (error.response.status === 404) {
      state.avatarUrl = require("../assets/notFound.jpg");
      state.userName = "This user is not found!";
    }
  }
};

// 取得Repo列表
const fetchRepos = async name => {
  if (state.page > state.allPage) return;
  const repos = await apiGetRepos(name, state.page, state.limit);
  state.repoList = [...state.repoList, ...repos.data];
};

export default {
  state: readonly(state),
  fetchUserData,
  fetchRepos,
  setPage,
  setUserName,
  resetData
};
