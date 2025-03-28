import React, { useContext, useState, useEffect } from "react";
import "./Homepage.css";
import { useNavigate , useLocation } from 'react-router-dom';
import { CategoriesContext } from "./CategoriesContext";
import { DataContentContext } from "./DataContentContext";
import { AuthContext } from "./AuthContext";
import { APIContext } from "./APIContext";

const PopupModal = ({ isOpen, onClose, id }) => {
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
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=10&id=${id}`)}>10 pic.</button>
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=15&id=${id}`)}>15 pic.</button>
                <button className="option-btn" onClick={() => navigate(`/gamepage?round=20&id=${id}`)}>20 pic.</button>
            </div>
        </div>
    );
};

const LoginModal = ({ isOpen, onClose }) => {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessages] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const { apiUrl } = useContext(APIContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) return;
    
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
            if (data.access_token) {
                // ส่งข้อมูล username ไปกับการล็อกอิน
                login(data.access_token, data.user);
                setMessages("Login successful!");
                setName("");
                setPassword("");
                onClose();
                window.location.reload();
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
    const { apiUrl } = useContext(APIContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password || !confirmPassword) return;

        if (password !== confirmPassword) {
            setMessages("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/signup`, {
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

const FollowButton = ({ datacontent }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { user, token, setUser } = useContext(AuthContext);
    const { apiUrl } = useContext(APIContext);
    
    useEffect(() => {
        if (user && user.following) {
            setIsFollowed(user.following.includes(datacontent.uploaded_by));
        }
    }, [user, datacontent.uploaded_by]);

    // ฟังก์ชันสำหรับการติดตาม
    const handleFollow = async (e) => {
        e.preventDefault();
        setIsFollowed(true);

        try {
            const response = await fetch(`${apiUrl}/follow/${datacontent.uploaded_by}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const updated = { 
                    ...user,
                    following: [...user.following, datacontent.uploaded_by] 
                };
                // เก็บข้อมูลใหม่ลงใน localStorage
                localStorage.setItem("user", JSON.stringify(updated));
                // อัพเดตข้อมูลใน AuthContext
                setUser(updated); 
            } else {
                alert("Failed to follow.");
            }
        } catch (error) {
            console.error("Error Following:", error);
        }
    };

    // ฟังก์ชันสำหรับการยกเลิกการติดตาม 
    const handleUnfollow = async (e) => {
        e.preventDefault();
        setIsFollowed(false);

        try {
            const response = await fetch(`${apiUrl}/unfollow/${datacontent.uploaded_by}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const updated = { 
                    ...user,
                    following: user.following.filter(id => id !== datacontent.uploaded_by)
                };
                localStorage.setItem("user", JSON.stringify(updated));
                setUser(updated); 
            } else {
                alert("Failed to unfollow.");
            }
        } catch (error) {
            console.error("Error Unfollowing:", error);
        }
    };

    return (
        <button 
            className={isFollowed ? "followed" : "follow"} 
            style={{ border: "none", cursor: "pointer", transition: 'all 0.3s ease' }}
            onClick={isFollowed ? handleUnfollow : handleFollow}
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
    const { isLoggedIn, logout, user } = useContext(AuthContext);

    const [popup, setPopup] = useState({ type: null, isOpen: false, id: null });

    const openPopup = (type , id) => setPopup({ type, isOpen: true, id });
    const closePopup = () => setPopup({ type: null, isOpen: false });

    {/* Content Template */} 
    const Content = ( datacontent ) => (
        <div style={{ fontFamily: "Jost" }}>
            <div className="user-info">
                <span className="avatar">
                    <img 
                        src={datacontent.uploader.profile}
                        alt={datacontent.uploader.username}
                        style={{ cursor: "pointer" }}
                        onClick={() => { 
                            if(user?.username === datacontent.uploader.username) { 
                                navigate(`/profile?id=${user?._id}&username=${user?.username}`),
                                window.scrollTo(0,0)   
                            } else {
                                const profileData = {
                                    profile: datacontent.uploader.profile,   // รูปโปรไฟล์ของ Userที่เรากด
                                    wallpaper: datacontent.uploader.wallpaper, // วอลล์เปเปอร์ของ User ที่เรากด
                                    following: datacontent.uploader.following
                                };

                                sessionStorage.setItem("profileData", JSON.stringify(profileData));
                                navigate(`/otherprofile?id=${datacontent?.uploader._id}&username=${datacontent.uploader.username}&description=${datacontent.uploader.description_profile}`),
                                window.scrollTo(0,0)
                            }                     
                        }}
                    />
                </span>
                <span style={{ fontFamily: "Jost", fontWeight: "bold" }}>{datacontent.uploader.username}</span>
                { user?.username !== datacontent.uploader.username &&
                    <FollowButton datacontent={datacontent}/>
                }
            </div>
            <h4 style={{ fontSize: "20px" }}>
                <span>{datacontent.title} </span>
                <a href={`?category=${datacontent.categories}`} style={{ fontFamily: "Jost", fontSize:"16px" }}>[{datacontent.categories}]</a> 
            </h4>
            <div>{datacontent.description}</div>
            <img src={datacontent.thumbnail} alt={datacontent.title} className="image" />
            <button className="play" onClick={() => openPopup("Play", datacontent._id)} style={{ cursor: "pointer" }}>PLAY</button>
        </div>
    );
       
    return (
        <div className="container">
            <header className="header">
                <div className="a">
                    <img src="src/img/Logo.png" 
                        width="100px" 
                        onClick={() => navigate("/")}
                        style={{ marginLeft: "200px", cursor: "pointer" }} 
                        alt="Logo"
                    />
                </div>
                {isLoggedIn ? 
                    <nav className="nav">
                        <span style={{ fontWeight: "bold", textDecoration: "underline"}}>TEMPLATE</span>
                        <button className="create" onClick={() => navigate("/upload")}>CREATE</button>
                        <button className="logout" onClick={logout}>LOGOUT</button>
                        <button className="profile" onClick={() => {
                            navigate(`/profile?id=${user?._id}&username=${user?.username}`),
                            window.scrollTo(0, 0);
                        }}>
                            <span className="avatar-circle">
                                <img 
                                    src={user?.profile} 
                                />
                            </span>
                            <span style={{ fontFamily: "Inter, sans-serif" ,fontSize: "14px" ,fontWeight: "bold", marginLeft: "10px", marginRight: "10px" }}>
                                {user?.username}
                            </span>
                        </button>
                    </nav>
                    : 
                    <nav className="nav">
                        <button className="login" onClick={() => openPopup("Login")}>LOGIN</button>
                        <button className="signin" onClick={() => openPopup("Signin")}>SIGN UP</button>
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
                        .filter(item => !category || item.categories.toUpperCase() === category.toUpperCase())
                        .map((item, index) => (
                            <div className="card" key={index}>
                                <Content {...item} />
                            </div>
                        )
                    )}
                </section>
            </main>
            {popup.type === "Play" && <PopupModal isOpen={popup.isOpen} onClose={closePopup} id={popup.id} />}
            {popup.type === "Login" && <LoginModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Signin" && <SigninModal isOpen={popup.isOpen} onClose={closePopup} />}
        </div>
    );
};

export default HomePage;