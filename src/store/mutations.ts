const mutations = {
  changeAccount(state: { walletAddress: string; walletAddressShort: string }, payload: string) {
    console.log(payload);
    if (payload) {
      state.walletAddress = payload;
      state.walletAddressShort = `${payload.substr(0, 5)}...${payload.substr(payload.length - 5, payload.length)}`;
    } else {
      state.walletAddress = '';
      state.walletAddressShort = '';
    }
  },
};
export default mutations;
