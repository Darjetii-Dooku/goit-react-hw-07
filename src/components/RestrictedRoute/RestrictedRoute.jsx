import { Navigate } from "react-router-dom"
import { selectIsSignedIn } from "../../redux/auth/selectors"
import { useSelector } from "react-redux";


const RestrictedRoute = ({ children }) => {
    const isSigned = useSelector(selectIsSignedIn)
  return isSigned ? <Navigate to='/contacts' replace /> : children;
}

export default RestrictedRoute