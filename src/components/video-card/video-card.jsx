/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const VideoCard = ({ video }) => {
  const { snippet = {} } = video;
  const {
    title,
    description,
    publishedAt,
    channelTitle,
    thumbnails = {},
  } = snippet;

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "360px", md: "300px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={`/video/${video.id.videoId}`}>
        <CardMedia
          component="img"
          image={thumbnails?.high?.url || "/placeholder.jpg"}
          alt={title || "Video Thumbnail"}
          sx={{ maxWidth: { xs: "100%", sm: "360px" }, height: "180px" }}
        />
      </Link>
      <CardContent
        sx={{ height: "200px", position: "relative", backgroundColor: "#fff" }}
      >
        <Link to={`/video/${video.id.videoId}`}>
          <Stack direction="row" alignItems="center" gap="5px">
            <Avatar src={thumbnails?.high?.url || "/default-avatar.png"} />
            <Typography variant="subtitle2" color="gray">
              {channelTitle || "Unknown Channel"}
            </Typography>
            <Typography my={"1px"} sx={{ opacity: ".5", marginLeft: "auto" }}>
              {publishedAt ? moment(publishedAt).fromNow() : "Unknown Date"}
            </Typography>
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold">
            {title?.slice(0, 50) || "No Title"}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
            {description?.slice(0, 50) || "No Description"}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
