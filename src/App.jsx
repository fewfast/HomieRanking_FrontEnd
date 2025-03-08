import React from "react";
import "./App.css";

const App = () => {
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
                            <a href="#">⭐ Trending</a>
                            <li>⏳ Latest</li>
                            <li>🎮 Games</li>
                        </ul>
                    </div>
                    <div className="category">
                        <h3>Category</h3>
                        <ul>
                            <li>🎧 Songs</li>
                            <li>🍔 Foods</li>
                            <li>⚽ Sports</li>
                        </ul>
                    </div>
                </aside>
                <section className="content">
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <button className="follow">FOLLOW</button>
                        </div>
                        <h4>The Best GPU of All Time [Games]</h4>
                        <img src="https://lh3.google.com/u/1/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv=w1912-h920-iv1" alt="Best GPUs of All Time" className="image" />
                        <button className="play">PLAY</button>
                    </div>
                    <div className="card">
                        <div className="user-info">
                            <div className="avatar"></div>
                            <span>Name #5555</span>
                            <button className="followed">FOLLOWED</button>
                        </div>
                        <h4>Name of Title [Name of Type]</h4>
                        <div className="placeholder"></div>
                        <button className="play">PLAY</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
