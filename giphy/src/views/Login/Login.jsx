import { useContext, useState } from "react"
import { AppContext } from "../../services/state/AppContext"
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom"
export default function Login() {
    const navigate = useNavigate();
    const { setAppState } = useContext(AppContext);
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
    })

    const login = () => {
        if(!user || !user.password) {
            return alert("Please enter an email and password")
        }

        loginUser(user.email, user.password)
        .then((credentials) => {
            console.log(credentials);
            
            setAppState({
                user: credentials.user,
                userData: null,
            })

            navigate(location.state?.from.pathname ?? '/');
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
}

    return (
        <div>
            <h1>Login</h1>
            <label htmlFor="email">Email </label>
            <input
            value={user.email}
            onChange={updateUser('email')}
            type='text'
            name='email'
            id='email'
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
            value={user.password}
            onChange={updateUser('password')}
            type='password'
            name='password'
            id='password'
            />
            <br />
            <button onClick={login}>Login</button>
        </div>
    )
}