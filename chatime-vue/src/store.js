/**
 * Created by Jaypee on 4/17/2018.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store ({
  state: {
    connect: false,
    users: []
  },
  mutations: {
    SOCKET_CONNECT: (state, status) => {
      state.connect = true;
    },
    USER_CONNECTED: (state, payload) => {
      state.users = payload;
    },
    USER_DISCONNECTED: (state, payload) => {
      let user_index = state.users.findIndex(user => user.id === payload.id);
      state.users.splice(user_index, 1);
    }
  },
  actions: {
    socket_getUsers: ({commit}, payload) => {
      commit('USER_CONNECTED', payload);
    },
    socket_userDisconnected: ({commit}, payload) => {
      commit('USER_DISCONNECTED', payload);
    }
  }
})
