import React, { useState } from "react";
import "./Homepage.css";
import { useNavigate , useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

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
            <a href={`?category=${category}`}>[{category}]</a> 
        </h4>
        {/* Connect with Back_End */} 
        <img src={image} alt={alt} className="image" />
        <button className="play" onClick={() => openPopup("Play")} style={{ cursor: "pointer" }}>PLAY</button>
        </div>
    );

    const contentData = [
        { 
          Title: "The Best GPU of All time", 
          image: "https://lh3.googleusercontent.com/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv", 
          alt: "The Best GPU", 
          category: "GAMES" 
        },
        { 
          Title: "The Best FastFood in the World", 
          image: "https://247news.com.pk/wp-content/uploads/2024/11/Best-Fast-Food-Suggestions-for-Visitors-in-Islamabad.webp", 
          alt: "The Best FastFood", 
          category: "FOODS" 
        },
        { 
          Title: "The Best THAI Songs", 
          image: "https://res.klook.com/image/upload/v1729240216/thsosfuiyuagpqkldx5y.jpg", 
          alt: "Thai song", 
          category: "SONGS" 
        },
        { 
          Title: "Messi or Ronaldo?", 
          image: "https://lahstalon.org/wp-content/uploads/2024/05/Real-Ronaldo-V-Messi-2.png", 
          alt: "Messi is better", 
          category: "SPORTS" 
        },
        { 
          Title: "Example Title", 
          image: "https://lh3.googleusercontent.com/d/1Y-laWcMHPs2iDOwS28ubWUTITePA-hYJ", 
          alt: "Example", 
          category: "CATEGORY" 
        }
      ];
    
    
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
                            <li>⭐ <a href="?">TRENDING</a></li>
                            <li>⏳ <a href="?">LATEST</a></li>
                            <li>🎮 <a href="?category=GAMES">GAMES</a></li>
                            <li>🎧 <a href="?category=SONGS">SONGS</a></li>
                            <li>🍔 <a href="?category=FOODS">FOODS</a></li>
                            <li>⚽ <a href="?category=SPORTS">SPORTS</a></li>
                            <li>🎬 <a href="?category=MOVIES">MOVIES</a></li>
                        </ul>
                    </div>
                </aside>

                <section className="content">
                    {contentData
                        .filter(item => !category || item.category.toUpperCase() === category.toUpperCase())
                        .map((item, index) => (
                            <div className="card" key={index}>
                                <Content {...item} />
                            </div>
                        )
                    )}
                </section>
            </main>
            {popup.type === "Play" && <PopupModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Login" && <LoginModal isOpen={popup.isOpen} onClose={closePopup} />}
            {popup.type === "Signin" && <SigninModal isOpen={popup.isOpen} onClose={closePopup} />}
        </div>
    );
};

export default HomePage;
