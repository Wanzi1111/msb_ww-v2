import { getGroupDictAPI } from "@/api/group/word";

const state = {
  dict: {},
};

const mutations = {
  SET_DICT: (state, dict) => {
    state.dict = dict;
  },
  CLEAN_DICT: (state) => {
    state.dict = {};
  },
};

const actions = {
  // 获取字典
  async getDict({ commit }) {
    const res = await getGroupDictAPI();
    const data = res.payload || {};
    commit("SET_DICT", data);
    return Promise.resolve()
  },
  // 设置字典
  setDict({ commit, state }, data) {
    commit("SET_DICT", { ...state.dict, ...data });
  },
  // 清空字典
  cleanDict({ commit }) {
    commit("CLEAN_DICT");
  },
};
const myDict = {
  state,
  mutations,
  actions,
};

export default myDict;
