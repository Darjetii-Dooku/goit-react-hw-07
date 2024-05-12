import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/filterSlice";

export const selectContacts = (state) => state.contacts.items;
export const selectContactsIsLoading = (state) => state.contacts.loading;
export const selectContactsIsError = (state) => state.contacts.error;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (users, filter) => {
    if (!filter) {
      return users;
    }
    return users.filter((user) => {
      return user.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
);
