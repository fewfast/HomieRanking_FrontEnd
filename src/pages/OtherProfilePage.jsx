import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { AuthContext } from "./AuthContext";
import { DataContentContext } from "./DataContentContext";
import { APIContext } from "./APIContext";

const Contents = ( datacontent ) => {

    return (
        <div style={{ fontFamily: "Jost, sans-serif" }}>
            <h2>
                <span>{datacontent.title} </span>
                <a href="/?category=GAMES" style={{ fontSize: "18px" }}>[{datacontent.categories}]</a>
            </h2>
            <h4 style={{ fontWeight: "400", marginTop: "-10px" }}>{datacontent.description}</h4>
            <img 
                src={datacontent.thumbnail}
                className="image-content"
            />
        </div>
    );
};

const Following = ({ username }) => {

    return (
        <div style={{ fontFamily: "Jost, sans-serif", marginTop: "15px", display:"flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{username}</span>
        </div>
    );
};

const FollowButton = ({ username }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { user, token, setUser } = useContext(AuthContext);
    const { apiUrl } = useContext(APIContext);
    
    useEffect(() => {
        if (user && user.following) {
            setIsFollowed(user.following.includes(username)); //เช็คว่า User ได้ follow username หรือคนนี้อยู่มั้ย
        }
    }, [user, username]);

    // ฟังก์ชันสำหรับการติดตาม
    const handleFollow = async (e) => {
        e.preventDefault();
        setIsFollowed(true);

        try {
            const response = await fetch(`${apiUrl}/follow/${username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const updated = { 
                    ...user,
                    following: [...user.following, username] 
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
            const response = await fetch(`${apiUrl}/unfollow/${username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const updated = { 
                    ...user,
                    following: user.following.filter(id => id !== username)
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

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); //queryParams.get เป็นการดึงค่าพารามิเตอร์มาจาก Url ที่ส่งมา
    const username = queryParams.get("username");
    const description = queryParams.get("description"); 
    const [isActive, setIsActive] = useState("contents");
    
    const [profileBase64, setProfileBase64] = useState('');
    const [wallpaperBase64, setWallpaperBase64] = useState('');
    const [following, setfollowing] = useState(null);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { datacontent } = useContext(DataContentContext);
   
    const handleClick = (word) => {
        setIsActive(word);
    }

    useEffect(() => {
        // ดึงข้อมูล Base64 จาก sessionStorage
        const profile = sessionStorage.getItem('profileData');
        if (profile) {
            const parsedData = JSON.parse(profile);
            setProfileBase64(parsedData.profile);
            setWallpaperBase64(parsedData.wallpaper);
            setfollowing(parsedData.following);
        }
    }, []);

    return (
        <div className="profile-container">
            {/* Header */}
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
                <div 
                    className="profile-banner" 
                    style={{
                        background: wallpaperBase64 
                            ? `url('${wallpaperBase64}') center/cover no-repeat` 
                            : 'lightgray',
                    }}
                >
                    <div className="profile-picture">
                        <img 
                            src={profileBase64} 
                        />
                    </div>
                </div>

               <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px", marginTop: "25px" }}>
                   <FollowButton username={username}/>
               </div>   

                <div className="profile-content">
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "26px" ,fontWeight: "bold" }}>
                        {username}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "15px" ,fontWeight: "100", color: "gray" }}>
                        @{id}
                    </div> 
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "16px" , marginTop: "20px" }}>
                        {description}
                    </div>
                </div>

                <hr style={{ display: "flex", justifyContent: "center", width: "95%" }}/>
                <div style={{ fontFamily: "Jost, sans-serif" ,fontSize: "22px" ,fontWeight: "1000", marginTop: "20px", marginLeft: "70px" }}>
                    <span
                        className={isActive === "contents" ? "active-style" : "default-style"}
                        style={{
                            cursor: "pointer",
                            transition: 'all 0.1s ease'
                        }}
                        onClick={() => handleClick("contents")}
                    >
                        contents
                    </span>
                    <span
                        className={isActive === "following" ? "active-style" : "default-style"}
                        style={{
                            marginLeft: "80px",
                            cursor: "pointer",
                            transition: 'all 0.1s ease' 
                        }}  
                        onClick={() => handleClick("following")}
                    >
                        following
                    </span>
                </div>
                { isActive === "contents" ?
                <section className="contents-container">
                    {datacontent.filter((item) => item.uploaded_by === username).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontFamily: "Jost", marginTop: "10vh" }}>
                            Empty Content
                        </div>
                    ) : (
                        datacontent
                            .filter((item) => item.uploaded_by === username)
                            .map((item, index) => (
                                <div key={index}>
                                    <Contents {...item} />
                                </div>
                            ))
                    )}
                </section>
                :
                <section className="contents-container" style={{ marginTop: "10px" }}>
                    {following.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontFamily: "Jost", marginTop: "10vh" }}>
                        Empty Following
                        </div>
                    ) : (
                        following.map((username, index) => (
                            <Following key={index} username={username} />
                        ))
                    ) 
                    } 
                </section>
                }

                <hr style={{ display: "flex", justifyContent: "center", width: "95%", marginTop: "80px", marginBottom: "50px" }}/>

            </div>
        </div>
        
    );
};

export default ProfilePage;