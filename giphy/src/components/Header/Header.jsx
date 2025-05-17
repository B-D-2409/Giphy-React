import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../services/state/AppContext";
import { logoutUser } from "../../services/auth.service";
import Menu from "../../views/Menu/Menu";
import Profile from "../../views/Profile/Profile";
import Settings from "../../views/Settings/Settings";
import style from './Header.module.css';
export default function Header() {
    const { user, userData, setAppState } = useContext(AppContext);
    const navigate = useNavigate();


    const logout = () => {
        logoutUser()
            .then(() => {
                setAppState({
                    user: null,
                    userData: null
                });
                navigate('/login');
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };



    return (
        <>
            <header>
                <div className="nav-wrapper">
                    <div className="logo-container">
                        <img
                            src="https://cdn.freelogovectors.net/wp-content/uploads/2021/01/giphy_logo_icon-freelogovectors.net_.png"
                            alt="Giphy Logo"
                        />
                        <a href="/">Giphy</a>
                    </div>
                    <nav>
                        <NavLink
                            to="/Reactions"
                            className={({ isActive }) => (isActive ? "active" : "reactions-head")}
                        >
                            Reactions
                        </NavLink>
                        <NavLink
                            to="/Entertainment"
                            className={({ isActive }) => (isActive ? "active" : "entertainment-head")}
                        >
                            Entertainment
                        </NavLink>
                        <NavLink
                            to="/Sports"
                            className={({ isActive }) => (isActive ? "active" : "sports-head")}
                        >
                            Sports
                        </NavLink>
                        <NavLink
                            to="/Stickers"
                            className={({ isActive }) => (isActive ? "active" : "stickers-head")}
                        >
                            Stickers
                        </NavLink>
                        <NavLink
                            to="/Artists"
                            className={({ isActive }) => (isActive ? "active" : "artists-head")}
                        >
                            Artists
                        </NavLink>
                        <div className="more-options-wrapper">
                            <Menu>
                                <Profile />
                                <Settings />
                            </Menu>
                        </div>

                        <NavLink
                            to='/upload'
                            className={({ isActive }) => (isActive ? "active" : "upload")}
                        >
                            Upload
                        </NavLink>
                        <NavLink
                            to='/create'
                            className={({ isActive }) => (isActive ? "active" : "create")}
                        >
                            Create
                        </NavLink>
                        <NavLink
                            to='/favorites'
                            className={({ isActive }) => (isActive ? "active" : "favorites")}
                        >
                            Favorites
                        </NavLink>
                        <div className={style['auth-buttons']}>
                            {!user && <NavLink to='/register' className={style['nav-register']}>Register</NavLink>}
                            {!user && <NavLink to='/login' className={style['nav-login']}>Login</NavLink>}
                        </div>

                        {userData?.isAdmin && (
                            <NavLink to="/admin" className="admin-link">Admin</NavLink>
                        )}

                    </nav>
                    {user && <button className="logout" onClick={logout}>Logout</button>}
                    {userData && <span className="welcome" ></span>}
                </div>
            </header>
        </>
    );
}
