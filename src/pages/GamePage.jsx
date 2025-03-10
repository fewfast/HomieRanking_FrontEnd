import React, { useEffect, useState } from "react";
import "./Gamepage.css";

const Gamepage = () => {
  const [imageLinks, setImageLinks] = useState([]);
  const [round, setRound] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetch("https://your-backend.com/api/get-images") // เปลี่ยน URL เป็น backend ของคุณ
      .then((res) => res.json())
      .then((data) => {
        setImageLinks(data.images);
        setRound(Math.pow(2, Math.floor(Math.log2(data.images.length))));
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  const handleSelect = (image) => {
    const newSelection = [...selectedImages, image];
    if (newSelection.length === imageLinks.length / 2) {
      setImageLinks(newSelection);
      setSelectedImages([]);
      setRound(round / 2);
    } else {
      setSelectedImages(newSelection);
    }
  };

  return (
    <div className="game-container">
      <h1>Which one wins?</h1>
      <p>Round of {round}</p>
      <div className="image-grid">
        {imageLinks.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} onClick={() => handleSelect(img)} />
        ))}
      </div>
      {imageLinks.length === 1 && (
        <div className="winner-container">
          <h2>Winner!</h2>
          <img src={imageLinks[0]} alt="Winner" />
        </div>
      )}
    </div>
  );
};

export default Gamepage;
