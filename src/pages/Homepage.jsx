import React, { useState } from "react";
import "./Homepage.css";
import { useNavigate } from 'react-router-dom';

const PopupModal = ({ isOpen, onClose }) => {
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
                <button className="option-btn" onClick={() => navigate("/gamepage?round=32")}>32 pic.</button>
                <button className="option-btn" onClick={() => navigate("/gamepage?round=64")}>64 pic.</button>
                <button className="option-btn" onClick={() => navigate("/gamepage?round=128")}>128 pic.</button>
            </div>
        </div>
    );
};

const LoginModal = ({ isOpen, onClose }) => {
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
                <input type="text" placeholder="Username" className="input-box" />
                <input type="password" placeholder="Password" className="input-box" />
                <button className="login-btn">Login</button>
            </div>
        </div>
    );
};

const SigninModal = ({ isOpen, onClose }) => {
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
                <input type="text" placeholder="Username" className="input-box" />
                <input type="password" placeholder="Password" className="input-box" />
                <input type="password" placeholder="Confirm Password" className="input-box" />
                <button className="signup-btn">Sign Up</button>
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
    const [popup, setPopup] = useState({ type: null, isOpen: false });
    
    const openPopup = (type) => setPopup({ type, isOpen: true });
    const closePopup = () => setPopup({ type: null, isOpen: false });
    
    const Content = ({ Title, image, alt, category }) => (
        <div>
            <div className="user-info">
                <div className="avatar"></div>
                <span style={{ fontWeight: "bold" }}>Name #5555</span>
                <FollowButton />
            </div>
        <h4>
            <span>{Title}</span>
            <span> </span>
            <a href={`#${category}`}>[{category}]</a> 
        </h4>
        {/* Connect with Back_End */} 
        <img src={image} alt={alt} className="image" />
        <button className="play" onClick={() => openPopup("Play")} style={{ cursor: "pointer" }}>PLAY</button>
        </div>
    );
    
    
    return (
        <div className="container">
            <header className="header">
                <div className="a">
                    <img src="src/img/Logo.png" width="100px" style={{ marginLeft: "200px" }} alt="Logo" />
                </div>
                <nav className="nav">
                    <span style={{ fontWeight: "bold", textDecoration: "underline"}}>TEMPLATE</span>
                    <button className="create" onClick={() => navigate("/upload")}>CREATE</button>
                    <button className="login" onClick={() => openPopup("Login")}>LOGIN</button>
                    <button className="signin" onClick={() => openPopup("Signin")}>SIGN UP</button>
                </nav>
            </header>
            <main className="main">
                <aside className="sidebar">
			<div className="a">
				<img src="src/img/Logo.png" width="150" />
			</div>

                    <div className="category">
                        <h3 className="b">CATEGORY</h3>
                        <ul className="click" style={{ lineHeight: "3" }}>

                            <li>⭐ <a href="#TRENDING">TRENDING</a></li>
                            <li>⏳ <a href="#LATEST">LATEST</a></li>
                            <li>🎮 <a href="#GAMES">GAMES</a></li>
                            <li>🎧 <a href="#SONGS">SONGS</a></li>
                            <li>🍔 <a href="#FOODS">FOODS</a></li>
                            <li>⚽ <a href="#SPORTS">SPORTS</a></li>
                        </ul>
                    </div>
                </aside>

                <section className="content">
                    {[...Array(6)].map((_, index) => (
                        <div className="card" key={index}>
                            {index === 0 ? (
                                <Content 
                                    Title="The Best GPU of All time"
                                    image="https://lh3.googleusercontent.com/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv"
                                    alt="The Best GPU"
                                    category="GAMES"
                                /> 
                            ) : index === 1  ? (
                                <Content 
                                    Title="The Best FastFood in the World"
                                    image="https://247news.com.pk/wp-content/uploads/2024/11/Best-Fast-Food-Suggestions-for-Visitors-in-Islamabad.webp"
                                    alt="The Best GPU"
                                    category="FOODS"
                                /> 
                            ) : <Content 
                                Title="Name of Title"
                                image="https://lh3.googleusercontent.com/d/1Y-laWcMHPs2iDOwS28ubWUTITePA-hYJ"
                                alt="Example"
                                category="CATEGORY"
                                /> 
                            }
                        </div>
                    ))}
                </section>
            </main>
            {popup.type === "Play" && <PopupModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Login" && <LoginModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Signin" && <SigninModal isOpen={popup.isOpen} onClose={closePopup} />}
        </div>
    );
};

export default HomePage;
