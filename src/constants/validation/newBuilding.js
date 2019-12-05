import * as yup from 'yup';

export default yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  company: yup.string().required(),
  country: yup.string().required(),
  name: yup.string().required(),
});
