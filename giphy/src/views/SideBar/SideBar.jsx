import style from './SideBar.module.css';
import { useState, useContext } from 'react';
import { AppContext } from '../../services/state/AppContext';
import { NavLink } from 'react-router-dom';
import { logoutUser } from "../../services/auth.service";
export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const {user, userData} = useContext(AppContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
        <div className={style['side-bar-container']}>
            <button onClick={toggleMenu} className={style['menu-button']}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                    alt="User Avatar"
                    className={style.avatar}
                />
                <span className={style.username}>{userData.handle || 'Guest'}</span>
                <i className={`fa-solid fa-caret-down ${style.caret}`}></i>
            </button>

            {isOpen && (
                <nav className={style['side-bar-dropdown']}>
                    <NavLink
                        to="/collections"
                        className={({ isActive }) =>
                            `${style.collections} ${isActive ? style.active : ''}`
                        }
                    >
                        Collections
                    </NavLink>
                    {user && <button className={style.logout} onClick={logout}>Logout</button>}
                </nav>
            )}
        </div>
    );
}
