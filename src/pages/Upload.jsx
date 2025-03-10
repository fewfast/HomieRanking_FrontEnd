import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./Upload.css";


const Upload = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [image, setImage] = useState(null);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-container">
      {/* Header */}
      <header className="upload-header">
        <div className="logo">
          {/* ใช้รูปแทน HOMIE RANKING */}
          <img src="https://lh3.google.com/u/0/d/1U5Tw6GqBu7qLwJk0gZncSssvMZp1tQg6=w1919-h869-iv1" alt="HOMIE RANKING"  />
        </div>
        <div className="auth-buttons">
          <button>LOGIN</button>
          <button>SIGN IN</button>
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
        <div className="input-des">
          <label>Quiz Description</label>
          <input
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
                <input type="checkbox"  />
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Thumbnail */}
        <div className="image-upload-container">
  <label>Quiz Thumbnail</label>
  <div className="image-upload-box" onClick={() => document.getElementById("imageUploadInput").click()}>
    <FaUpload className="upload-icon" />
    <input
      id="imageUploadInput"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: "none" }} 
    />
  </div>
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
