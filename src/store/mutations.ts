const mutations = {
  changeAccount(state: { account: any; }, payload: any) {
    console.log(payload);
    // eslint-disable-next-line no-param-reassign
    state.account = payload;
  },
};
export default mutations;
