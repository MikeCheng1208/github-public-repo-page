import { reactive, readonly } from "vue";
import { apiGetUserData, apiGetRepos } from "../api";

const state = reactive({
  username: "",
  repoList: [],
  avatar_url: "",
  updated_at: "",
  public_repos: 0,
  page: 1,
  limit: 10,
  all_page: 0
});

const resetData = () => {
  state.username = "";
  state.repoList = [];
  state.page = 1;
  state.all_page = 0;
  state.avatar_url = "";
  state.updated_at = "";
};

const setPage = () => {
  state.page++;
};

const setUserName = name => {
  state.username = name;
};

// 取得user資料
const fetchUserData = async name => {
  try {
    const ud = await apiGetUserData(name);
    const { login, avatar_url, public_repos, updated_at } = ud.data;

    state.username = login;
    state.avatar_url = avatar_url;
    state.updated_at = updated_at;
    state.public_repos = public_repos;
    const reposlimit = state.public_repos / state.limit;
    state.all_page = reposlimit % 1 === 0 ? reposlimit : (reposlimit | 0) + 1;
  } catch (error) {
    if (error.response.status === 404) {
      state.avatar_url = require("../assets/notFound.jpg");
      state.username = "This user is not found!";
    }
  }
};

// 取得Repo列表
const fetchGetRepos = async (name, page, limit) => {
  if (state.page > state.all_page) return;
  const repos = await apiGetRepos(name, page, limit);
  state.repoList = [...state.repoList, ...repos.data];
};

export default {
  state: readonly(state),
  fetchUserData,
  fetchGetRepos,
  setPage,
  setUserName,
  resetData
};
