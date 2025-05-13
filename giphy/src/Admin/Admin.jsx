import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../services/state/AppContext";
import { getAllUsers, deleteUser, blockUser, unblockUser } from "../services/admin.service.js";
import "./Admin.css";
export const Admin = () => {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");

    useEffect(() => {
        if (!userData || !userData.isAdmin) {
            navigate("/login");
        }
    }, [userData, navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                setUsers(Object.entries(allUsers));
            } catch (err) {
                console.error('Error with fetching all users', err);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (uid) => {
        try {
            await deleteUser(uid);
            setUsers(users.filter(user => user[0] !== uid));
        } catch (err) {
            console.error('Error deleting user', err);
        }
    }


    const handleBlock = async (uid) => {
        try {
            await blockUser(uid);
            setUsers((prev) => prev.map(([id, user]) => id === uid ? [id, { ...user, isBlocked: true }] : [id, user]));
        } catch (err) {
            console.error('Error blocking user', err);
        }
    }

    const handleUnblock = async (uid) => {

        try {
            await unblockUser(uid);
            setUsers((prev) => prev.map(([id, user]) => id === uid ? [id, { ...user, isBlocked: false }] : [id, user]));
        } catch (err) {
            console.error('Error unblocking user', err);
        }
    }

    const filteredUsers = users.filter(([id, user]) => {
        return user.firstName?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchUser.toLowerCase())
    })

    if (!userData || !userData.isAdmin) {
        return null;
    }

    return (
        <div className="admin-wrapper">
            <h1 className="admin-title">Administration Hub</h1>
            <p>Welcome {userData.adminDetails?.firstName} {userData.adminDetails?.lastName}</p>

            <h3>All Users</h3>
            <input
                type="text"
                placeholder="Search users by name/email/username"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
            />

            <ul>
                {filteredUsers.map(([uid, user]) => (
                    <li key={uid}>
                        <span>{user.displayName} ({user.email})</span>
                        <div className="admin-buttons">
                            {user.isBlocked ? (
                                <button onClick={() => handleUnblock(uid)}>Unblock</button>
                            ) : (
                                <button onClick={() => handleBlock(uid)}>Block</button>
                            )}
                            <button onClick={() => handleDelete(uid)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )


}