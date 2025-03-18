import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes } from "react-icons/fa";
import "./Upload.css";
import { CategoriesContext } from "./CategoriesContext";
import { AuthContext } from "./AuthContext";

const Upload = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoriesContext);
  const { isLoggedIn, logout, user, token } = useContext(AuthContext);

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizThumbnail, setQuizThumbnail] = useState(null);
  const [quizcategories, setQuizCategories] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // อัปโหลด Thumbnail
  const handleImageThumbnail = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setQuizThumbnail(reader.result); // ตั้งค่า Base64 string ให้กับ state
      };
  
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64
    }
  };

  // อัปโหลดหลายรูป
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];
  
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // ส่งกลับผลลัพธ์เป็น base64
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };
  
    for (const file of files) {
      try {
        const base64 = await readFileAsBase64(file);
        newImages.push({
          id: file.name, // ใช้ชื่อไฟล์เป็น 
          src: base64, // ใช้ base64 ที่ได้
          caption: "", // เริ่มต้นเป็นข้อความว่าง
        });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // ลบรูป
  const handleRemoveImage = (id) => {
    setUploadedImages(uploadedImages.filter((image) => image.id !== id));
  };

  // อัปเดตข้อความกำกับรูป
  const handleCaptionChange = (id, text) => {
    setUploadedImages(
      uploadedImages.map((image) =>
        image.id === id ? { ...image, caption: text } : image
      )
    );
  };

  const resetForm = () => {
    setQuizTitle("");
    setQuizDescription("");
    setQuizCategories("");
    setQuizThumbnail(null);
    setUploadedImages([]);
  };

  // ส่งข้อมูลไป Database
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!quizTitle || !quizDescription) {
      alert("Please fill in all fields.");
      return;
    }

    if(!quizcategories) {
      alert("Please select a category.");
      return;
    }
  
    if (!quizThumbnail) {
      alert("Please upload a thumbnail.");
      return;
    }
  
    if (uploadedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const imageSources = uploadedImages.map(image => image.src);
    const imageCaptions = uploadedImages.map(image => image.caption);
  
    try {
      const response = await fetch("https://upgraded-yodel-wr6wvxv4j5qc9r4-3001.app.github.dev/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: quizTitle,
          description: quizDescription,
          categories: quizcategories,
          thumbnail: quizThumbnail,
          images: imageSources,
          image_names: imageCaptions,
        }),
      });
  
      setQuizTitle("");
      setQuizDescription("");
      setQuizThumbnail("");
      setQuizCategories("");
      setUploadedImages([]);
    } catch (error) {
      console.error("Error:", error);
      setMessages("Error: Please try again later.");
    }
  };

  return (

    <div className="containerUpload">
      {/* Header */}
      <header className="upload-header">
        <div className="a">
        <img src="src/img/Logo.png" 
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
          <button className="profile" onClick={() => navigate("/profile")}>
            <span className="avatar-circle">
              <img src="https://i1.sndcdn.com/avatars-000328000782-3wbizb-t1080x1080.jpg"  />
            </span>
            <span style={{ fontFamily: "Inter, sans-serif" ,fontSize: "14px" ,fontWeight: "bold", marginLeft: "10px", marginRight: "10px" }}>
              {user?.username}
            </span>
          </button>
        </div>
        :
        <div className="nav">
          <button className="back" onClick={() => navigate("/")}>BACK</button>
        </div>
        } 
      </header>

    {/* Input ข้อมูลส่งไป Database Mongo */}
      <div className="upload-box">
        {/* ส่วนกรอกข้อมูล */}
      <form onSubmit={handleSubmit}>
        
        {/* Quiz Title */}
        <div className="input-container">
          <label>Quiz Title</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>

        {/* Quiz Description */}
        <div className="input-container">
          <label>Quiz Description</label>
          <input
            type="text"
            placeholder="Enter quiz description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="category-container">
          <h2>Category</h2>
          <div className="category-box">
            {categories.map((cat, index) => (
              [ cat.name === "TRENDING" || cat.name === "LATEST" ? null : 
              <div key={index} className="category-item">
                <span>
                  {cat.icon} {cat.name}
                </span>
                <input 
                  type="radio" 
                  name="option" 
                  value={cat.name}
                  onChange={(e) => setQuizCategories(e.target.value)}
                />
              </div>
              ]
            ))}
          </div>
        </div>

        {/* Quiz Thumbnail */}
        <div className="image-upload-container">
          <label>Quiz Thumbnail</label>
          <div className="image-upload-box" onClick={() => document.getElementById("thumbnailUpload").click()}>
            {quizThumbnail ? (
              <img 
              src={quizThumbnail} 
              alt="Quiz Thumbnail" 
              className="preview-image"
              style={{ maxHeight: "200px", maxWidth: "100%"}} 
              />
            ) : (
              <FaUpload className="upload-icon" />
            )}
            <input
              id="thumbnailUpload"
              type="file"
              accept="image/*"
              onChange={handleImageThumbnail}
              style={{ display: "none" }}
            />

          </div>
        </div>


        {/* Upload Images Section */}
        <div className="image-upload-container" style={{ marginTop: "60px" }}>
          <label>Upload Images</label>
          <div className="image-upload-box" onClick={() => document.getElementById("imageUpload").click()}>
            <FaUpload className="upload-icon" />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>


        {/* Show Uploaded Images */}
        <div className="uploaded-images">
         {uploadedImages.map((image) => (
          <div key={image.id} className="image-preview" style={{ textAlign: "center" }}>
            <img src={image.src} alt="Uploaded" className="preview-image" style={{ maxHeight: "300px", maxWidth: "100%", marginTop: "20px", display: "flex" }}  />
            <input
              type="text"
              className="image-caption"
              placeholder="Enter Name"
              value={image.caption}
              onChange={(e) => handleCaptionChange(image.id, e.target.value)}
            />
            <button className="remove-btn" onClick={() => handleRemoveImage(image.id)}>
              <FaTimes />
            </button>
          </div>
        ))}
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button type="button" className="cancel-btn" onClick={() => resetForm()}>Cancel</button>
          <button type="submit" className="confirm-btn">Confirm</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Upload;