import Vue from 'vue'
import store from '../store/store.js'
import {
  FILTER_TYPE
} from '../store/mutation-type.js'

export default function Initializer () {
  store.commit('SET_FILTER_TYPE', Vue.ls.get(FILTER_TYPE, 'all'))
}
