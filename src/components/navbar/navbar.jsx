import { Stack, Box } from "@mui/material";
import { colors } from "../constants/colors";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/searchbar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        height: "10vh",
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: colors.primary, // colors obyektini tekshirib ko‘ring
      }}
    >
      <Link to="/">
        <img     
          width="58"
          height="58"
          src="https://img.icons8.com/ink/48/youtube-play.png"
          alt="youtube-play"
        />
      </Link>
      <SearchBar />
      <Box />
    </Stack>
  );
};

export default Navbar;
