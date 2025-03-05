/* eslint-disable no-unused-vars */
import { Box, Chip, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { apiservice } from "../../service/api.service";
import TagIcon from "@mui/icons-material/Tag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiservice.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data.items[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  const { snippet = {}, statistics = {} } = videoDetail || {};
  const {
    title = "",
    channelId = "",
    channelTitle = "",
    description = "",
    tags = [],
    thumbnails = {},
  } = snippet;

  const { viewCount = "0", likeCount = "0", commentCount = "0" } = statistics;

  return (
    <Box minHeight="90vh" mb={10}>
      <Box display="flex">
        {/* Video qismi */}
        <Box width="75%">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            className="react-player"
          />

          {/* Teglar */}
          <Box display="flex" flexWrap="wrap">
            {tags.map((item, idx) => (
              <Chip
                label={item}
                key={idx}
                sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
                deleteIcon={<TagIcon />}
                onDelete={() => {}}
                variant="outlined"
              />
            ))}
          </Box>

          {/* Sarlavha va Tavsif */}
          <Typography variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            p={2}
            sx={{ opacity: 0.7 }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />

          {/* Statistika */}
          <Stack direction="row" gap="20px" alignItems="center" py={1} px={2}>
            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <VisibilityIcon />
              <span>{parseInt(viewCount).toLocaleString()} views</span>
            </Stack>

            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <FavoriteOutlinedIcon />
              <span>{parseInt(likeCount).toLocaleString()} likes</span>
            </Stack>

            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <MarkChatReadIcon />
              <span>{parseInt(commentCount).toLocaleString()} comments</span>
            </Stack>
          </Stack>
        </Box>

        {/* Tavsiya etilgan videolar qismi */}
        <Box width="25%">
          <h3>Suggested Videos</h3>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
