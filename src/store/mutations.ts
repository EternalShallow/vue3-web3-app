const mutations = {
  changeAccount(state: { walletAddress: string; walletAddressShort: string }, payload: any) {
    state.walletAddress = payload;
    state.walletAddressShort = `${payload.substr(0, 5)}...${payload.substr(payload.length - 5, payload.length)}`;
  },
};
export default mutations;
