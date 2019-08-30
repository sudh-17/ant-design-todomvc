import Vue from "vue";
import { FILTER_TYPE, PAGE_SIZE } from "../mutation-type";

const app = {
  state: {
    filter: "all",
    pageSize: Vue.ls.get('PAGE_SIZE') ? Vue.ls.get('PAGE_SIZE'): 6
  },
  mutations: {
    SET_FILTER_TYPE: (state, value) => {
      state.filter = value;
      Vue.ls.set(FILTER_TYPE, value);
    },
    SET_PAGE_SIZE: (state, value) => {
      state.pageSize = value;
      Vue.ls.set(PAGE_SIZE, value);
    }
  },
  actions: {
    SetFilterType({ commit }, value) {
      commit("SET_FILTER_TYPE", value);
    },
    SetPageSize({ commit }, value) {
      commit("SET_PAGE_SIZE", value);
    }
  }
};

export default app;
