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
      <header className="upload-header">
        <h1>HOMIE RANKING</h1>
        <div className="auth-buttons">
          <button>LOGIN</button>
          <button>SIGN IN</button>
        </div>
      </header>

      <div className="upload-box">
        <div className="input-group">
          <div className="input-container">
            <label>Quiz Title</label>
            <input
              type="text"
              placeholder="Enter quiz title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>

          <div className="input-container description-container">
            <label>Quiz Description</label>
            <textarea
              placeholder="Enter quiz description"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="category-container">
          <h2>Category</h2>
          <div className="category-box">
            {categories.map((item, index) => (
              <div key={index} className="category-item">
                <span>{item}</span>
                <input type="checkbox" checked readOnly className="checkbox-right" />
              </div>
            ))}
          </div>
        </div>

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

        <div className="button-container">
          <button className="confirm-btn">Confirm</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
