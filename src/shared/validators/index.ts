import { Yup } from '../lib/yup';

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const contactsFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required().min(4),
});

export { loginFormSchema, contactsFormSchema };
