import * as yup from 'yup';


// Phone number
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneNumber = yup.string().matches(phoneRegExp, 'Phone number is not valid');
