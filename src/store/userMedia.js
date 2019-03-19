// root state object.
// each Vuex instance is just a single state tree.

const initialState = {
  currentMedia: {}
};
const state = Object.assign({}, initialState);

const getters = {
  getCurrentMedia: state => {
    return state.currentMedia
  },

};

const actions = {
  switchCurrentMedia : ({commit}, payload) => {
  commit('setCurrentMedia', payload.media)
  }

};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  ['resetUserData'](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
      //console.log(state[prop])
    }
  },
  ['setCurrentMedia'](state, media) {
    state.currentMedia = media;

  },
};
export default {state, getters, actions, mutations}
