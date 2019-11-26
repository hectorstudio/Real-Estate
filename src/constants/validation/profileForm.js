import * as yup from 'yup';

import { phoneNumber } from './helpers';

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: phoneNumber,
});
