import React, { useState, useContext } from "react";
import { useNavigate, useLocation, data } from 'react-router-dom';
import { FaUpload, FaTimes } from "react-icons/fa";
import { CategoriesContext } from "./CategoriesContext";
import { AuthContext } from "./AuthContext";
import { APIContext } from "./APIContext";
//Css ใช้ตัวเดียวกับ Upload เพราะ รูปแบบคล้ายๆกัน

const UpdatePage = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoriesContext);
  const { isLoggedIn, logout, user, token } = useContext(AuthContext);
  const { apiUrl } = useContext(APIContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const content = queryParams.get("content");
  const id = queryParams.get("id");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizThumbnail, setQuizThumbnail] = useState(null);
  const [quizcategories, setQuizCategories] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // อัปโหลด Thumbnail
  const compressImage = (file, maxSize = null, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // สำหรับ Thumbnail ถ้า maxSize === null จะไม่ลดขนาด resolution
          if (maxSize && (width > maxSize || height > maxSize)) {
            if (width > height) {
              height *= maxSize / width;
              width = maxSize;
            } else {
              width *= maxSize / height;
              height = maxSize;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          const newBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(newBase64);
        };
      };
    });
  };
  
  // อัปโหลด Thumbnail
  const handleImageThumbnail = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const compressedBase64 = await compressImage(file, null, 0.85); // ไม่ลด size แต่ลด quality เหลือ 0.85
      setQuizThumbnail(compressedBase64);
    }
  };

  // อัปโหลดหลายรูป แต่จะลดขนาดภาพ
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];
  
    for (const file of files) {
      const compressedBase64 = await compressImage(file, 800, 0.6); // รูปปกติ maxSize 800px quality 0.6
      newImages.push({
        id: file.name,
        src: compressedBase64,
        caption: "",
      });
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
  
    if (uploadedImages.length !== 20) {
      alert("Please upload at least one image.");
      return;
    }

    const imageSources = uploadedImages.map(image => image.src);
    const imageCaptions = uploadedImages.map(image => image.caption);
  
    try {
      const response = await fetch(`${apiUrl}/update_quiz/${id}`, {
        method: "PUT",
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
      alert("Update successful!");
      resetForm();
      navigate(`/profile?id=${user?._id}&username=${user?.username}`);
    } catch (error) {
      console.error("Error:", error);
      setMessages("Error: Please try again later.");
    }
  };

  return (

    <div className="containerUpload" style={{ fontFamily: "Jost, sans-serif" }}>
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
          <button className="profile" onClick={() => navigate(`/profile?id=${user?._id}&username=${user?.username}`)}>
            <span className="avatar-circle">
              <img src={user?.profile}  />
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
        <div style={{ fontFamily: "Titan One, sans-serif", textAlign: "center" }}>
            <div style={{ fontSize: "65px" }}>Update</div>
            <div style={{ fontSize: "25px" }}>your "{content}"</div>
        </div>
        <hr 
            style={{ marginTop: "20px" }}
        />

        {/* ส่วนกรอกข้อมูล */}
      <form onSubmit={handleSubmit}>
        
        {/* Quiz Title */}
        <div className="input-container" style={{ marginTop: "20px" }}>
          <label>Quiz Title</label>
          <input
            type="text"
            placeholder="Enter new title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>

        {/* Quiz Description */}
        <div className="input-container">
          <label>Quiz Description</label>
          <input
            type="text"
            placeholder="Enter new description"
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
          <label>Upload Images ( 20 pic. )</label>
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
              placeholder="Enter new Name"
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

export default UpdatePage;