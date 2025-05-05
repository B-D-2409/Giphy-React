import { useContext } from "react";
import { AppContext } from "../../services/state/AppContext";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from 'react'
export default function Authenticated({children}) {
    const {user} = useContext(AppContext);
    const location = useLocation();

    if(!user) {
        return <NavLink replace to='/login' state={{from: location}} />;
    }

    return (
        <div>
            {children}
        </div>
    )

}
Authenticated.propTypes = {
    children: PropTypes.any,
};
