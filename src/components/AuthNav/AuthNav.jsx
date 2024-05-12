import React from "react";
import { NavLink } from "react-router-dom";
import css from "../AppBar/AppBar.module.css";

const AuthNav = () => {
  return (
    <div className={css.authNav}>
      <NavLink className={css.link} to="register">
        Register
      </NavLink>
      <NavLink className={css.link} to="login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
