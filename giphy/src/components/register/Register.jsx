import { useState, useContext } from "react";
import { AppContext } from "../../services/state/AppContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service.js";
import { createUserHandle, getUserByHandle } from '/src/services/users.service.js';

export default function Register() {
    const [user, setUser] = useState({
        handle: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const { setAppState } = useContext(AppContext);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if (!user.email || !user.password || !user.firstName || !user.lastName) {
            return alert('Please enter valid email, password, handle, first name, and last name!');
        }

        getUserByHandle(user.handle)
            .then((userData) => {
                if (userData) {
                    throw new Error('Handle already exists!');
                }
                return registerUser(user.email, user.password);
            })
            .then((credentials) => {
                const { user: firebaseUser } = credentials;

                return createUserHandle(user.handle, firebaseUser.uid, user.email, user.firstName, user.lastName)
                    .then(() => {
                        setAppState({
                            uid: firebaseUser.uid,
                            user: firebaseUser,
                            userData: {
                                handle: user.handle,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                            }
                        });

                        navigate('/');
                    });
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    const updateUser = (prop) => (e) => {
        setUser({
            ...user,
            [prop]: e.target.value,
        });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>

            <form onSubmit={register}>
                <div className="name-fields">
                <div>
                    <label htmlFor="name">First Name:</label>
                    <input
                        value={user.firstName}
                        onChange={updateUser('firstName')}
                        type='text'
                        id='firstName'
                        name='firstName'
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        value={user.lastName}
                        onChange={updateUser('lastName')}
                        type='text'
                        id='lastName'
                        name='lastName'
                    />
                </div>
                </div>
                <div>
                    <label htmlFor="handle">Username:</label>
                    <input
                        value={user.handle}
                        onChange={updateUser('handle')}
                        type='text'
                        id='handle'
                        name='handle'
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        value={user.email}
                        onChange={updateUser('email')}
                        type='email'
                        id='email'
                        name='email'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        value={user.password}
                        onChange={updateUser('password')}
                        type='password'
                        id='password'
                        name='password'
                    />
                </div>
                <div className="register-submit">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}
