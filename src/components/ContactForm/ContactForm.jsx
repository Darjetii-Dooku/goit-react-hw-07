import { Formik, Field, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { MAX_CHAR_LENGTH, MIN_CHAR_LENGTH } from "../utility/constants";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/contactsOps";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("this field is required")
    .min(MIN_CHAR_LENGTH, "enter more than 3 characters")
    .max(50, "enter less than 50 characters"),
  number: Yup.string()
    .required("this field is required")
    .max(MAX_CHAR_LENGTH, "enter more than 3 characters")
    .max(50, "enter less than 50 characters"),
});
const FORM_INITIAL_VALUES = {
  name: "",
  number: "",
};
const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    onAddUser(values);
  };
  const onAddUser = (formData) => {
    const newUser = {
      ...formData,
    };
    const action = addContact(newUser);
    dispatch(action);
  };
  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="name">
          <span>Name</span>
          <br />
          <Field type="text" name="name" id={nanoid()} />
          <ErrorMessage component="p" name="name" />
        </label>
        <br />
        <label htmlFor="number">
          <span>Number</span>
          <br />
          <Field type="text" name="number" id={nanoid()} />
          <ErrorMessage component="p" name="number" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
