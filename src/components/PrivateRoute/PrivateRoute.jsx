import { Navigate } from "react-router-dom"
import { selectIsSignedIn } from "../../redux/auth/selectors"
import { useSelector } from "react-redux";


const PrivateRoute = ({ children }) => {
    const isSigned = useSelector(selectIsSignedIn)
  return isSigned ? children : <Navigate to='/login' replace /> ;
}

export default PrivateRoute