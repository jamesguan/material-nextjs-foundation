import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

export const getValueFromSelector = selector => createSelector(
  selector,
  value => value,
);

export const  getSelector = getValueFromSelector((state, namespace) => get(namespace)(state));

export const extendSelectorWithNamespace = selector => (state, namespace) => (namespace ? getSelector(selector(state), namespace) : selector(state));
export const createSliceSelector = name => extendSelectorWithNamespace(state => getSelector(state, name));
export const getValueAtPath = path => getValueFromSelector(createSliceSelector(path));

export const createFormValueSelector = rootReducerNamespace => form => (state, fieldName) => getSelector(getSelector(state, rootReducerNamespace), `${form}.values.${fieldName}`);
