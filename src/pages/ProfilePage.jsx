import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { AuthContext } from "./AuthContext";
import { DataContentContext } from "./DataContentContext";
import { APIContext } from "./APIContext";

const Contents = ( datacontent ) => {
    const { token } = useContext(AuthContext);
    const { apiUrl } = useContext(APIContext);
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/delete_quiz/${datacontent._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Delete content successfully");
            } else {
                alert("Failed to delete content");
            }
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    };

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
            <div style={{ justifyContent: "center", display: "flex", marginTop: "10px", gap: "20px"}}>
                <button 
                    className="update" 
                    style={{ backgroundColor: "black", cursor: "pointer" }}
                    onClick={() => {
                        navigate(`/update?id=${datacontent._id}&content=${datacontent.title}`);
                        window.scrollTo(0, 0);
                    }}
                >
                    UPDATE
                </button>
                
                <button 
                    className="delete" 
                    style={{ backgroundColor: "red", cursor: "pointer" }} 
                    onClick={handleDelete}
                >
                    DELETE
                </button>
            </div>
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

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const { isLoggedIn, logout, user, token } = useContext(AuthContext);
    const { datacontent } = useContext(DataContentContext);
    const { apiUrl } = useContext(APIContext);

    const [Wallpaper, setWallpaper] = useState(null);
    const [description, setDescription] = useState(null);
    const [picture, setPicture] = useState(null);
    const [isActive, setIsActive] = useState("contents");

    const handleClick = (word) => {
       setIsActive(word); 
    }

    const handleImageWallpaper = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            setWallpaper(reader.result); // ตั้งค่า Base64 string ให้กับ state
          };
      
          reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64
        }
    };

    const handleImageProfile = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            setPicture(reader.result); // ตั้งค่า Base64 string ให้กับ state
          };
      
          reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault(); 
        if (!description && !picture && !Wallpaper) {
            alert("Please update at least one field before saving.");
            return;
        }
    
        // ใช้ค่าที่อัพเดตจาก state ถ้ามี, ถ้าไม่มีใช้ค่าจาก user เดิม
        const updatedDescription = description || user?.description_profile;
        const updatedWallpaper = Wallpaper || user?.wallpaper;
        const updatedProfilePicture = picture || user?.profile;
    
        try {
            const response = await fetch(`${apiUrl}/update_profile/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    description_profile: updatedDescription,
                    profile: updatedProfilePicture,
                    wallpaper: updatedWallpaper
                })
            });
    
            if (response.ok) {
                alert("Profile updated successfully!");
                
                // อัพเดตข้อมูลใน AuthContext คับbro
                const updatedUser = { 
                    ...user, 
                    description_profile: updatedDescription, 
                    profile: updatedProfilePicture, 
                    wallpaper: updatedWallpaper 
                };
                // เก็บข้อมูลใหม่ลงใน localStorage
                localStorage.setItem("user", JSON.stringify(updatedUser));
                // อัพเดตข้อมูลใน AuthContext
                setUser(updatedUser); 
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

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
                <div 
                    className="profile-banner" 
                    style={{
                        background: Wallpaper || user?.wallpaper 
                            ? `url('${Wallpaper || user?.wallpaper}') center/cover no-repeat` 
                            : 'lightgray',
                    }}
                >
                    <div className="profile-picture">
                        <img 
                            src={picture ? picture : `${user?.profile}` } 
                        />
                    </div>
                    <div className="profile-change">
                        { /* Edit Profile Picture */ } 
                        <img 
                            src="src/img/Camera.png"
                            style={{ padding: "6px", width: "18px", height: "18px", filter: "grayscale(100%) invert(100%)", cursor: "pointer" }}
                            title="Change Profile Picture"
                            onClick={() => document.getElementById("PictureUpload").click()}
                        />
                        <input
                            id="PictureUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageProfile}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px", gap: "10px" }}>
                    <button 
                        className="wallpaper" 
                        style={{ cursor: "pointer", marginTop: "10px" }} 
                        onClick={() => setDescription(prompt("Enter your new description"))}
                    >
                        {/* Edit Description profile */} 
                        <img 
                            src="src/img/Edit.png"
                            style={{ width: "20px", height: "20px", filter: "grayscale(100%) invert(100%)", cursor: "pointer", padding: "2px" }}
                            title="Change Description"
                        />
                    </button>
                    <button 
                        className="edit" 
                        style={{ cursor: "pointer", marginTop: "10px" }} 
                        onClick={() => document.getElementById("wallpaperUpload").click()}
                    >
                        {/* Edit Wallpaper */}
                        <img 
                            src="src/img/wallpaper.png"
                            style={{ width: "25px", height: "25px", filter: "grayscale(100%) invert(100%)", cursor: "pointer" }}
                            title="Change Wallpaper"
                        />
                        <input
                            id="wallpaperUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageWallpaper}
                            style={{ display: "none" }}
                        />
                    </button>
                </div>
                <div className="profile-content">
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "26px" ,fontWeight: "bold", marginTop: "10px" }}>
                        {user?.username}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "15px" ,fontWeight: "100", color: "gray" }}>
                        @{id}
                    </div> 
                    <div style={{ fontFamily: "Inter, sans-serif" ,fontSize: "16px" , marginTop: "20px" }}>
                        {description || user?.description_profile}
                    </div>
                </div>

                <hr style={{ display: "flex", justifyContent: "center", width: "95%" }}/>
                <div style={{ fontFamily: "Jost, sans-serif" ,fontSize: "22px" ,fontWeight: "1000", marginTop: "20px", marginLeft: "70px" }} >
                    <span 
                    className={isActive === "contents" ? "active-style" : "default-style"}
                    style={{ 
                        cursor: "pointer",
                        transition: 'all 0.1s ease'  
                    }}
                    onClick={() => handleClick("contents")}
                   >contents</span>

                    <span 
                    className={isActive === "following" ? "active-style" : "default-style"}
                    style={{ 
                        marginLeft: "80px",
                        cursor: "pointer",
                        transition: 'all 0.1s ease' 
                    }}
                    onClick={() => handleClick("following")}
                    >following</span>
                </div>
    
                { "contents" === isActive ?
                <section className="contents-container">
                    {datacontent.filter((item) => item.uploaded_by === user?.username).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontFamily: "Jost", marginTop: "10vh" }}>
                            Empty Content
                        </div>
                    ) : (
                        datacontent
                            .filter((item) => item.uploaded_by === user?.username)
                            .map((item, index) => (
                                <div key={index}>
                                    <Contents {...item} />
                                </div>
                            ))
                    )}
                </section>
                :
                <section className="contents-container" style={{ marginTop: "10px" }}>
                    {user?.following?.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontFamily: "Jost", marginTop: "10vh" }}>
                            Empty Following
                        </div>
                    ) : (
                        user?.following?.map((username, index) => (
                            <Following key={index} username={username} />
                        ))
                    )}
                </section>
                }

                <hr style={{ display: "flex", justifyContent: "center", width: "95%", marginTop: "80px" }}/>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                    <button 
                        className="save-profile" 
                        style={{ 
                            fontFamily: "Jost, sans-serif",
                            fontWeight: "500",
                            backgroundColor: "green", 
                            color: "white", 
                            padding: "10px 20px", 
                            border: "none",
                            cursor: "pointer", 
                            borderRadius: "15px", 
                            marginTop: "20px", 
                        }}
                        onClick={handleSaveProfile}
                    >
                        SAVE PROFILE
                    </button>
                </div>

            </div>
        </div>
        
    );
};

export default ProfilePage;