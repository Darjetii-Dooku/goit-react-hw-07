import React from "react";
import { NavLink } from "react-router-dom";
import css from "../AppBar/AppBar.module.css";

const Navigation = () => {
  return (
    <div>
      <NavLink className={css.link} to="contacts">
        Contacts
      </NavLink>
    </div>
  );
};

export default Navigation;
