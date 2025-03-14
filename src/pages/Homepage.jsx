import React, { useContext, useState } from "react";
import "./Homepage.css";
import { useNavigate , useLocation } from 'react-router-dom';
import { CategoriesContext } from "./CategoriesContext";
import { DataContentContext } from "./DataContentContext";

const PopupModal = ({ isOpen, onClose, Title }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    return (
        <div className="popup-overlay">
            <div className="popupPlay">
                <div className="pop">
                    <button className="close-btn" onClick={onClose}>
                        <img src="src/img/Return.png" width="30" alt="Close" />
                    </button>
                    <img src="src/img/Logo.png" width="60" alt="Logo" />
                </div>
                <h2 className="titan-text" style={{ fontSize: "3rem" }}>Choose</h2>
                <h2 className="titan-text" style={{ fontSize: "1.5rem" }}>Picture</h2>
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=32&Title=${Title}`)}>32 pic.</button>
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=64&Title=${Title}`)}>64 pic.</button>
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=128&Title=${Title}`)}>128 pic.</button>
            </div>
        </div>
    );
};

const LoginModal = ({ isOpen, onClose }) => {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessages] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password) return;

        try {
            const response = await fetch("https://legendary-space-guide-566rr5wvx4rh4p4v-3001.app.github.dev/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                setMessages("Login successful!");
                setName("");
                setPassword("");
                onClose();
            } else {
                setMessages(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages("Error: Please try again later.");
        }
    };

    if (!isOpen) return null;
    return (
        <div className="popup-overlay">
            <div className="popupLogin">
                <button className="close-btn" onClick={onClose}>
                    <img src="src/img/Return.png" width="30" alt="Close" />
                </button>
                <img src="src/img/Logo.png" width="200" alt="Logo" />
                <h2 className="inter-text">Log in</h2>
                <h3 className="inter-small-text">Homie ranking</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" className="input-box" value={username} onChange={(e) => setName(e.target.value)} />
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-box password-input"
                            data-hide-edge-password
                        />
                        <img 
                            onClick={() => setShowPassword(!showPassword)} 
                            src={showPassword ? "src/img/ShowPic.png" : "src/img/HidePic.png"} 
                            alt={showPassword ? "Hide" : "Show"} 
                            width="30" 
                            height="30" 
                            className="toggle-password "
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

const SigninModal = ({ isOpen, onClose }) => {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessages] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password || !confirmPassword) return;

        if (password !== confirmPassword) {
            setMessages("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("https://legendary-space-guide-566rr5wvx4rh4p4v-3001.app.github.dev/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();
            setMessages(data.message);
            setName("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error:", error);
            setMessages("Error: Please try again later.");
        }
    };
    
    if (!isOpen) return null;
    return (
        <div className="popup-overlay">
            <div className="popupSignin">
                <button className="close-btn" onClick={onClose}>
                    <img src="src/img/Return.png" width="30" alt="Close" />
                </button>
                <img src="src/img/Logo.png" width="200" alt="Logo" />
                <h2 className="inter-text">Create Your Account</h2>
                <h3 className="inter-small-text">Set your password for Homie ranking</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" className="input-box" value={username} onChange={(e) => setName(e.target.value)} />
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-box password-input"
                            data-hide-edge-password
                        />
                        <img 
                            onClick={() => setShowPassword(!showPassword)} 
                            src={showPassword ? "src/img/ShowPic.png" : "src/img/HidePic.png"} 
                            alt={showPassword ? "Hide" : "Show"} 
                            width="30" 
                            height="30" 
                            className="toggle-password "
                        />
                    </div>
                    <div className="password-container">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-box password-input"
                            data-hide-edge-password
                        />
                        <img 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                            src={showConfirmPassword ? "src/img/ShowPic.png" : "src/img/HidePic.png"} 
                            alt={showConfirmPassword ? "Hide" : "Show"} 
                            width="30" 
                            height="30" 
                            className="toggle-password "
                        />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

const FollowButton = () => {
    const [isFollowed, setIsFollowed] = useState(false);
    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };
    return (
        <button 
            className={isFollowed ? "followed" : "follow"} 
            onClick={toggleFollow}
        >
            {isFollowed ? "FOLLOWED" : "FOLLOW"}
        </button>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const { categories } = useContext(CategoriesContext);
    const { datacontent } = useContext(DataContentContext);
    const [LogedIn, setLogedIn] = useState(false);

    const [popup, setPopup] = useState({ type: null, isOpen: false, Title: null });

    const openPopup = (type , Title) => setPopup({ type, isOpen: true, Title });
    const closePopup = () => setPopup({ type: null, isOpen: false });

    {/* Check Log in ด้วย Token */}
    {/* เดียวมาเพิ่ม */}

    {/* Content Template */} 
    const Content = ( datacontent ) => (
        <div>
            <div className="user-info">
                <div className="avatar"></div>
                <span style={{ fontWeight: "bold" }}>Name #5555</span>
                <FollowButton />
            </div>
        <h4 style={{ fontSize: "1.2rem" }}>
            <span>{datacontent.Title} </span>
            <a href={`?category=${datacontent.category}`}>[{datacontent.category}]</a> 
        </h4>
        <div>{datacontent.description}</div>
        {/* Connect with Back_End */} 
        <img src={datacontent.thumbnail} alt={datacontent.Title} className="image" />
        <button className="play" onClick={() => openPopup("Play", datacontent.Title)} style={{ cursor: "pointer" }}>PLAY</button>
        </div>
    );
       
    return (
        <div className="container">
            <header className="header">
                <div className="a">
                    <img src="src/img/Logo.png" width="100px" style={{ marginLeft: "200px" }} alt="Logo" />
                </div>
                { LogedIn ? 
                    <nav className="nav">
                        <span style={{ fontWeight: "bold", textDecoration: "underline"}}>TEMPLATE</span>
                        <button className="create" onClick={() => navigate("/upload")}>CREATE</button>
                    </nav>
                    : 
                    <nav className="nav">
                        <button className="login" onClick={() => openPopup("Login")}>LOGIN</button>
                        <button className="signin" onClick={() => openPopup("Signin")}>SIGN UP</button>
                    </nav>
                }
                { LogedIn && 
                    <nav className="nav">
                        <button className="profile" onClick={() => navigate("/profile")}>
                            <span className="avatar-circle">
                                <img src="src/img/Vs.png"  />
                            </span>
                            <span style={{ fontFamily: "Inter, sans-serif" ,fontSize: "14px" ,fontWeight: "bold", marginLeft: "10px", marginRight: "10px" }}>
                                ikunwe
                            </span>
                        </button>
                    </nav>
                }
            </header>
            <main className="main">
                <aside className="sidebar">
                    <div className="a">
                        <img src="src/img/Logo.png" width="150" />
                    </div>

                    <div className="category">
                        <h3 className="b">CATEGORY</h3>
                        <ul className="click" style={{ lineHeight: "3" }}>
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    {cat.icon} <a href={cat.name === "TRENDING" || cat.name === "LATEST" ? "?" : `?category=${cat.name}`}>{cat.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <section className="content">
                    {datacontent
                        .filter(item => !category || item.category.toUpperCase() === category.toUpperCase())
                        .map((item, index) => (
                            <div className="card" key={index}>
                                <Content {...item} />
                            </div>
                        )
                    )}
                </section>
            </main>
            {popup.type === "Play" && <PopupModal isOpen={popup.isOpen} onClose={closePopup} Title={popup.Title} />}
            {popup.type === "Login" && <LoginModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Signin" && <SigninModal isOpen={popup.isOpen} onClose={closePopup} />}
        </div>
    );
};

export default HomePage;