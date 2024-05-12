import { NavLink, Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import { useDispatch } from "react-redux";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { apiRefreshUser } from "./redux/auth/authOps";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiRefreshUser());
  });
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route
            path="register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route path="contacts" element={
          <PrivateRoute>
          <ContactsPage />
          </PrivateRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
