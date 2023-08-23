import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Github from "../../assets/github.png";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(
                "https://booknow-com.onrender.com/api/auth/login",
                credentials
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            navigate("/login");
        }
    };

    return (
        <div className="login">
            <header className="login-header">
                <p>Booknow.com</p>
            </header>

            
                

            <h1 className="loginTitle">Choose a Login Method</h1>
            <div className="wrap">
                <div className="left">
                    <div className="loginButton google">
                        <img src={Google} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginButton facebook">
                        <img src={Facebook} alt="" className="icon" />
                        Facebook
                    </div>
                    <div className="loginButton github">
                        <img src={Github} alt="" className="icon" />
                        Github
                    </div>
                </div>

                <div className="center">
                    <div className="line" />
                    <div className="or">OR</div>
                </div>

                <div className="right">
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                    />
                    <button className="submit" onClick={handleClick}>
                        Login
                    </button>
                    {error && <span>{error.message}</span>}
                    <span className={`${loading ? "loader" : ""}`}></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
