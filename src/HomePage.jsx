import React from "react";
import "./HomePage.css";
import { useState } from "react";

const PopupModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="pop">
                <button className="close-btn" onClick={onClose}>
                <img src="https://lh3.google.com/u/0/d/1LYVUNI9zjYLnigkJ_jCIWk_J7x7aiVSS=w1920-h927-iv2" width="30"/>
                </button>
                <img src="https://lh3.google.com/u/0/d/16EK2E7W3rcM56t5DTBVnTh0TvXgTY8S-=w1920-h927-iv1"  
                width="60" />
                </div>
                <h2 className="titan-text " style={{ fontSize: "3rem" }}>Choose </h2>
                <h2 className="titan-text" style={{ fontSize: "1.5rem" }}>Picture</h2>
                <button className="option-btn ">32 pic.</button>
                <button className="option-btn ">64 pic.</button>
                <button className="option-btn ">128 pic.</button>
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
                <div className="logo">
                    <img src="https://lh3.google.com/u/0/d/16EK2E7W3rcM56t5DTBVnTh0TvXgTY8S-=w1920-h927-iv1"  
                width="125px" />
                </div>
                <nav className="nav">
                    <span>TEMPLATE</span>
                    <button className="create">CREATE</button>
                    <button className="login">LOGIN</button>
                    <button className="signin">SIGN IN</button>
                </nav>
            </header>
            <main className="main">
                <aside className="sidebar">
                    <div className="a">
                    <img src="https://lh3.google.com/u/0/d/16EK2E7W3rcM56t5DTBVnTh0TvXgTY8S-=w1920-h927-iv1"
                        width = "150"
                    />
                    </div>
                    <div className="sort-by">
                        <hr></hr>
                        <h3 className="a">Sort by</h3>
                        <ul className="click">

                            <li>⭐ <a href="#">TRENDING</a></li>
  <li>⏳ <a href="#">LASTEST</a></li>
  <li>🎮 <a href="#">GAMES</a></li>
                        </ul>
                    </div>
                    <div className="category">
                    <hr></hr>
                        <h3 className="a" >Category</h3>
                        <ul className="click">
  <li>🎧 <a href="#">SONGS</a></li>
  <li>🍔 <a href="#">FOODS</a></li>
  <li>⚽ <a href="#">SPORTS</a></li>
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
