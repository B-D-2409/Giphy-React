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
    });
    const { setAppState } = useContext(AppContext);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();  
        if (!user.email || !user.password || !user.handle) {
            return alert('Please enter valid credentials');
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

                return createUserHandle(user.handle, firebaseUser.uid, user.email)
                    .then(() => {
                        setAppState({
                            user: firebaseUser,
                            userData: null
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
                <div>
                    <label htmlFor="handle">Handle:</label>
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
                <div className="register">
                    <button type="submit">Register</button> 
                </div>
            </form>
        </div>
    );
}
