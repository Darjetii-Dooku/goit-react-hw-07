import React from "react";
import { NavLink } from "react-router-dom";
import { selectIsSignedIn, selectUserData } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";

const AppBar = () => {
  const isSignedIn = useSelector(selectIsSignedIn);

  return (
    <header>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      {isSignedIn ? (
        <>
          <Navigation />
          <UserMenu />
        </>
      ) : (
        <>
          <AuthNav />
        </>
      )}
    </header>
  );
};

export default AppBar;
