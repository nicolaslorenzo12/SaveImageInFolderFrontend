import React, { useState, useEffect } from 'react';
import { sendImageToBackend } from './SendPicture';
import { fetchIfFolderExists } from './api/FetchIfFolderExists';

const WebcamCapture = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folders, setFolders] = useState([]);
  const base64Image = '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';

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleSendImage = async () => {
    try {
      const exists = await fetchIfFolderExists(selectedFolder);
      await sendImageToBackend(selectedFolder, base64Image);

      if (!exists) {
        setFolders(prevFolders => [...prevFolders, selectedFolder]);       
      }
      setSelectedFolder('');
    } catch (error) {
      console.error('Error checking or adding folder:', error);
    }
  };

  useEffect(() => {
    // Function to fetch folder options from API
    const fetchFolders = async () => {
      try {
        const response = await fetch('https://localhost:7017/api/Folder'); // Adjust the API endpoint as necessary
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []); 

  return (
    <div>
      <h1>Webcam Capture</h1>
      <label htmlFor="dropdown">Choose existing folder:</label>
      <input 
        list="options" 
        id="dropdown" 
        value={selectedFolder} 
        onChange={handleFolderChange}
      />
      <datalist id="options">
        {folders.map((folder, index) => (
          <option key={index} value={folder} />
        ))}
      </datalist>
      <button onClick={handleSendImage}>Send Image to Backend</button>
    </div>
  );
}

export default WebcamCapture;
