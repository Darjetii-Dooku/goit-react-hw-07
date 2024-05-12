import css from "../../App.module.css";
import AppBar from "../AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <main className={css.page}>{children}</main>
    </div>
  );
};

export default Layout;
