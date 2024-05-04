import React from "react";
import { nanoid } from "nanoid";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const onDeleteUser = (id) => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const filtredUsers = useSelector(selectFilteredContacts);
  return (
    <ul>
      {filtredUsers.map((contact) => {
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
