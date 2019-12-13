import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email('This is not a valid email address').required('This field is required'),
  role: yup.string().required('This field is required'),
});
