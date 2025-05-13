import { useState } from "react";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`more-options-wrapper ${isOpen ? "open" : ""}`}>
            <button onClick={toggleMenu} className="more-options-button">
                ⋮
            </button>

            {isOpen && (
                <div className="more-options-dropdown">
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <a href="/help">Help</a>
                </div>
            )}
        </div>
    );
}
