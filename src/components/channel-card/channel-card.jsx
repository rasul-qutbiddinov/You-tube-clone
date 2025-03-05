/* eslint-disable react/prop-types */
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ChannelCard = ({ video }) => {
  const { snippet = {}, statistics = {} } = video || {};
  const { title = "Channel Name", thumbnails = {} } = snippet;
  const { subscriberCount = 0 } = statistics;

  console.log("Channel Data:", video); // 🔄 JSON formatda tekshirish uchun

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link
        to={`/channel/${video?.id?.channelId || video?.snippet?.channelId}`}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardMedia
            image={
              thumbnails?.high?.url ||
              thumbnails?.medium?.url ||
              "/default-avatar.png"
            }
            alt={title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {title}{" "}
            <CheckCircle sx={{ fontSize: "14px", color: "gray", ml: "5px" }} />
          </Typography>

          

          {subscriberCount ? (
            <Typography
              sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}
            >
              {parseInt(subscriberCount).toLocaleString("en-US")} Subscribers
            </Typography>
          ) : (
            <Typography
              sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}
            >
              No Subscribers Info
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
