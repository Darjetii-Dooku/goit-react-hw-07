import React from "react"
import { nanoid } from 'nanoid'
import Contact from '../Contact/Contact'
import css from './ContactList.module.css'
import { useDispatch, useSelector } from "react-redux"
import { deleteContact } from "../../redux/contactsSlice"

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => {
        return state.contacts
    })
    const onDeleteUser = (id) => {
        const action = deleteContact(id)
       dispatch(action);
       }
    const selectNameFilter = useSelector((state) => {
        return state.filters
      })
    const filtredUsers = contacts.items.filter(user => user.name.toLowerCase().includes(selectNameFilter.name.toLowerCase()));
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
    )
}





export default ContactList