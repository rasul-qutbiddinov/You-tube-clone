/* eslint-disable no-unused-vars */
import { Box, Typography, Stack, Avatar, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiservice } from "../../service/api.service";
import Videos from "../videos/videos";

const Channel = () => {
  const { channelId } = useParams();
  const [channelDetail, setChannelDetail] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    const getChannelData = async () => {
      try {
        // ✅ Kanalning ma'lumotlarini olish
        const channelData = await apiservice.fetching(`channels`, {
          part: "snippet,statistics",
          id: channelId,
        });
        setChannelDetail(channelData?.items?.[0] || {});

        // ✅ Kanalning videolarini olish
        const videosData = await apiservice.fetching(`search`, {
          channelId: channelId,
          part: "snippet,id",
          order: "date",
          maxResults: 20,
        });
        setChannelVideos(videosData?.items || []);
      } catch (error) {
        console.log("Error fetching channel data:", error);
      }
    };

    getChannelData();
  }, [channelId]);

  const { snippet = {}, statistics = {} } = channelDetail;
  const {
    title = "Channel Name",
    description = "No description available",
    thumbnails = {},
  } = snippet;
  const { subscriberCount = 0, videoCount = 0, viewCount = 0 } = statistics;

  return (
    <Box minHeight="90vh" mb={10}>
      {/* ✅ Kanalning ma'lumotlari */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={5}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Avatar
          src={thumbnails?.high?.url || "/default-avatar.png"}
          alt={title}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="gray">
          {parseInt(subscriberCount).toLocaleString()} subscribers •{" "}
          {parseInt(viewCount).toLocaleString()} views •{" "}
          {parseInt(videoCount).toLocaleString()} videos
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          maxWidth="600px"
          sx={{ opacity: 0.8, mt: 2 }}
        >
          {description}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ✅ Kanalning videolari */}
      <Box p={2}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Latest Videos
        </Typography>
        <Videos videos={channelVideos} />
      </Box>
    </Box>
  );
};

export default Channel;
