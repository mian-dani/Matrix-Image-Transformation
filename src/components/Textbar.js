import "./Textbar.css";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Textbar = () => {
  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Method to handle enter-key press
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      generateImage();
    }
  };

  // Method to generate image
  const generateImage = async () => {
    setLoading(true);
    const imageParameters = {
      prompt: userPrompt,
      n: 1,
      size: "256x256",
    };
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    console.log(urlData);
    setImageUrl(urlData);
    setLoading(false);
  };

  //// Transformation functions

  const rotate = () => {
    const rotate = document.getElementById("genImage");
    rotate.style.transform = "rotate(90deg)";
  };

  const zoom = () => {
    const zom = document.getElementById("genImage");
    zom.style.scale(1.5);
  };

  // Returning TextBar.js
  return (
    <section className="textSection">
      <div className="textBar">
        <input
          type="text"
          placeholder="Enter text..."
          className="inputBar"
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="messageButton" onClick={() => generateImage()}>
          <img src="/message.png" alt="" className="message" />
        </button>
      </div>
      <div className="generateImage">
        {loading ? (
          <div className="reactSpinner">
            <PacmanLoader size={40} color="#36D6B7" />
            <audio src="./loading-audio.mp3" autoPlay loop />
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} className="image" id="genImage" alt="AI Thing" />
        ) : (
          <img
            src="/no-connection.png"
            className="image"
            alt="no-connection"
            height={30}
            width={30}
          />
        )}
      </div>
      {/* <div className="buttonsMainDiv"> */}
      <div className="btnDiv">
        <button className="btn" id="rotateBtn" onClick={rotate}>
          Rotate
        </button>
        <button className="btn" onClick={zoom}>
          Zoom
        </button>
        <button className="btn">Reflect</button>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Textbar;
