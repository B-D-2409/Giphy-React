import { useEffect, useState } from "react";
export default function Menu() {
const [hovered, setHovered] = useState(false);
const [showHelp, setShowHelp] = useState(false);

useEffect(() => {
    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        window.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("mouseleave", handleMouseLeave);
    };
},[]);


    

    return (
        <div className="more-options-dropdown">
            <a href="/profile">Profile</a>
            <a href="/settings">Settings</a>
            <a href="/help" >Help</a>
        </div>
    );
}

