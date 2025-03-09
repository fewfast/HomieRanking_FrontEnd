import React, { useState } from "react";
import "./HomePage.css";

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

const FollowButton = () => {
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <button 
            className={isFollowed ? "followed" : "follow"} 
            onClick={() => setIsFollowed(!isFollowed)}
        >
            {isFollowed ? "FOLLOWED" : "FOLLOW"}
        </button>
    );
};

const HomePage = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <div className="container">
            <header className="header">

                <div className="logo">
                    <img src="https://lh3.google.com/u/1/d/16EK2E7W3rcM56t5DTBVnTh0TvXgTY8S-=w1669-h919-iv1?auditContext=forDisplay/logo.png" alt ="HOMIE RANKING" width="150" height="auto"/>
                
                </div>
                <div className="searchbox">
                    <input type="text" placeholder="Search.."></input>
                    <button type="buttonsubmit">  dsadasdasd
                        <image src="https://lh3.google.com/u/1/d/1xYcCDeJYU4_W0Lmt8LiBrNZ7VcPi7_0d=w1669-h919-iv"/>
                    </button>
                </div>
                <nav className="nav">
                    <a href="#">TEMPLATE</a>
                    <button className="create">CREATE</button>
                    <button className="login">LOGIN</button>
                    <button className="signin">SIGN IN</button>
                </nav>
            </header>

            <main className="main">
                {/* Sidebar ซ้าย */}
                <aside className="content-left">
                    <h3>Sort by</h3>
                    <ul>
                        <li><a href="#">⭐ Trending</a></li>
                        <li><a href="#">⏳ Latest</a></li>
                        <li><a href="#">🎮 Games</a></li>
                    </ul>

                    <h3>Category</h3>
                    <ul>
                        <li><a href="#">🎧 Songs</a></li>
                        <li><a href="#">🍔 Foods</a></li>
                        <li><a href="#">⚽ Sports</a></li>
                    </ul>
                </aside>

                {/* ส่วนกลาง */}
                <section className="main-content">
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <FollowButton />
                        </div>
                        <h4>The Best GPU of All Time [Games]</h4>
                        <img src="https://lh3.google.com/u/1/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv=w1912-h920-iv1" alt="Best GPUs of All Time" className="image" />
                        <button className="play" onClick={() => setPopupOpen(true)}>PLAY</button>
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
                        <PopupModal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
                    </div>
                </section>

                {/* Sidebar ขวา */}
                <aside className="content-right">

                </aside>
            </main>
        </div>
    );
};

export default HomePage;
