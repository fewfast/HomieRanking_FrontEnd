import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Gamepage.css";

const PopWinner = ({ isOpen }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="pop-up-overlay">
      <div className="pop-up-winner">
        <div className="pop-up">
          <img src="src/img/1stWinner.png" alt="Winner" style={{ width: "400px", height: "auto" }} />
          <h1 style={{ fontSize: "24px", fontWeight: "400", textDecoration: "underline", cursor: "pointer", marginTop: "5px" }} onClick={() => window.location.reload()}>Try Again?</h1>
          <button className="back-btn" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>BACK</button>
        </div>
      </div>
    </div>
  );
};

const Gamepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImages, setSelectedImages] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const initialRound = parseInt(queryParams.get("round"), 10) || 0;
  const [roundall, setRoundAll] = useState(initialRound);
  const [round, setRound] = useState(1);
  const Title = queryParams.get("Title");

  const [imageLinks, setImageLinks] = useState([]);
  const [popup, setPopup] = useState({ type: null, isOpen: false });
  const openPopup = (type) => setPopup({ type, isOpen: true });

  useEffect(() => {
    if (Title === "The Best GPU of All time") {
      const images = [
        { src: "https://promotions.co.th/wp-content/uploads/2025/01/nvidia-rtx-5090.jpg", name: "RTX 5090" },
        { src: "https://storage.googleapis.com/file-computeandmore/ckeditor_upload/2021/09/04/gigabyte-amd-radeon-rx-6600-non-xt-eagle-graphics-card-_1.jpg", name: "RX 6600"},
        { src: "https://www.uboncomputer.co.th/pub/media/catalog/product/cache/566bac40c34e1b79304197de40a22c99/1/_/1_489.jpg", name: "RTX 4060Ti"},
        { src: "https://storage.googleapis.com/file-computeandmore/large_images/7a0a04f7-c99e-40c0-ae2a-f7af210ac678.png", name: "RTX 5090"}
      ];
  
      const shuffledImages = shuffleArray(images); 
      setImageLinks(shuffledImages);
    } else if (Title === "The Best FastFood in the World") {
      const images = [
        { src: "https://www.tvpoolonline.com/wp-content/uploads/2018/04/53535353.jpg", name: "แพนง" },
        { src: "https://th.bing.com/th/id/OIP.zdCctyXbxKUkwRqoFqaacwHaHa?rs=1&pid=ImgDetMain", name: "แกงเขียวหวาน" }
      ];
  
      setImageLinks(shuffleArray(images)); 
    } else if (Title === "Messi or Ronaldo?") {
      const images = [
        { src: "https://www.tvpoolonline.com/wp-content/uploads/2018/04/53535353.jpg", name: "แพนง" },
        { src: "https://th.bing.com/th/id/OIP.zdCctyXbxKUkwRqoFqaacwHaHa?rs=1&pid=ImgDetMain", name: "แกงเขียวหวาน" }
      ];
  
      setImageLinks(shuffleArray(images)); 
    }
  }, [Title]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (round >= roundall) {
      console.log("Finally");
      openPopup("Finish"); 
    }
  }, [round, roundall]);

  useEffect(() => {
    fetch("https://your-backend.com/api/get-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          const shuffledImages = shuffleArray(data.images); 
          setImageLinks(shuffledImages);
          setRound(1);

          const totalRounds = Math.ceil(Math.log2(shuffledImages.length));
          setRoundAll(totalRounds + 1);
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
      
      const remainingImages = shuffleArray(imageLinks.slice(2)); 
      setImageLinks(remainingImages);
    }
    
    setRound(round + 1);
  };

  return (
    <div className="game-container">
      <div className="c">
        <img src="src/img/Logo.png" width="200" alt="HomieRanking"
          style={{ width: "150px", marginLeft: "10px", marginTop: "10px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <h1>Which one wins?</h1>
      <p className="round-info">
        <span>Round of {roundall}</span>
        <span style={{ marginLeft: "10px", color: "#33FF00" }}>{round}</span>
        <span>/{roundall}</span>
      </p>
      
      {imageLinks.length >= 2 && (
        <div className="image-grid">
          <div className="image-container">
            <img
              src={imageLinks[0].src}
              alt={imageLinks[0].name}
              className="h1"
              style={{ border: "10px solid #33FF00", width: "450px", height: "400px" }}
              onClick={() => handleSelect(imageLinks[0])}
            />
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "20px", fontWeight: "500" }} >{imageLinks[0].name}</p> {/* ข้อความใต้รูป */}
          </div>
          <div className="vs-container">
            <img
              style={{ marginTop: "50px", width: "200px"}}
              src="src/img/Vs.png"
              className="no-hover h2"
              alt="VS"
            />
          </div>
          <div>
            <img
              src={imageLinks[1].src}
              alt={imageLinks[1].name}
              className="h1"
              style={{ border: "10px solid #FF0000", width: "450px", height: "400px" }}
              onClick={() => handleSelect(imageLinks[1])}
            />
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "20px", fontWeight: "500" }} >{imageLinks[1].name}</p> {/* ข้อความใต้รูป */}
          </div>
        </div>
      )}

      {imageLinks.length === 1 && (
        <div className="winner-container">
          <h2>1st Winner!</h2>
          <img src={imageLinks[0].src} alt={imageLinks[0].name} style={{ width: "500px", height: "400px" }} />
          <p style={{ marginTop: "5px", fontFamily: "Jost, sans-serif", fontSize: "25px", fontWeight: "500" }} >{imageLinks[0].name}</p>
          <div className="finish-btn-container">
            <h2 className="finish-btn" onClick={() => openPopup("Finish")} style={{ cursor: "pointer" }}>
              FINISH
            </h2>
          </div>
        </div>
      )}

      {popup.type === "Finish" && <PopWinner isOpen={popup.isOpen} />}
    </div>
  );
};

export default Gamepage;
