import * as yup from 'yup';
import { get, set } from 'lodash/fp';

export const validate = (schema, contexts = [], externalValues = {}) => (value, allValues = {}) => {
  const reducer = (context, name) => set(name)(get(name)(allValues) ?? '')(context);
  const context = contexts.reduce(reducer, {});
  Object.assign(context, externalValues);

  try {
    schema.validateSync(value, {context});
  } catch (e) {
    return e.message;
  }
};

export const validateAll = (schema, contexts = []) => (value, allValues) => {
  const context = contexts.reduce((context, name) => {
    context[name] = allValues[name] ?? '';
    return context;
  }, {});

  try {
    schema.validateSync(value, { abortEarly: false, context });
  } catch (e) {
    return e;
  }
};

export const requiredSchema = message => yup.mixed().required(message);

export const notRequiredSchema = message => yup.mixed().notRequired(message);

export const isAnOption = options => value => options.some(option => option.value === value);
