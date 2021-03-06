import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email('This is not a valid email address').required('This field is required'),
  password: yup.string().required('This field is required'),
});
