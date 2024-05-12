import { ErrorMessage, Field, Form, Formik } from "formik";
import { MAX_CHAR_LENGTH, MIN_CHAR_LENGTH, MIN_CHAR_PASSWORD } from "../../components/utility/constants";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../redux/auth/operations";

const LoginUserSchema = Yup.object().shape({
    email: Yup.string()
    .email("You must enter valid email")
    .required("Email address is required")
    .min(MIN_CHAR_LENGTH, "Enter more than 1 characters")
    .max(MAX_CHAR_LENGTH, "Enter less than 30 characters"),
    password: Yup.string()
    .required("Password is required")
    .max(MAX_CHAR_LENGTH, "Enter less than 30 characters")
    .min(MIN_CHAR_PASSWORD, "Enter more than 7 characters")
});
const FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(apiLogin(values));
    actions.resetForm();
    // onAddUser(values);
  };
  return (
    <div>
      <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={LoginUserSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <h2>Login user</h2>
        <label>
          <span>Email</span>
          <br />
          <Field type="email" name="email" id={nanoid()} placeholder="dark_lord@sith.com" />
          <ErrorMessage component="p" name="email" />
        </label>
        <br />
        <label>
          <span>Password</span>
          <br />
          <Field type="password" name="password" id={nanoid()} placeholder="Enter your password" />
          <ErrorMessage component="p" name="password" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
    </div>
  );
};

export default LoginPage;