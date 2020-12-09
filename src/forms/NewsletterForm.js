import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import styled from 'styled-components';

import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Alert from '@material-ui/lab/Alert';

import CenterContent from "../components/containers/CenterContent";
import Email from "../components/elements/fields/Email";

// Selector
import { newsletterDetails } from '../store/models/newsletter';

const StyledAlert = styled(Alert)`
  &&& {
    margin: 8px 0;
  }
`;

const NewsletterForm = ({
  alertType,
  error,
  handleSubmit,
  submitting,
  submitSucceeded,
}) => (
  <>
    {!submitSucceeded ? (
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          spacing={2}
        >
          <Grid item xs={7} sm={6} md={4} lg={3}>
            <Fade in timeout={1000}>
              <Email />
            </Fade>
          </Grid>
          <Grid item xs={4} sm={3} md={1}>
            <Fade in timeout={1000}>
              <Button
                color="primary"
                disabled={submitting}
                onClick={handleSubmit}
                type="submit"
                variant="outlined"
              >
                Get Updates
              </Button>
            </Fade>
          </Grid>
          {error && (
            <Grid container
              alignItems="center"
              justify="center"
              direction="row"
              spacing={2}
            >
              <Grid item xs={11} sm={9} md={5} lg={4}>
                <StyledAlert variant="outlined" severity={alertType}>
                  {error}
                </StyledAlert>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    ) : (
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="row"
        spacing={2}
      >
        <Grid item xs={7} sm={6} md={4}>
          <CenterContent>
            <Typography>You have signed up for some awesome news!</Typography>
          </CenterContent>
        </Grid>
      </Grid>
    )}
  </>
);

NewsletterForm.propTypes = {
  alertType: PropTypes.string,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

NewsletterForm.defaultProps = {
  alertType: 'error',
  error: undefined,
  submitting: false,
  submitSucceeded: false,
};

const mapStateToProps = state => ({
  alertType: newsletterDetails(state, 'alertType'),
});

export default reduxForm({
  form: "newsletter",
  onSubmit: (values, dispatch) => dispatch.newsletter.handleNewsletterSubmit(values),
})(connect(mapStateToProps, null)(NewsletterForm));
