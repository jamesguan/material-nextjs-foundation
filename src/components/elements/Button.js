import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography } from '@material-ui/core';

import styled from 'styled-components';

const StyledContainer = styled(Typography)`
  &&& {
    padding: 8px 0;
  }
`;

const CustomButton = ({className, children, ...props}) => (
  <StyledContainer className={className}>
    <Button {...props}>
      {children}
    </Button>
  </StyledContainer>
);

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CustomButton;