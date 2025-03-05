import PropTypes from "prop-types";
import { Stack, Box } from "@mui/material";
import VideoCard from "../video-card/video-card";
import Channelcard from "../channel-card/channel-card";
import Loader from "../loader/loader";

const Videos = ({ videos = [] }) => {
  if (videos.length === 0) {
    return <Loader />;
  }

  return (
    <Stack
      width={"100%"}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={2}
    >
      {videos.map((item) => (
        <Box key={item.id?.videoId || item.id?.channelId}>
          {item.id?.videoId && <VideoCard video={item} />}
          {item.id?.channelId && <Channelcard video={item} />}
        </Box>
      ))}
    </Stack>
  );
};

Videos.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default Videos;
