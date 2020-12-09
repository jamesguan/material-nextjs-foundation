import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

import CenterContent from '../containers/CenterContent';

import { WEBSITE_NAME } from '../../constants/constants';

const CustomFooter = styled.footer`
  color: white;
  background-color: black;
  height: 80px;
  padding: 16px;
`;

const Footer = () => (
  <CustomFooter>
    <CenterContent>
      <Typography>
        {WEBSITE_NAME} {new Date().getFullYear()}
      </Typography>
    </CenterContent>
  </CustomFooter>
);

export default Footer;