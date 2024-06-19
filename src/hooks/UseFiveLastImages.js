import { useState, useEffect, useRef } from 'react';
import { fetchLastFiveImages } from '../api/FetchLast5Images.js';

export const useFiveLastImages = (selectedFolder, imageWasAdded) => {
  const [showLastFiveImages, setShowLastFiveImages] = useState(false);
  const [lastFiveImages, setLastFiveImages] = useState([]);
  const currentFolderRef = useRef('');

  useEffect(() => {
    const getLastFiveImagesIfThereAreFiveOrMore = async () => {
      if (selectedFolder && (selectedFolder !== currentFolderRef.current || imageWasAdded)) {
        console.log(imageWasAdded);
        const images = await fetchLastFiveImages(selectedFolder);

        setLastFiveImages(images);
        setShowLastFiveImages(images.length >= 5);

        if (selectedFolder !== currentFolderRef.current) {
          currentFolderRef.current = selectedFolder;
        }
      }
    };

    getLastFiveImagesIfThereAreFiveOrMore();
  }, [selectedFolder, imageWasAdded]);

  return { showLastFiveImages, lastFiveImages };
};
