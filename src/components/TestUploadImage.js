import React, { useState } from "react";
import axios from "axios";
import "/..App.css";
const Upload = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", ibc21Images);
    formData.append("file", files);
    setLoading(true);
    axios
      .post(formData)
      .then((res) => res.data.url)
      .then(setLoading(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="file" name="image" onClick={uploadImage} />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <img className="settings-image" src={image} />
      )}
    </div>
  );
};
export default Upload;
