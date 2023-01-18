import ImageGenerator from "containers/ImageGenerator";
import Auth from "containers/Auth";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ImageGenerator />
      <Auth />
    </div>
  );
}

export default App;
