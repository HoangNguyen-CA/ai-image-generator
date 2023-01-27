import ImageGenerator from "containers/ImageGenerator";
import User from "containers/User";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout";
import RequireAuth from "components/RequireAuth";
import Profile from "containers/Profile";

function App() {
  return (
    <>
      <CssBaseline />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ImageGenerator />} />
          <Route element={<RequireAuth />}>
            <Route path="/saved" element={<User />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
