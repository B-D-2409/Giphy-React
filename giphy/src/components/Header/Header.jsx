import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../services/state/AppContext";
import { logoutUser } from "../../services/auth.service";
import Menu from "../../views/Menu/Menu";
import Profile from "../../views/Profile/Profile";
import Settings from "../../views/Settings/Settings";
import style from './Header.module.css';
import SideBar from "../../views/SideBar/SideBar";

export default function Header() {
    const { user, userData, setAppState } = useContext(AppContext);
   

    return (
        <header>
            <div className="nav-wrapper">
                <div className="logo-container">
                    <img
                        src="https://cdn.freelogovectors.net/wp-content/uploads/2021/01/giphy_logo_icon-freelogovectors.net_.png"
                        alt="Giphy Logo"
                    />
                    <NavLink to="/">Giphy</NavLink>
                </div>
                <nav>
                    <NavLink
                        to="/Reactions"
                        className={({ isActive }) => (isActive ? style.active : style['reactions-head'])}
                    >
                        Reactions
                    </NavLink>
                    <NavLink
                        to="/Entertainment"
                        className={({ isActive }) => (isActive ? style.active : style['entertainment-head'])}
                    >
                        Entertainment
                    </NavLink>
                    <NavLink
                        to="/Sports"
                        className={({ isActive }) => (isActive ? style.active : style['sports-head'])}
                    >
                        Sports
                    </NavLink>
                    <NavLink
                        to="/Stickers"
                        className={({ isActive }) => (isActive ? style.active : style['stickers-head'])}
                    >
                        Stickers
                    </NavLink>
                    <NavLink
                        to="/Artists"
                        className={({ isActive }) => (isActive ? style.active : style['artists-head'])}
                    >
                        Artists
                    </NavLink>

                    <div className={style["more-options-wrapper"]}>
                        <Menu>
                            <Profile />
                            <Settings />
                        </Menu>
                    </div>

                    <NavLink
                        to="/upload"
                        className={({ isActive }) => (isActive ? style.active : style.upload)}
                    >
                        Upload
                    </NavLink>
                    <NavLink
                        to="/create"
                        className={({ isActive }) => (isActive ? style.active : style.create)}
                    >
                        Create
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) => (isActive ? style.active : style.favorites)}
                    >
                        Favorites
                    </NavLink>

            

                    <div className={style['auth-buttons']}>
                        {!user && <NavLink to="/register" className={style['nav-register']}>Register</NavLink>}
                        {!user && <NavLink to="/login" className={style['nav-login']}>Login</NavLink>}
                    </div>
                    {user && userData?.isAdmin && (
                        <NavLink to="/admin" className="admin-link">Admin</NavLink>
                    )}
                    
                </nav>
                </div>

                {user &&  <SideBar />}
        
        </header>
    );
}
