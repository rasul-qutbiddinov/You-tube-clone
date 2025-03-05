import { Box, Typography, Stack, Avatar, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { apiservice } from "../../service/api.service";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Videos from "../videos/videos";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState({});
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [comments, setComments] = useState([]); // ✅ Yangi: Izohlar uchun holat
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiservice.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data?.items?.[0] || {});

        const relateData = await apiservice.fetching(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        setRelatedVideo(relateData?.items || []);
      } catch (error) {
        console.log(error);
      }
    };

    const getComments = async () => {
      try {
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${id}&maxResults=5`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "60a0c46e20msh7dd031214607484p1e4aeejsn577ab43499fb",
              "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        setComments(data?.items || []);
      } catch (error) {
        console.log("Comments fetch error:", error);
      }
    };

    getData();
    getComments(); // ✅ Yangi: Izohlarni olish uchun chaqiruv
  }, [id]);

  const { snippet = {}, statistics = {} } = videoDetail;
  const {
    title = "",
    channelTitle = "",
    description = "",
    thumbnails = {},
  } = snippet;
  const { viewCount = "0", likeCount = "0", commentCount = "0" } = statistics;

  return (
    <Box minHeight="90vh" mb={10}>
      <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }} p={2}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            className="react-player"
          />
          <Stack
            direction="row"
            alignItems="center"
            gap="10px"
            marginTop="10px"
            py={1}
          >
            <Stack direction="row" alignItems="center" gap="5px">
              <Avatar
                alt={channelTitle}
                src={thumbnails?.default?.url || "/default-avatar.png"}
                sx={{ width: 40, height: 40 }}
              />
              <Typography variant="subtitle2" color="gray">
                {channelTitle}
              </Typography>
              <CheckCircleIcon
                sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
              />
            </Stack>

            <Stack
              direction="row"
              gap="15px"
              alignItems="center"
              marginLeft="auto"
            >
              <VisibilityIcon />
              <span>{parseInt(viewCount).toLocaleString()} views</span>
              <FavoriteOutlinedIcon />
              <span>{parseInt(likeCount).toLocaleString()} likes</span>
              <MarkChatReadIcon />
              <span>{parseInt(commentCount).toLocaleString()} comments</span>
            </Stack>
          </Stack>

          <Typography variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            p={2}
            sx={{ opacity: 0.7 }}
            dangerouslySetInnerHTML={{
              __html: description || "No description available",
            }}
          />

          {/* ✅ Yangi: Izohlarni ko'rsatish */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              Comments
            </Typography>
            {comments.map((comment, index) => (
              <Box key={index} my={2}>
                <Stack direction="row" alignItems="center" gap="10px">
                  <Avatar
                    src={
                      comment?.snippet?.topLevelComment?.snippet
                        ?.authorProfileImageUrl || "/default-avatar.png"
                    }
                    alt="User"
                  />
                  <Typography variant="subtitle2" fontWeight="bold">
                    {
                      comment?.snippet?.topLevelComment?.snippet
                        ?.authorDisplayName
                    }
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.7, ml: 6 }}>
                  {comment?.snippet?.topLevelComment?.snippet?.textDisplay}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          overflow="scroll"
          maxHeight="1000vh"
        >
          <Videos videos={relatedVideo} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
