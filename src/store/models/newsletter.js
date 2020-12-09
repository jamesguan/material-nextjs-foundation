import { SubmissionError } from 'redux-form';

import { newsletterSignup } from '../../apis/newsletter';

import { createSliceSelector } from '../common/selectors';

export const newsletterDetails = createSliceSelector('newsletter');

const newsletter = {
  state: {
    alertType: 'error',
  },
  reducers: {
    setAlertType(state, alertType) {
      return {
        ...state,
        alertType,
      };
    },
  },
  effects: dispatch => ({
    async handleNewsletterSubmit(payload, rootState) {
      const { email } = payload;
      try {
        await newsletterSignup(email);
      } catch (error) {
        let message;
        // We want redux-form to catch the error to know the request failed.
        switch(error.response.status) {
        case 409:
          message = 'Looks like you already signed up for the newsletter.';
          dispatch.newsletter.setAlertType('info', rootState);
          break;
        default:
          message = 'Unable to sign up for newsletter. Please try again later.';
          dispatch.newsletter.setAlertType('error', rootState);
        }
        throw new SubmissionError({_error: message}); 
      }
      console.log('Request finished');
    },
  }),
};

export default newsletter;
