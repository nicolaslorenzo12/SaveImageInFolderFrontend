import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamCapturePicture from "./WebcamStream";

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebcamCapturePicture />}>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  };
  
  export default App;



// import React, { useState, useEffect } from 'react';
// import usbDetect from 'usb-detection';

// const App = () => {
//   const [buttonPressed, setButtonPressed] = useState(false);

//   useEffect(() => {
//     // Start USB device detection
//     usbDetect.startMonitoring();

//     // Add event listener for USB device connection
//     usbDetect.on('add', (device) => {
//       // Check if the connected device is your USB button
//       if (device.vendorId ===  0x5131 && device.productId === 0x2019) {
//         // Handle USB button connection
//         console.log('USB button connected');
//         // Subscribe to button press events
//         device.on('data', (data) => {
//           // Check if the received data indicates a button press
//           if (data[0] === 1) {
//             setButtonPressed(true);
//           }
//         });
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       usbDetect.stopMonitoring();
//     };
//   }, []);

//   return (
//     <div>
//       {buttonPressed ? <p>Button pressed</p> : <p>Button not pressed</p>}
//     </div>
//   );
// };

// export default App;