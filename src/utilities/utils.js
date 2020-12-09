import { useDispatch } from 'react-redux';
export const checkServer = () => {
  return typeof window === 'undefined';
};

export const useRematchDispatch = (selector) => {
  const dispatch = useDispatch();
  return selector(dispatch);
};
