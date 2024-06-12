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
  const [showButtons, setShowButtons] = useState(false);
  const [showSavedImageMessage, setShowSavedImageMessage] = useState(false);

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

  const capturePicture = async() => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    toggleShowImageShowStreamAndShowButtons();
  };

  const toggleShowImageShowStreamAndShowButtons = () => {
   if(showImage){
    setShowImage(false);
    setShowStream(true);
    setShowButtons(false);
    setSelectedFolder('');
   }
   else{
    setShowImage(true);
    setShowStream(false);
    setShowButtons(true);
   }
  };

  const setImageToBeSaved = () =>{
    setReadyToSave(true);
  }

  useEffect(() => {
    const addImage = async () => {
      if (imgSrc && readyToSave) {
        await saveImage(imgSrc);
        setShowImage(true);
        toggleShowImageShowStreamAndShowButtons();
        setReadyToSave(false);
        showSavedImageMessageFor5Seconds();
      }
    };

    addImage();
  }, [readyToSave]);

  const showSavedImageMessageFor5Seconds = () =>{
    setShowSavedImageMessage(true);

    setTimeout(() => {
        setShowSavedImageMessage(false);
    }, 5000);
  }

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
      setImageToBeSaved={setImageToBeSaved}
      toggleShowImageShowStreamAndShowButtons={toggleShowImageShowStreamAndShowButtons}
      showSavedImageMessage={showSavedImageMessage}
    />
  );
};

export default WebcamCapturePicture;