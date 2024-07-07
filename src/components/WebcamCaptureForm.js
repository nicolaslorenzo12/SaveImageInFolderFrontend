// import React from 'react';
// import Webcam from "react-webcam";
// import '../style/style.css';

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
//       <h1>Photo-Book</h1>
//       <label htmlFor="dropdown">Choose folder:</label>
//       <div id="dropdown-container">
//         <input
//           list="options"
//           id="dropdown"
//           value={selectedFolder}
//           onChange={handleFolderChange}
//           autoComplete="off"
//         />
//       </div>
//       {folderIsNull && <p id="folder-is-null">Folder cannot be null</p>}
//       <datalist id="options">
//         {folders.map((folder, index) => (
//           <option key={index} value={folder} />
//         ))}
//       </datalist>
//       <div id="button-container">
//         <button onClick={startCountdownWhenClickingButtonIfSelectedFolderNotNull}>Capture photo</button>
//       </div>
//       {isCountingDown && <div id='counter'>{countdown}</div>}
//       <div id="webcam-container">
//         {showStream && <Webcam ref={webcamRef} />}
//       </div>
//       {showImage && (
//         <div id="captured-image">
//           <img src={imgSrc} alt="Captured" />
//         </div>
//       )}

//       <div id="last-five-images-container">
//         <div id="last-five-images">
//           {showLastFiveImages && lastFiveImages.map((image, index) => (
//             <img key={index} src={`data:image/jpeg;base64,${image.data}`} alt={`Captured ${index}`} />
//           ))}
//         </div>
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
  videoConstraints,
  handleBlur,
  showInputFolder
}) => {
  return (
    <div>
      <h1>Photo-Book</h1>
      {showInputFolder && <label htmlFor="dropdown">Choose folder:</label> }
      <div id="dropdown-container">
      {showInputFolder && (
        <input
          list="options"
          id="dropdown"
          value={selectedFolder}
          onChange={handleFolderChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      )}
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
        {showStream && <Webcam ref={webcamRef} videoConstraints={videoConstraints} />} {/* Apply videoConstraints here */}
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
