import { useSelector } from 'react-redux';

import { lightTheme, darkTheme } from './colors';

export const useAppTheme = () => {
  const mode = useSelector(state => state.theme.mode);

  return mode === 'dark' ? darkTheme : lightTheme;
};
