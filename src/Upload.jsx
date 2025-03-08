import React, { useState } from "react";
import { FaUpload } from "react-icons/fa"; // ใช้ไอคอนอัปโหลด
import "./Upload.css"; // นำเข้าไฟล์ CSS

const Upload = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [image, setImage] = useState(null); // เก็บไฟล์รูปภาพ
  const [categories] = useState([
    "List item",
    "List item",
    "List item",
    "List item",
    "List item",
    "List item",
  ]);

  // ฟังก์ชันจัดการอัปโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // แสดงรูปที่อัปโหลด
    }
  };

  return (
    <div className="upload-container">
      {/* Header */}
      <header className="upload-header">
        <h1>HOMIE RANKING</h1>
        <div className="auth-buttons">
          <button>LOGIN</button>
          <button>SIGN IN</button>
        </div>
      </header>

      {/* Upload Box */}
      <div className="upload-box">
        {/* Quiz Title Input */}
        <div className="input-container">
          <label>Quiz Title</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>

        {/* Quiz Description Input */}
        <div className="input-container">
          <label>Quiz Description</label>
          <textarea
            placeholder="Enter quiz description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </div>

        {/* Upload Image Section */}
        <div className="image-upload-container">
          <label>Quiz Thumbnail</label>
          <div className="image-upload-box">
            {image ? (
              <img src={image} alt="Uploaded Thumbnail" className="preview-image" />
            ) : (
              <>
                <FaUpload className="upload-icon" />
                <p>Upload Images</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Category List */}
        <div>
          <h2>Category</h2>
          <div className="category-box">
            {categories.map((item, index) => (
              <div key={index} className="category-item">
                <input type="checkbox" checked readOnly />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
