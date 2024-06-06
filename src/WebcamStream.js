import React, { useState, useRef,useEffect, useCallback } from 'react';
import { sendImageToBackend } from './SendPicture';
import { fetchIfFolderExists } from './api/FetchIfFolderExists';
import { fetchAllFolders } from './api/FetchAllFolders';
import '../src/style/style.css'
import Webcam from "react-webcam"

const WebcamCapturePicture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folders, setFolders] = useState([]);
  const [folderIsNull, setFolderIsNull] = useState(false)
  const [showImage, setShowImage] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false)

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const capture = useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (imgSrc) {
      takePictureIfFolderNotNull();
    }
  }, [imgSrc]);

  const handleShowImage = () =>{
    setShowImage(true);
    setTimeout(() => setShowImage(false), 5000);
  }

  const saveImageAndShowPicture = async() =>{
    const exists = await fetchIfFolderExists(selectedFolder);
    await sendImageToBackend(selectedFolder, imgSrc);

    if (!exists) {
      setFolders(prevFolders => [...prevFolders, selectedFolder]);       
    }
    setSelectedFolder('');
    setFolderIsNull(false);
    handleShowImage();
  }

  const takePictureIfFolderNotNull = async () => {
    try {

      if(selectedFolder === ''){
          setFolderIsNull(true);
      }
      else{
        await saveImageAndShowPicture()
    }
    } catch (error) {
      console.error('Error checking or adding folder:', error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await fetchAllFolders();
        setFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []); 

  const startCountdown = () => {
    setCountdown(5);
    setIsCountingDown(true);
  };

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      capture();
      setIsCountingDown(false);
    }
  }, [isCountingDown, countdown, capture]);

  return (
    <div>
      <h1>Webcam Capture</h1>
      <label htmlFor="dropdown">Choose existing folder:</label>
      <div>
        <input
          list="options"
          id="dropdown"
          value={selectedFolder}
          onChange={handleFolderChange}
          autoComplete="off"
        />
        {folderIsNull && <p id="folder-is-null">Folder cannot be null</p>}
      </div>
      <datalist id="options">
        {folders.map((folder, index) => (
          <option key={index} value={folder} />
        ))}
      </datalist>
      <button onClick={startCountdown}>Capture photo</button>
      {isCountingDown && <div>Taking photo in: {countdown} seconds</div>}
      <Webcam ref={webcamRef} />
      {showImage && (
        <div>
          <img src={imgSrc} alt="" />
        </div>
      )}
    </div>
  );
}

export default WebcamCapturePicture;
