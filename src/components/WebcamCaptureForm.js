// import React from 'react';
// import Webcam from "react-webcam"
// import '../style/style.css'

// const WebcamCaptureForm = ({
//   selectedFolder,
//   folderIsNull,
//   handleFolderChange,
//   folders,
//   startCountdownWhenClickingButtonIfSelectedFolderNotNull,
//   isCountingDown,
//   countdown,
//   webcamRef,
//   showImage,
//   imgSrc,
//   showStream,
//   showLastFiveImages,
//   lastFiveImages,
// }) => {
//   return (
//     <div>
//       <h1>Webcam Capture</h1>
//       <label htmlFor="dropdown">Choose existing folder:</label>
//       <div>
//         <input
//           list="options"
//           id="dropdown"
//           value={selectedFolder}
//           onChange={handleFolderChange}
//           autoComplete="off"
//         />
//         {folderIsNull && <p id="folder-is-null">Folder cannot be null</p>}
//       </div>
//       <datalist id="options">
//         {folders.map((folder, index) => (
//           <option key={index} value={folder} />
//         ))}
//       </datalist>
//       <button onClick={startCountdownWhenClickingButtonIfSelectedFolderNotNull}>Capture photo</button>
//       {isCountingDown && <div id='counter'>{countdown}</div>}
//       <div>
//         {showStream && <Webcam ref={webcamRef} />}
//       </div>
//       {showImage && (
//         <div>
//           <img src={imgSrc} alt="" />
//         </div>
//       )}

//       <div id="last-five-images">
//         {showLastFiveImages && lastFiveImages.map((image, index) => (
//           <img key={index} src={`data:image/jpeg;base64,${image.data}`} alt={`Captured ${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WebcamCaptureForm;










import React from 'react';
import Webcam from "react-webcam";
import '../style/style.css';

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
  showLastFiveImages,
  lastFiveImages,
}) => {
  return (
    <div>
      <h1>Photo-Book</h1>
      <label htmlFor="dropdown">Choose folder:</label>
      <div id="dropdown-container">
        <input
          list="options"
          id="dropdown"
          value={selectedFolder}
          onChange={handleFolderChange}
          autoComplete="off"
        />
      </div>
      {folderIsNull && <p id="folder-is-null">Folder cannot be null</p>}
      <datalist id="options">
        {folders.map((folder, index) => (
          <option key={index} value={folder} />
        ))}
      </datalist>
      <div id="button-container">
        <button onClick={startCountdownWhenClickingButtonIfSelectedFolderNotNull}>Capture photo</button>
      </div>
      {isCountingDown && <div id='counter'>{countdown}</div>}
      <div id="webcam-container">
        {showStream && <Webcam ref={webcamRef} />}
      </div>
      {showImage && (
        <div id="captured-image">
          <img src={imgSrc} alt="Captured" />
        </div>
      )}

      <div id="last-five-images-container">
        <div id="last-five-images">
          {showLastFiveImages && lastFiveImages.map((image, index) => (
            <img key={index} src={`data:image/jpeg;base64,${image.data}`} alt={`Captured ${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebcamCaptureForm;
