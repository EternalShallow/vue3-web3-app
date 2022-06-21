const actions = {
  CHANGEACCOUNT(context: { commit: (arg0: string, arg1: string) => void; }, item: string) {
    context.commit('changeAccount', item);
  },
};
export default actions;
