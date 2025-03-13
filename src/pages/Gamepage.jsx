import React, { useEffect, useState } from "react";
import { useNavigate , useLocation } from 'react-router-dom';
import "./Gamepage.css";

const PopWinner = () => {
  const navigate = useNavigate();
  return (
    <div className="pop-up-overlay">
      <div className="pop-up-winner">
        <div className="pop-up">
          <img src="src/img/1stWinner.png" alt="Winner" style={{ width: "400px", height: "auto" }}/>
          <h1 style={{ fontSize: "24px", fontWeight: "400", textDecoration: "underline", cursor: "pointer", marginTop: "5px" }} onClick={() => window.location.reload()}>Try Again?</h1>
          <button className="back-btn" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>BACK</button>
        </div>
      </div>
    </div>
  );

};


const Gamepage = () => {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRound = parseInt(queryParams.get("round"), 10) || 0;
  const [roundall, setRoundAll] = useState(initialRound);
  const [round, setRound] = useState(1);

  const openPopup = (type) => setPopup({ type, isOpen: true });
  const closePopup = () => setPopup({ type: null, isOpen: false });

  const [imageLinks, setImageLinks] = useState([
    "https://promotions.co.th/wp-content/uploads/2025/01/nvidia-rtx-5090.jpg",
    "https://storage.googleapis.com/file-computeandmore/ckeditor_upload/2021/09/04/gigabyte-amd-radeon-rx-6600-non-xt-eagle-graphics-card-_1.jpg",
    "https://www.uboncomputer.co.th/pub/media/catalog/product/cache/566bac40c34e1b79304197de40a22c99/1/_/1_489.jpg",
    "https://storage.googleapis.com/file-computeandmore/large_images/7a0a04f7-c99e-40c0-ae2a-f7af210ac678.png",
    "https://promotions.co.th/wp-content/uploads/2025/01/nvidia-rtx-5090.jpg",
    "https://storage.googleapis.com/file-computeandmore/ckeditor_upload/2021/09/04/gigabyte-amd-radeon-rx-6600-non-xt-eagle-graphics-card-_1.jpg",
    "https://www.uboncomputer.co.th/pub/media/catalog/product/cache/566bac40c34e1b79304197de40a22c99/1/_/1_489.jpg",
    "https://storage.googleapis.com/file-computeandmore/large_images/7a0a04f7-c99e-40c0-ae2a-f7af210ac678.png",
    "https://promotions.co.th/wp-content/uploads/2025/01/nvidia-rtx-5090.jpg",
    "https://storage.googleapis.com/file-computeandmore/ckeditor_upload/2021/09/04/gigabyte-amd-radeon-rx-6600-non-xt-eagle-graphics-card-_1.jpg",
    "https://www.uboncomputer.co.th/pub/media/catalog/product/cache/566bac40c34e1b79304197de40a22c99/1/_/1_489.jpg",
    "https://storage.googleapis.com/file-computeandmore/large_images/7a0a04f7-c99e-40c0-ae2a-f7af210ac678.png",
  ]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (round >= roundall) {
      console.log("Finally");
    }
  }, [round]);
  
  useEffect(() => {
    fetch("https://your-backend.com/api/get-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          const shuffledImages = shuffleArray(data.images);  // ใช้ shuffleArray ที่นี่
          setImageLinks(shuffledImages);
          setRound(1);  // รีเซ็ตจำนวนรอบเริ่มต้น
  
          const totalRounds = Math.pow(2, Math.floor(Math.log2(shuffledImages.length || 2)));
          setRoundAll(totalRounds);  // อัปเดตค่าของ roundall
        } else {
          setImageLinks(["src/img/Return.png"]);
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  const handleSelect = (image) => {
    const newSelection = [...selectedImages, image];

    if (imageLinks.length === 2) {
      setImageLinks([image]);
    } else {
      setSelectedImages(newSelection);
      const remainingImages = imageLinks.slice(2);
      setImageLinks(shuffleArray(remainingImages));
    }

    setRound(round + 1);
  };


  return (
  
  <div className="game-container" >
      <div className= "c">
        <></>
        <img src="src/img/Logo.png" width="200" alt="HomieRanking" 
          style={{ width: "150px", marginLeft: "10px", marginTop: "10px", cursor: "pointer"}}
          onClick={() => navigate("/")}
        />
      </div>
      <h1>Which one wins?</h1>
      <p className="round-info">
        <span>Round of {roundall - 1}</span>  
        <span style={{ marginLeft: "10px", color: "#33FF00" }}>{round}</span>  
        <span>/{roundall - 1}</span>
      </p>
      {imageLinks.length >= 2 && (
        <div className="image-grid">
          <div className="image-container">
            <img
              src={imageLinks[0]}
              alt="Left"
              className="h1"
              style={{ border: "10px solid #33FF00", width: "450px", height: "400px" }}
              onClick={() => handleSelect(imageLinks[0])}
            />
            <p  style={{ fontFamily: "Jost, sans-serif", fontSize: "20px", fontWeight: "500" }} >RTX 5090</p> {/* ข้อความใต้รูป */}
          </div>
          <div className="vs-container">
            <img
              style={{ marginTop: "50px" }}
              src="src/img/Vs.png"
              className="no-hover h2"
              alt="VS"
            />
          </div>
          <div>
            <img
              src={imageLinks[1]}
              alt="Right"
              className="h1"
              style={{ border: "10px solid #FF0000", width: "450px", height: "400px"  }}
              onClick={() => handleSelect(imageLinks[1])}
            />
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "20px", fontWeight: "500" }} >RX 6600</p> {/* ข้อความใต้รูป */}
          </div>
        </div>
      )}


      {imageLinks.length === 1 && (
        <div className="winner-container">
          <h2>1st Winner!</h2>
          <img src={imageLinks[0]} alt="Winner" style={{ width: "550px", height: "400px" }}/>
          <h2  onClick={() => Pup} style={{ cursor: "pointer" }}>FINISH</h2>
        </div>
      )}
  </div>
  );
};


export default Gamepage;