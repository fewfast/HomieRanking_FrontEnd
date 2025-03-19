import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { AuthContext } from "./AuthContext";
import { DataContentContext } from "./DataContentContext";

const Contents = () => {
    return (
        <div style={{ fontFamily: "Jost, sans-serif" }}>
            <h2>
                <span>This is name content </span>
                <a href="/?category=GAMES" style={{ fontSize: "18px" }}>[GAMES]</a>
            </h2>
            <img 
                src="https://i1.sndcdn.com/avatars-000328000782-3wbizb-t1080x1080.jpg" 
                className="image-content"
            />
            <div style={{ justifyContent: "center", display: "flex", marginTop: "10px", gap: "20px"}}>
                <button className="update" style={{ backgroundColor: "black", cursor: "pointer" }}>UPDATE</button>
                <button className="delete" style={{ backgroundColor: "red", cursor: "pointer" }}>DELETE</button>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const { dataContent } = useContext(DataContentContext);

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div>
                    <img 
                        src="src/img/Logo.png" 
                        width="100px" 
                        onClick={() => navigate("/")}
                        style={ { marginLeft: "200px", cursor: "pointer"}} 
                        alt= "HOMIE RANKING" 
                    />   
                </div>
                {isLoggedIn ?
                    <div className="nav">
                        <span onClick={() => navigate("/")}>
                            <button className="logout" onClick={logout}>LOGOUT</button>
                        </span>
                    </div>
                    :
                    <div className="nav">
                        <button className="back" onClick={() => navigate("/")}>BACK</button>
                    </div>
                } 
            </header>
            
            <div className="profile-box">
                <div className="profile-banner">
                    <div className="profile-picture">
                        <img 
                            src="https://i1.sndcdn.com/avatars-000328000782-3wbizb-t1080x1080.jpg" 
                        />
                    </div>
                </div>
                <div>
                    <button className="edit" style={{ backgroundColor: "black", cursor: "pointer", marginLeft: "1050px", marginTop: "10px" }}>EDIT PROFILE</button>
                </div>
                <div className="profile-content">
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "26px" ,fontWeight: "bold", marginTop: "10px" }}>
                        ikunwe
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "15px" ,fontWeight: "100", color: "gray" }}>
                        @wadad
                    </div> 
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "16px" , marginTop: "20px" }}>
                        This is my description
                    </div>
                </div>
                <hr style={{ display: "flex", justifyContent: "center", width: "95%" }}/>
                <div style={{ fontFamily: "Jost, sans-serif" ,fontSize: "22px" ,fontWeight: "1000", marginTop: "20px", marginLeft: "70px", textDecoration: 'underline'}}>
                    contents
                </div>
                <section className="contents-container">
                    {Array(8).fill(null).map((_, index) => (
                            <Contents key={index}/>
                        )
                    )}
                </section>
            </div>
        </div>
        
    );
};

export default ProfilePage;