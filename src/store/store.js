import Vue from 'vue'
import Vuex from 'vuex'
import UserMedia from './userMedia'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules:{
    userMedia: UserMedia
  }
})
