import PropTypes from 'prop-types';
import Button from './Button';

const SubmitButton = ({processing, error, children, disabled, ...props}) => (
  <Button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
    {...props}
  >
    {processing ? 'Processing...' : children}
  </Button>
);

SubmitButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  processing: PropTypes.bool,
};

SubmitButton.defaultProps = {
  children: '',
  disabled: false,
  error: false,
  processing: false,
};

export default SubmitButton;