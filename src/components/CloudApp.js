import react, { useState } from "react";
import Img from "./Img";
import axios from "axios";
import "../App.css";

const CloudApp = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
  }    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:4000/", {
        image: image,
      });
      const uploadedImage = result.data.url;
      console.log(result.data.url);
      setUploadedImage(uploadedImage);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container mt-5 align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fileInput">Upload</label>
          <input
            type="file"
            id="fileInput"
            onClick={(e) => handleChange(e)}
            
          />
          <button className="btn btn-primary"></button>
        </form>
      </div>
      <img src={image} alt="" />
      <Img uploadedImg={uploadedImage} />
    </>
  );
};
export default CloudApp;
