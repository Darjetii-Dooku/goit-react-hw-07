import { useDispatch, useSelector } from "react-redux";
import css from "./ContactsPage.module.css";
import { Toaster } from "react-hot-toast";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import {apiGetContacts } from "../../redux/contacts/contactsOps";
import { useEffect } from "react";
import { selectContacts, selectContactsIsError, selectContactsIsLoading } from "../../redux/contacts/selectors";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
function App() {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const isError = useSelector(selectContactsIsError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);
  return (
    <div>
      <h1>Phonebook</h1>
      {isError && <ErrorMessage />}
      <ContactForm />
      <SearchBox />
      <ContactList />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;