import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Gamepage.css";
import { DataContentContext } from "./DataContentContext";

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
  const [remainingImages, setRemainingImages] = useState([]);
  const { datacontent } = useContext(DataContentContext);

  const queryParams = new URLSearchParams(location.search);
  const initialRound = parseInt(queryParams.get("round"), 10) || 0;
  const [ roundall ] = useState(initialRound);
  const [round, setRound] = useState(1);
  const id = queryParams.get("id")

  const [imageLinks, setImageLinks] = useState([]);
  const [popup, setPopup] = useState({ type: null, isOpen: false });
  const openPopup = (type) => setPopup({ type, isOpen: true });

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (id) {
      const content = datacontent.find(item => item._id === id);
      if (content && content.images && content.images.length > 0) {
        const shuffledImages = shuffleArray(content.images);
        setImageLinks([shuffledImages[0], shuffledImages[1]]);
        setRemainingImages(shuffledImages.slice(2));
        setRound(1);
      } 
    }
  }, [id, datacontent]);

  const handleSelect = (image) => {
    if (round === roundall - 1) {
      setImageLinks([image]);
    } else {
      const selectedIndex = imageLinks.indexOf(image);
      const shuffled = shuffleArray(remainingImages);
      const newOpponent = shuffled.length > 0 ? shuffled[0] : null;
  
      if (newOpponent) {
        const newImageLinks = selectedIndex === 0
          ? [image, newOpponent]
          : [newOpponent, image];
  
        setImageLinks(newImageLinks);
        setRemainingImages(shuffled.slice(1));
      }
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

      {round <= roundall-1 &&
      <div>
        <h1>Which one wins?</h1>
        <p className="round-info">
          <span>Round of {roundall-1}</span>
          <span style={{ marginLeft: "10px", color: "#33FF00" }}>{round}</span>
          <span>/{roundall-1}</span>
        </p>
      </div>
      }
      

      {imageLinks.length >= 2 && (
        <div className="image-grid">
          <div className="image-container">
            <img
              src={imageLinks[0].image}
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
              src={imageLinks[1].image}
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
          <h2>1st Winner!🏅</h2>
          <img src={imageLinks[0].image} alt={imageLinks[0].name} style={{ width: "500px", height: "400px" }} />
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
