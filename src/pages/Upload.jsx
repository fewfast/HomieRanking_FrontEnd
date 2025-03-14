import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes } from "react-icons/fa";
import "./Upload.css";
import { CategoriesContext } from "./CategoriesContext";

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

const Upload = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoriesContext);
  const [popup, setPopup] = useState({ type: null, isOpen: false });
  const openPopup = (type) => setPopup({ type, isOpen: true });
  const closePopup = () => setPopup({ type: null, isOpen: false });
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizThumbnail, setQuizThumbnail] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // อัปโหลด Thumbnail
  const handleImageThumbnail = (event) => {
    const file = event.target.files[0];
    if (file) {
      setQuizThumbnail(URL.createObjectURL(file));
    }
  };

  // อัปโหลดหลายรูป
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // ใช้ URL ชั่วคราวเพื่อ preview
      src: URL.createObjectURL(file),
      caption: "", // เริ่มต้นเป็นข้อความว่าง
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
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

        <div className="nav">
        <button className="login" onClick={() => openPopup("Login")}>LOGIN</button>
        <button className="signin" onClick={() => openPopup("Signin")}>SIGN UP</button>
        </div>
      </header>

      {popup.type === "Login" && <LoginModal isOpen={popup.isOpen} onClose={closePopup} />}
      {popup.type === "Signin" && <SigninModal isOpen={popup.isOpen} onClose={closePopup} />}

      <div className="upload-box">
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
                <input type="radio" name="option" value={cat.name}/>
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
          <button className="cancel-btn">Cancel</button>
          <button className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;