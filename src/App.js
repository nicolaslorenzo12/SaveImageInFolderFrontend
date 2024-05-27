import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamCapture from "./WebcamStream";

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebcamCapture />}>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  };
  
  export default App;