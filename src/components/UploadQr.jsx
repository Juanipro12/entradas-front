import React, { useRef } from "react";
import axios from "axios";

const UploadQr = () => {
  const videoRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const binaryData = await getBinaryDataFromFile(file);
        const data = new Uint8Array(binaryData);
        const buffer = data.buffer;
        const base64String = btoa(
          String.fromCharCode.apply(null, new Uint8Array(buffer))
        );
        console.log(base64String);
        const response = await axios.post(
          `${import.meta.env.VITE_URI_API}api/usar-entrada`,
          { qrCode: base64String }
        );
        console.log(response);
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
      }
    }
  };

  const getBinaryDataFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara:", error);
      });
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={startCamera}>Iniciar Cámara</button>
      <button onClick={stopCamera}>Detener Cámara</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadQr;
