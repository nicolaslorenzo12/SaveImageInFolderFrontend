import { useState, useEffect } from 'react';
import { fetchLastFiveImages } from '../api/FetchLast5Images.js';

export const useFiveLastImages = (selectedFolder, imageWasAdded) => {

  const [showLastFiveImages, setShowLastFiveImages] = useState(false);
  const [lastFiveImages, setLastFiveImages] = useState([]);

  useEffect(() => {
    const getLastFiveImagesIfThereAreFiveOrMore =  async() => {
      
      if(selectedFolder !== ''){
      const images = await fetchLastFiveImages(selectedFolder);

      if(images.length >=5){
        setLastFiveImages(images);
        setShowLastFiveImages(true);
      }
      else{
        setShowLastFiveImages(false);
        setLastFiveImages([]);
      }
    }
    };
    getLastFiveImagesIfThereAreFiveOrMore();
  }, [selectedFolder, imageWasAdded]);

  return { showLastFiveImages,lastFiveImages };
}