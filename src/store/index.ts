import { createStore } from 'vuex';
import state from './state.ts';
import mutations from './mutations.ts';
import actions from './actions.ts';
import modules from './modules.ts';

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
