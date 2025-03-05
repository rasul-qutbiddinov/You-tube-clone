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

const VideoCard = ({ video }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "360px", md: "300px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <CardMedia
        component="img"
        image={video?.snippet?.thumbnails?.high?.url || "/placeholder.jpg"}
        alt={video?.snippet?.title || "Video Thumbnail"}
        sx={{
          maxWidth: { xs: "100%", sm: "360px" },
          height: "180px",
        }}
      />
      <CardContent
        sx={{
          background: colors.primary,
          height: "200px",
          position: "relative",
        }}
      >
        <Stack direction="row" alignItems="center" gap="5px">
          <Avatar
            src={video?.snippet?.thumbnails?.high?.url || "/default-avatar.png"}
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
      </CardContent>
    </Card>
  );
};

// PropTypes bilan komponent tekshiruvini qo‘shish
VideoCard.propTypes = {
  video: PropTypes.shape({
    snippet: PropTypes.shape({
      publishedAt: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      channelTitle: PropTypes.string,
      thumbnails: PropTypes.shape({
        high: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }),
};

export default VideoCard;
