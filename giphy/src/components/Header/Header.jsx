import { NavLink } from "react-router-dom";

export default function Header() {
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
                        <NavLink to='/upload' className='upload'>Upload</NavLink>
                        <NavLink to='/create' className='create'>Create</NavLink>
                    </nav>
                </div>
            </header>
]
        </>
    );
}
