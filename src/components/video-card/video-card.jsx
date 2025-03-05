import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { colors } from "../constants/colors";
import moment from "moment";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
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
          image={video?.snippet?.thumbnails?.high?.url || "/placeholder.jpg"}
          alt={video?.snippet?.title || "Video Thumbnail"}
          sx={{
            maxWidth: { xs: "100%", sm: "360px" },
            height: "180px",
          }}
        />
      </Link>
      <CardContent
        sx={{
          background: colors.primary,
          height: "200px",
          position: "relative",
        }}
      >
        <Link to={`/video/${video.id.videoId}`}>
          <Stack direction="row" alignItems="center" gap="5px">
            <Avatar
              src={
                video?.snippet?.thumbnails?.high?.url || "/default-avatar.png"
              }
            />
            <Typography variant="subtitle2" color="gray">
              {video?.snippet?.channelTitle || "Unknown Channel"}
            </Typography>
            <Typography my={"1px"} sx={{ opacity: ".5", marginLeft: "auto" }}>
              {video?.snippet?.publishedAt
                ? moment(video.snippet.publishedAt).fromNow()
                : "Unknown Date"}
            </Typography>
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold">
            {video?.snippet?.title
              ? video.snippet.title.slice(0, 50)
              : "No Title"}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
            {video?.snippet?.description
              ? video.snippet.description.slice(0, 50)
              : "No Description"}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

// PropTypes bilan komponent tekshiruvini qo‘shish
VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      publishedAt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      channelTitle: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        high: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default VideoCard;
