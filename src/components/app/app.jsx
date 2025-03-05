import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Channel from "../channel/channel";
import Navbar from "../navbar/navbar";
import VideoDetail from "../video-detail/video-detail";
import Search from "../search/search";
import Category from "../category/category";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </Box>
  );
};

export default App;
