import React from 'react';
import Webcam from "react-webcam"
import '../style/style.css'

const WebcamCaptureForm = ({
  selectedFolder,
  folderIsNull,
  handleFolderChange,
  folders,
  startCountdownWhenClickingButtonIfSelectedFolderNotNull,
  isCountingDown,
  countdown,
  webcamRef,
  showImage,
  imgSrc,
  showStream,
  showButtons,
  setImageToBeSaved,
}) => {
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
      <button onClick={startCountdownWhenClickingButtonIfSelectedFolderNotNull}>Capture photo</button>
      {isCountingDown && <div id='counter'>{countdown}</div>}
      <div>
        {showStream && <Webcam ref={webcamRef} />}
      </div>
      {showImage && (
        <div>
          <img src={imgSrc} alt="" />
        </div>
      )}
      <div id="buttons-to-save-or-discard-image">
        {showButtons && <button onClick={setImageToBeSaved} id="save-image-button">Save image</button>}
        {showButtons && <button id="discard-image-button">Discard image</button>}
      </div>
    </div>
  );
};

export default WebcamCaptureForm;