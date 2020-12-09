import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import LazyImage from './LazyImage';
import CenterContent from '../containers/CenterContent';

const AppBar = dynamic(() => import('@material-ui/core/AppBar'));


const CustomAppBar = styled(AppBar)`
  &&& {
    background-color: #000000;
    color: #FFF;
  }
`;

const StyledImage = styled(LazyImage)`
  &&& {
    margin-top: 24px;
  }
`;

const Navbar = () => (
  <CustomAppBar position="static">
    <Toolbar>
      <Grid  alignItems="center" container justify="center">
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <CenterContent>
            <StyledImage src="/static/images/neotaglogo_text.svg" alt="NeoTag" />
          </CenterContent>
        </Grid>
      </Grid>
    </Toolbar>
  </CustomAppBar>
);

export default Navbar;