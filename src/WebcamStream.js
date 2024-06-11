import React, { useState, useRef, useEffect, useCallback } from 'react';
import WebcamCaptureForm from './WebcamCaptureForm';
import { sendImageToBackend } from './SendPicture';
import { fetchIfFolderExists } from './api/FetchIfFolderExists';
import { fetchAllFolders } from './api/FetchAllFolders';

const WebcamCapturePicture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folders, setFolders] = useState([]);
  const [folderIsNull, setFolderIsNull] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Ref to store the latest selectedFolder value
  const selectedFolderRef = useRef(selectedFolder);

  useEffect(() => {
    selectedFolderRef.current = selectedFolder;
  }, [selectedFolder]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F2') {
        startCountdown();
        event.preventDefault(); // Prevent the default action (opening help in most browsers)
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const capturePicture = useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (imgSrc) {
      saveImageAndShowPicture();
    }
  }, [imgSrc]);

  const handleShowImage = () => {
    setShowImage(true);
    setTimeout(() => setShowImage(false), 5000);
  };

  const saveImageAndShowPicture = async () => {
    try {
      const exists = await fetchIfFolderExists(selectedFolder);
      await sendImageToBackend(selectedFolder, imgSrc);
  
      if (!exists) {
        setFolders((prevFolders) => [...prevFolders, selectedFolder]);       
      }
      setSelectedFolder('');
      setFolderIsNull(false);
      handleShowImage();
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
    if (selectedFolderRef.current !== '') {
      setFolderIsNull(false);
      setCountdown(5);
      setIsCountingDown(true);
    } else {
      setFolderIsNull(true);
    }
  };

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      capturePicture();
      setIsCountingDown(false);
    }
  }, [isCountingDown, countdown, capturePicture]);

  return (
    <WebcamCaptureForm
      selectedFolder={selectedFolder}
      folderIsNull={folderIsNull}
      handleFolderChange={handleFolderChange}
      folders={folders}
      startCountdown={startCountdown}
      isCountingDown={isCountingDown}
      countdown={countdown}
      webcamRef={webcamRef}
      showImage={showImage}
      imgSrc={imgSrc}
    />
  );
};

export default WebcamCapturePicture;
