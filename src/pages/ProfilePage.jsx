import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { AuthContext } from "./AuthContext";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout, user } = useContext(AuthContext);

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


        </div>
        
    );
};

export default ProfilePage;