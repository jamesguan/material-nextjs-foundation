import { useMemo } from 'react';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { init } from '@rematch/core';

import * as models from './models';

let store;

export const initStore = (initialState) => {
  store = init({
    models,
    plugins: [],
    redux: {
      devToolOptions: {
        disabled: false,
      },
      initialState,
      middlewares: [thunk],
      reducers: {
        form: formReducer,
      },
    },
  });
  return store;
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

export const useStore = (initialState) => {
  store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};