import { createStore } from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import modules from './modules';

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
