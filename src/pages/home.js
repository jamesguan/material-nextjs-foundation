import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

const LazyImage = dynamic(() => import('../components/elements/LazyImage'));
const LazyVideo = dynamic(() => import('../components/elements/LazyVideo'));
const Newsletter = dynamic(() => import('../forms/NewsletterForm'));

const LandingVideo = styled(LazyVideo)`
  &&& {
    width: 100%;
  }
`;

const Home = () => (
  <Grid container alignItems="center" justify="center" space={2}>
    <Grid item xs={12}>
      <Newsletter />
    </Grid>
    <Grid container alignItems="center" justify="center" space={2}>
      <Grid item xs={11} sm={9} md={5} lg={4}>
        <LazyImage
          alt="some-image"
          src="/static/images/logo512.png"
        />
      </Grid>
    </Grid>
    <Grid container alignItems="center" justify="center" space={2}>
      <Grid item xs={11} sm={9} md={5} lg={4}>
        <LandingVideo
          autoPlay
          controls
          loop
          muted
          playsInline
          alt="some-video"
          poster="/static/images/logo512.png>"
          src="/static/video/<your_video.mp4>"
        />
      </Grid>
    </Grid>
  </Grid>
);

export default Home;