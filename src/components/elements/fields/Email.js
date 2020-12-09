import PropTypes from 'prop-types';
import * as yup from 'yup';

import TextField from './TextField';
import { normalize, normalizeLength } from './common/normalize';
import { validate } from './common/validate';

export  const validateEmail = value => !/\.con$/i.test(value);

export const emailSchema = yup
  .string()
  .max(320, 'Email address cannot exceed ${max} characters')
  .required('Email is required')
  .email("Your email should look like 'email@example.com'");

export const emailSchemaWarn = yup
  .string()
  .test('validateEmail', "Please verify that your email address is correct", validateEmail);

const validateNormal  = validate(emailSchema);
const validateWarn  = validate(emailSchemaWarn);
const Email = ({ id, name, placeholder, ...props }) => (
  <TextField
    fullWidth
    required
    id={id}
    name={name}
    placeholder={placeholder}
    normalize={normalize(normalizeLength(320))}
    type="email"
    validate={validateNormal}
    warn={validateWarn}
    {...props}
  />
);

Email.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

Email.defaultProps = {
  label: 'Email',
  id: 'email',
  name: 'email',
  placeholder: 'Please enter your email',
};

export default Email;