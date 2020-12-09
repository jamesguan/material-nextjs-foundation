import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import CustomTextField from './common/CustomTextField';

const TextField = ({id, name, ...props}) => (
  <Field
    id={id}
    name={name}
    component={CustomTextField}
    {...props}
  />
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextField;