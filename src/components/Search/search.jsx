import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Videos from "../videos/videos";
import { apiservice } from "../../service/api.service";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiservice.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  return (
    <Box p={2} sx={{ height: "90vh" }}>
      <Container maxWidth="90%">
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Search results for <span style={{ color: "#76323f" }}>{id}</span>{" "}
          videos
        </Typography>
        {/* Videos component (videos prop bilan) */}
        <Videos videos={videos} />
      </Container>
    </Box>
  );
};

export default Search;
