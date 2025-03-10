import React, { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";
import "./Upload.css";

const Upload = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizThumbnail, setQuizThumbnail] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories] = useState([
    "List item 1",
    "List item 2",
    "List item 3",
    "List item 4",
    "List item 5",
    "List item 6",
    "List item 7",
    "List item 8",
  ]);

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
    <div className="upload-container">
      {/* Header */}
      <header className="upload-header">
        <div className="a">
        <img src="https://lh3.google.com/u/0/d/16EK2E7W3rcM56t5DTBVnTh0TvXgTY8S-=w1920-h927-iv1" width="100px" style={ { marginLeft: "200px" }} alt= "HOMIE RANKING"/>
        </div>

        <div className="auth-buttons">
          <button className="auth-btn">LOGIN</button>
          <button className="auth-btn">SIGN IN</button>
        </div>
      </header>

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
            {categories.map((item, index) => (
              <div key={index} className="category-item">
                <span>{item}</span>
                <input type="checkbox" />
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Thumbnail */}
        <div className="image-upload-container">
          <label>Quiz Thumbnail</label>
          <div className="image-upload-box" onClick={() => document.getElementById("thumbnailUpload").click()}>
            {quizThumbnail ? (
              <img src={quizThumbnail} alt="Quiz Thumbnail" className="preview-image" />
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

      {/* Buttons */}
      <div className="button-container">
          <button className="cancel-btn">Cancel</button>
          <button className="confirm-btn">Confirm</button>
        </div>

        {/* Upload Images Section */}
        <div className="image-upload-container">
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
        <div key={image.id} className="image-preview">
         <img src={image.src} alt="Uploaded" className="preview-image" />
         <input
        type="text"
        className="image-caption"
        placeholder="Enter caption"
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