import PropTypes from "prop-types";
import { Stack, Box, } from "@mui/material";
import VideoCard from "../video-card/video-card";
import Channelcard from "../channel-card/channel-card";
import Loader from "../loader/loader"; // ✅ Loader komponenti qo‘shildi

const Videos = ({ videos = [] }) => {
  if (!videos.length) {
    return <Loader />; // ✅ Agar video bo‘lmasa, Loader chiqariladi
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
      {videos?.map((item) => (
        <Box key={item.id?.videoId || item.id?.channelId}>
          {item.id?.videoId && <VideoCard video={item} />}
          {item.id?.channelId && <Channelcard video={item} />}
        </Box>
      ))}
    </Stack>
  );
};

// ✅ **PropTypes qo‘shildi**
Videos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string,
        channelId: PropTypes.string,
      }),
      snippet: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        publishedAt: PropTypes.string,
        channelTitle: PropTypes.string,
        thumbnails: PropTypes.shape({
          high: PropTypes.shape({
            url: PropTypes.string,
          }),
        }),
      }),
    })
  ),
};

export default Videos;
