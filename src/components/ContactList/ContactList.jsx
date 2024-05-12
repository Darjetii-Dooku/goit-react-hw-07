import React from "react";
import { nanoid } from "nanoid";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectContactsIsLoading, selectFilteredContacts } from "../../redux/contacts/selectors";
import Loader from "../Loader/Loader";

const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const onDeleteUser = (id) => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const filtredUsers = useSelector(selectFilteredContacts);
  return (
    <ul>
      {isLoading && <Loader />}
      {Array.isArray(filtredUsers) && filtredUsers.length === 0 && <p>You don&apos;t have any added contacts</p>}
      {Array.isArray(filtredUsers) &&
        filtredUsers.map((contact) => {
          return (
            <li className={css.item} key={nanoid()}>
              <Contact
                name={contact.name}
                number={contact.number}
                id={contact.id}
                onDeleteUser={onDeleteUser}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ContactList;
