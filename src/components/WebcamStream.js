import React, { useState, useRef, useEffect, useCallback } from 'react';
import WebcamCaptureForm from './WebcamCaptureForm';
import { useFolders } from '../hooks/UseFolders';
import { useCountdown } from '../hooks/UseCountdown';

const WebcamCapturePicture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [readyToSave, setReadyToSave] = useState(false);

  const { folders, folderIsNull, setFolderIsNull, saveImageAndShowPicture } = useFolders(selectedFolder);
  const { countdown, isCountingDown, startCountdown } = useCountdown(5, async () => await capturePicture());

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
    const imageSrc = await webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setReadyToSave(true);
  }, []);

  const handleShowImage = useCallback(() => {
    setShowImage(true);
    setTimeout(() => setShowImage(false), 5000);
  }, []);

  useEffect(() => {
    const saveImage = async () => {
      if (imgSrc && readyToSave) {
        await saveImageAndShowPicture(imgSrc, handleShowImage);
        handleShowImage();
        setSelectedFolder('');
        setReadyToSave(false);
      }
    };

    saveImage();
  }, [readyToSave]);

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
    />
  );
};

export default WebcamCapturePicture;