import { useContext, useState } from "react";
import { AppContext } from "../../services/state/AppContext";
import { loginUser } from "../../services/auth.service";
import { useNavigate, useLocation } from "react-router-dom"; 

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
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={login}>
                <div>
                    <label htmlFor="email">Email </label>
                    <input
                        value={user.email}
                        onChange={updateUser('email')}
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input
                        value={user.password}
                        onChange={updateUser('password')}
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <div>
                    <div className="login-submit">
                    <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
