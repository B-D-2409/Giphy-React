import { useContext } from "react";
import { AppContext } from "../../services/state/AppContext";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Verify from "./verify";

export default function Authenticated({ children }) {
    const { user } = useContext(AppContext);
    const location = useLocation();



    if (!user) {

        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!user.emailVerified) {
        return <Verify />;
    }

    return <>{children}</>;
}

Authenticated.propTypes = {
    children: PropTypes.any,
};
