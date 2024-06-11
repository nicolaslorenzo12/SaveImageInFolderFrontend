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