import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../services/state/AppContext";
import { logoutUser } from "../../services/auth.service";

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
                        <NavLink to="/Reactions" className="reactions-head">Reactions</NavLink>
                        <NavLink to="/Entertainment" className="entertainment-head">Entertainment</NavLink>
                        <NavLink to="/Sports" className="sports-head">Sports</NavLink>
                        <NavLink to="/Stickers" className="stickers-head">Stickers</NavLink>
                        <NavLink to="/Artists" className="artists-head">Artists</NavLink>
                        <button className="more-options-button">⋮</button>
                        <div className="more-options-line"></div>
                        <NavLink to='/upload' className='upload'>Upload</NavLink>
                        <NavLink to='/create' className='create'>Create</NavLink>
                        <NavLink to='/favorites' className='favorites'>Favorites</NavLink>
                        <div className="auth-buttons">
                            {!user && <NavLink to='/register' className='register'>Register</NavLink>}
                            {!user && <NavLink to='/login' className='login'>Login</NavLink>}
                        </div>
                    </nav>
                    {user && <button className="logout" onClick={logout}>Logout</button>}
                    {userData && <span>Welcome, {userData.handle}</span>}
                </div>
            </header>
        </>
    );
}
