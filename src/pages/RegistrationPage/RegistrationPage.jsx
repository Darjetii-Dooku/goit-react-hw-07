import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  MAX_CHAR_LENGTH,
  MIN_CHAR_LENGTH,
  MIN_CHAR_PASSWORD,
} from "../../components/utility/constants";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { apiRegister } from "../../redux/auth/authSlice";

const RegisterUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(MIN_CHAR_LENGTH, "Enter more than 1 characters")
    .max(MAX_CHAR_LENGTH, "Enter less than 30 characters"),
  email: Yup.string()
    .email("You must enter valid email")
    .required("Email address is required")
    .min(MIN_CHAR_LENGTH, "Enter more than 1 characters")
    .max(MAX_CHAR_LENGTH, "Enter less than 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .max(MAX_CHAR_LENGTH, "Enter less than 30 characters")
    .min(MIN_CHAR_PASSWORD, "Enter more than 7 characters"),
});
const FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};
const RegistrationPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    // onAddUser(values);
    dispatch(apiRegister(values));
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={RegisterUserSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h2>Register user</h2>
          <label>
            <span>Name</span>
            <br />
            <Field
              type="text"
              name="name"
              id={nanoid()}
              placeholder="Darth Vader"
            />
            <ErrorMessage component="p" name="name" />
          </label>
          <br />
          <label>
            <span>Email</span>
            <br />
            <Field
              type="email"
              name="email"
              id={nanoid()}
              placeholder="dark_lord@sith.com"
            />
            <ErrorMessage component="p" name="email" />
          </label>
          <br />
          <label>
            <span>Password</span>
            <br />
            <Field
              type="password"
              name="password"
              id={nanoid()}
              placeholder="Enter your password"
            />
            <ErrorMessage component="p" name="password" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
