import { Stack, Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { colors } from "../constants/colors";
import Category from "../category/category";
import Videos from "../videos/videos";
import { apiservice } from "../../service/api.service";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const SelectedCategoryHandler = (category) => setSelectedCategory(category);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiservice.fetching(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items || []); // Agar `items` bo'sh bo'lsa, xato bermasligi uchun
      } catch (error) {
        console.error("API xatosi:", error);
      }
    };

    getData();
  }, [selectedCategory]);

  return (
    <Stack>
      <Category
        SelectedCategoryHandler={SelectedCategoryHandler}
        selectedCategory={selectedCategory}
      />
      <Box p={2} sx={{ height: "98vh" }}>
        <Container maxWidth="90%">
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {selectedCategory}{" "}
            <span style={{ color: colors.secondary }}>videos</span>
          </Typography>
          <Videos videos={videos} />
        </Container>
      </Box>
    </Stack>
  );
};

export default Home;
