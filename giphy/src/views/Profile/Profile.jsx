import { useState, useContext } from "react";
import { getProfileData, getUserData } from "../../services/users.service";
import { AppContext } from "../../services/state/AppContext";
import './Profile.css'


export default function Profile() {

    const [userProfile, setUserProfile] = useState(false);
    const { user, userData } = useContext(AppContext);

    const [form, setForm] = useState({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || user?.email || "",
    });


    if (!user) return <div>Please log in to view your profile.</div>

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        await getProfileData(user.uid, form.firstName, form.lastName);
        const updatedData = await getUserData(user.uid);
        const userData = updatedData
            ? updatedData[Object.keys(updatedData)[0]]
            : null;
        setForm((prev) => ({
            ...prev,
            userData: userData,
        }));
        setUserProfile(false);
    };

    return (
        <div className={`profile-container ${userProfile ? "edit-mode" : ""}`}>
            <h1>Profile</h1>
    
            {!userProfile ? (
                <div className="profile-info">
                    <h2>{userData?.firstName} {userData?.lastName}</h2>
                    <p>Email: {userData?.email}</p>
                    <button onClick={() => setUserProfile(true)}>Edit Profile</button>
                </div>
            ) : (
                <div className="profile-edit">
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <div className="profile-edit-buttons">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setUserProfile(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
    
}