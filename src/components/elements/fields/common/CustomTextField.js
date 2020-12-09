import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

/*
  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];
*/
const CustomTextField = ({
  className,
  formatError,
  formatValue,
  input,
  meta,
  ...inputProps
}) => {
  const { error, invalid, touched } = meta;

  return (
    <TextField
      className={className}
      error={touched && invalid}
      helperText={touched ? (formatError ? formatError(meta.error) : error) : undefined}
      value={formatValue ? formatValue(input.value, meta) : input.value}
      {...input}
      {...inputProps}
    />
  );
};

CustomTextField.propTypes = {
  className: PropTypes.string,
  formatError: PropTypes.func,
  formatValue: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    invalid: PropTypes.bool,
    touched: PropTypes.bool,
    warning: PropTypes.bool,
  }).isRequired,
};

CustomTextField.defaultProps = {
  formatError: undefined,
  formatValue: undefined,
};

export default CustomTextField;