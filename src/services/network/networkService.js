import NetInfo from '@react-native-community/netinfo';

export const listenToNetwork = callback => {
  return NetInfo.addEventListener(state => {
    callback(state.isConnected);
  });
};

export const isInternetAvailable = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
