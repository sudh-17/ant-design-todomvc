import Vue from "vue";
import { FILTER_TYPE } from "../mutation-type";

const app = {
  state: {
    filter: "all"
  },
  mutations: {
    SET_FILTER_TYPE: (state, value) => {
      state.filter = value;
      Vue.ls.set(FILTER_TYPE, value);
    }
  },
  actions: {
    SetFilterType({ commit }, value) {
      commit("SET_FILTER_TYPE", value);
    }
  }
};

export default app;
