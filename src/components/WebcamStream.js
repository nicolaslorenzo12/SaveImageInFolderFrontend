import React, { useState, useRef, useEffect, useCallback } from 'react';
import WebcamCaptureForm from './WebcamCaptureForm';
import { useFolders } from '../hooks/UseFolders';
import { useCountdown } from '../hooks/UseCountdown';

const WebcamCapturePicture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showStream, setShowStream] = useState(true);
  const [readyToSave, setReadyToSave] = useState(false);
  const [showButtons, setShowButtons] = useState(false)

  const { folders, folderIsNull, setFolderIsNull, saveImage } = useFolders(selectedFolder);
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
    setShowStream(false);
    // setTimeout(() => {
    //   setShowImage(false);
    //   setShowStream(true); // Show the stream after hiding the image
    // }, 5000);
    setShowButtons(true);
  }, []);

  useEffect(() => {
    const addImage = async () => {
      if (imgSrc && readyToSave) {
        await saveImage(imgSrc, handleShowImage);
        handleShowImage();
        setSelectedFolder('');
        setReadyToSave(false);
      }
    };

    addImage();
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
      showStream={showStream}
      showButtons={showButtons}
    />
  );
};

export default WebcamCapturePicture;