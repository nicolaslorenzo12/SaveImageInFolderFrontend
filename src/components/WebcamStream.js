import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from "react-webcam";
import WebcamCaptureForm from './WebcamCaptureForm';
import { useFolders } from '../hooks/UseFolders';
import { useCountdown } from '../hooks/UseCountdown';
import { useFiveLastImages } from '../hooks/UseFiveLastImages';

const WebcamCapturePicture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showStream, setShowStream] = useState(true);
  const [readyToSave, setReadyToSave] = useState(false);
  const [imageWasAdded, setImageWasAdded] = useState(false);
  const [showInputFolder, setShowInputFolder] = useState(true);  

  const { folders, folderIsNull, setFolderIsNull, saveImage } = useFolders(selectedFolder);
  const { countdown, isCountingDown, startCountdown } = useCountdown(5, async () => await capturePicture());
  const {showLastFiveImages, lastFiveImages} = useFiveLastImages(selectedFolder, imageWasAdded);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F2') {
        startCountdownIfSelectedFolderNotNull();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFolder]);

  const startCountdownIfSelectedFolderNotNull = () => {
    if (selectedFolder !== '') {
      setFolderIsNull(false);
      startCountdown();
    } else {
      setFolderIsNull(true);
    }
  };

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const capturePicture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setReadyToSave(true);
  }, []);

  const handleShowImage = useCallback(() => {
    setShowImage(true);
    setShowStream(false);
    setTimeout(() => {
      setShowImage(false);
      setShowStream(true); // Show the stream after hiding the image
    }, 5000);
  }, []);


  const handleBlur = async () => {
    setShowInputFolder(false);
  };

  useEffect(() => {
    const addImage = async () => {
      if (imgSrc && readyToSave) {
        await saveImage(imgSrc, handleShowImage);
        setImageWasAdded(true);
        handleShowImage();
        setReadyToSave(false);
      }
    };

    addImage();
    setImageWasAdded(false);
  }, [readyToSave]);

  const videoConstraints = {
    width: { ideal: 4096 },
    height: { ideal: 2160 },
    facingMode: "user"
  };

  return (
    <WebcamCaptureForm
      selectedFolder={selectedFolder}
      folderIsNull={folderIsNull}
      handleFolderChange={handleFolderChange}
      folders={folders}
      startCountdownWhenClickingButtonIfSelectedFolderNotNull={startCountdownIfSelectedFolderNotNull}
      isCountingDown={isCountingDown}
      countdown={countdown}
      webcamRef={webcamRef}
      showImage={showImage}
      imgSrc={imgSrc}
      showStream={showStream}
      showLastFiveImages={showLastFiveImages}
      lastFiveImages={lastFiveImages}
      handleBlur={handleBlur}
      showInputFolder={showInputFolder}
    >
      {showStream && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          onUserMediaError={(error) => console.error('Webcam error:', error)}
        />
      )}
    </WebcamCaptureForm>
  );
};

export default WebcamCapturePicture;
