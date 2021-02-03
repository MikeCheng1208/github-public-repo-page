import { inject } from "vue";

export const useRepoSearch = () => {
  const store = inject("mapStore");

  const { resetData, fetchUserData, fetchRepos } = store;

  const searchData = async name => {
    resetData();
    await fetchUserData(name);
    await fetchRepos(name);
  };

  return { searchData };
};
