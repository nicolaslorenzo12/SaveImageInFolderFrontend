import { useState, useEffect } from 'react';
import { fetchIfFolderExists } from '../api/FetchIfFolderExists';
import { fetchAllFolders } from '../api/FetchAllFolders';
import { sendImageToBackend } from '../utils/SendPicture.js';

export const useFolders = (selectedFolder) => {
  const [folders, setFolders] = useState([]);
  const [folderIsNull, setFolderIsNull] = useState(false);

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

  const saveImageAndShowPicture = async (imageSrc) => {
    try {
      const exists = await fetchIfFolderExists(selectedFolder);
      await sendImageToBackend(selectedFolder, imageSrc);

      if (!exists) {
        setFolders((prevFolders) => [...prevFolders, selectedFolder]);
      }
    } catch (error) {
      console.error('Error checking or adding folder:', error);
    }
  };

  return {
    folders,
    folderIsNull,
    setFolderIsNull,
    saveImageAndShowPicture,
  };
};