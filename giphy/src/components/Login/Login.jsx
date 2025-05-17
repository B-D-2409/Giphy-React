import { useContext, useState } from "react";
import { AppContext } from "../../services/state/AppContext";
import { loginUser } from "../../services/auth.service";
import { useNavigate, useLocation } from "react-router-dom"; 
import styles from './Login.module.css';
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { setAppState } = useContext(AppContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const login = (e) => {
        e.preventDefault();  

        if (!user.email || !user.password) {
            return alert("Please enter both email and password");
        }

        loginUser(user.email, user.password)
            .then((credentials) => {
                console.log(credentials);

                setAppState({
                    user: credentials.user,
                    userData: null,
                });

                navigate(location.state?.from?.pathname ?? '/');
            })
            .catch((error) => {
                console.log(error);
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
        <div className={styles['login-container']}>
            <h1 className={styles['login-title']}>Login</h1>

            <form onSubmit={login} className={styles['login-form']}>
                <div className={styles['form-group']}>
                    <label htmlFor="email">Email</label>
                    <input
                        value={user.email}
                        onChange={updateUser('email')}
                        type="email"
                        name="email"
                        id="email"
                        className={styles['login-input']}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password">Password</label>
                    <input
                        value={user.password}
                        onChange={updateUser('password')}
                        type="password"
                        name="password"
                        id="password"
                        className={styles['login-input']}
                    />
                </div>
                <div className={styles['login-submit']}>
                    <button type="submit" className={styles['login-button']}>Login</button>
                </div>
            </form>
        </div>
    );
}
