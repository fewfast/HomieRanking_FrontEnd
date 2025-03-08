import React from "react";
import "./HomePage.css";
import { useState } from "react";

const PopupModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>✖</button>
                <img src="https://lh3.google.com/u/1/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv=w1912-h920-iv1" alt="Popup" />
                <h2>Choose Picture</h2>
                <button className="option-btn">32 pic.</button>
                <button className="option-btn">64 pic.</button>
                <button className="option-btn">128 pic.</button>
            </div>
        </div>
    );
};

const HomePage = () => {
    
    const [isPopupOpen, setPopupOpen] = useState(false);
    
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
    return (
        <div className="container">
            <header className="header">
                <div className="logo">HOMIE RANKING</div>
                <nav className="nav">
                    <a href="#">TEMPLATE</a>
                    <button className="create">CREATE</button>
                    <button className="login">LOGIN</button>
                    <button className="signin">SIGN IN</button>
                </nav>
            </header>
            <main className="main">
                <aside className="sidebar">
                    <div className="sidebar-logo">HOMIE RANKING</div>
                    <div className="sort-by">
                        <h3>Sort by</h3>
                        <ul>
                            <a href="#">⭐ Trending</a><li></li>
                            <a href="#">⏳ Latest</a><li></li>
                            <a href="#">🎮 Games</a><li></li>
                        </ul>
                    </div>
                    <div className="category">
                        <h3>Category</h3>
                        <ul>
                            <a href="#">🎧 Songs</a><li></li>
                            <a href="#">🍔 Foods</a><li></li>
                            <a href="#">⚽ Sports</a><li></li>
                        </ul>
                    </div>
                </aside>
                <section className="content">
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <FollowButton />
                        </div>
                        <h4>The Best GPU of All Time [Games]</h4>
                        <img src="https://lh3.google.com/u/1/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv=w1912-h920-iv1" alt="Best GPUs of All Time" className="image" />            
                         <button className="play" onClick={() => setPopupOpen(true)}>PLAY</button>
                         {/* Pop-up Modal */}
                         <PopupModal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
                    </div>
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <FollowButton />
                        </div>
                        <h4>Name of Title [Name of Type]</h4>
                        <div className="placeholder"></div>
                        <button className="play" onClick={() => setPopupOpen(true)}>PLAY</button>
                         {/* Pop-up Modal */}
                         <PopupModal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
                    </div>
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <FollowButton />
                        </div>
                        <h4>The Best GPU of All Time [Games]</h4>
                        <img src="https://lh3.google.com/u/1/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv=w1912-h920-iv1" alt="Best GPUs of All Time" className="image" />            
                         <button className="play" onClick={() => setPopupOpen(true)}>PLAY</button>
                         {/* Pop-up Modal */}
                         <PopupModal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
