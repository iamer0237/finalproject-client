import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles.css";
var imageCapture;
 const TakePhoto = () =>{
  const [mounted, setMounted] = useState(false);
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [enfoque, setEnfoque] = useState(null);
  const [urlDownload, setUrlDownload] = useState(null);
  const [phtoSize, setPhotoSize] = useState(null);
  const [copied, setCopied] = useState(false);

  console.log("webcamRef", webcamRef);
  console.log("canvasRef", canvasRef);

  useEffect(() => {
    if ("current" in webcamRef && "current" in canvasRef) {
      if (webcamRef.current && canvasRef.current) {
        console.log("webcamRef.current.srcObject", webcamRef.current.srcObject);
        setMounted(true);
      }
    }
  }, [webcamRef, canvasRef]);

  useEffect(() => {
    if (mounted) {
      mediaDevicesChrome();
    }
  }, [mounted]);

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleBlobToBase64 = async (blob) => {
    const base64 = await blobToBase64(blob);
    setImgSrc(base64);

  };

  function mediaDevices() {
    const input = inputRef.current;
    var constraints = {
      video: {
        facingMode: "environment"
      },
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = webcamRef.current;
        video.srcObject = mediaStream;

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        console.log("imageCapture", imageCapture);

        return imageCapture.getPhotoCapabilities();
      })
      .then((photoCapabilities) => {
        
        console.log("photoCapabilities", photoCapabilities);

        input.min = photoCapabilities.imageWidth.min;
        input.max = photoCapabilities.imageWidth.max;
        input.step = photoCapabilities.imageWidth.step;
        input.value = 320;
      })
      .catch((error) => console.log("Argh!", error));
  }

  const getMedia = async () => {
    try {
      var constraints = {
        video: {
          facingMode: "environment"
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = webcamRef.current;
      video.srcObject = stream;

      const [track] = stream.getVideoTracks();
      imageCapture = new ImageCapture(track);

      const capabilities = track.getCapabilities();
      const settings = track.getSettings();

      // Check whether focus distance is available or not.
      if (!capabilities.focusDistance) {
        alert("focus distance is not available");
        return false;
      }

      try {
        await track.applyConstraints({
          //focusMode: "manual",
          focusMode: "auto"
          //focusDistance: input.value
        });
      } catch (err) {
        alert("applyConstraints() failed: ");
        console.error("applyConstraints() failed: ", err);
      }

    } catch (err) {
      console.error(err);
    }
  };

  async function takePhoto() {
    try {
      const blob = await imageCapture.takePhoto();
      console.log("Photo taken: " + blob.type + ", " + blob.size + "B");

      const url = URL.createObjectURL(blob);
      setUrlDownload(url);
    } catch (err) {
      console.error("takePhoto() failed: ", err);
    }
  }

  function mediaDevicesChrome() {
    const input = inputRef.current;
    var constraints = {
      video: {
        facingMode: "environment"
      },
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = webcamRef.current;
        video.srcObject = mediaStream;

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        console.log("imageCapture", imageCapture);

        return imageCapture.getPhotoCapabilities();
      })
      .then((photoCapabilities) => {
        

        console.log("photoCapabilities", photoCapabilities);

        input.min = photoCapabilities.imageWidth.min;
        input.max = photoCapabilities.imageWidth.max;
        input.step = photoCapabilities.imageWidth.step;

        return imageCapture.getPhotoSettings();
      })
      .then((photoSettings) => {
        console.log("photoSettings", photoSettings);
        input.value = photoSettings.imageWidth;
      })
      .catch((error) => console.log("Argh!", error));
  }

  function onTakePhotoButtonClick() {
    const input = inputRef.current;
    console.log("input.value", input.value);
    imageCapture
      .takePhoto()
      .then((blob) => {
        handleBlobToBase64(blob);
        const url = URL.createObjectURL(blob);
      console.log("url", url);
        setUrlDownload(url);
        return createImageBitmap(blob);
      })
      .then((imageBitmap) => {
        drawCanvas(imageBitmap);
        console.log(`ImageBitmap ${imageBitmap}`);
        console.log(`Photo size is ${imageBitmap.width}x${imageBitmap.height}`);
        setPhotoSize(
          `Photo size is ${imageBitmap.width}x${imageBitmap.height}`
        );
      })
      .catch((error) => console.log(error));
  }

 

  function drawCanvas(img) {
    const canvas = canvasRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);

    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas
      .getContext("2d")
      .drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * ratio,
        img.height * ratio
      );
  }

  return (
    <div className="webcam-capture">
      <div className="webcam-capture__content">
        <video ref={webcamRef} id="webcam" autoPlay playsInline></video>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem"
            }}
          >
            <input type="range" ref={inputRef} />
            <span>{enfoque}</span>
          </div>
        </div>
        <div style={{ display: "flex", margin: "1rem", paddingBottom: "2rem" }}>
          <button
            id="takePhotoButton"
            className="take-photo"
            onClick={() => onTakePhotoButtonClick()}
          >
            Take Photo
          </button>

          {/* {imgSrc && <img src={imgSrc} />} */}
          {urlDownload && (
            <a className="button" href={urlDownload} download="capture.jpeg">
              Save
            </a>
          )}
          
        </div>

        {/* {imgSrc && (
          <CopyToClipboard text={imgSrc} onCopy={() => setCopied(true)}>
            <button>Copy to clipboard with button</button>
          </CopyToClipboard>
        )} */}

        {/* {copied ? <span style={{ color: "red" }}>Copied.</span> : null} */}

        <canvas ref={canvasRef}></canvas>

        {/* {imgSrc && <img src={imgSrc} />} */}
      </div>
    </div>
  );
}
export default TakePhoto
