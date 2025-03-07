import SearchIcon from "@mui/icons-material/Search";
import { Paper, IconButton } from "@mui/material";
import { useState } from "react";
import { colors } from "../constants/colors";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/search/${value}`)
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      sx={{
        border: `1px solid ${colors.secondary}`,
        pl: 2,
        boxShadow: "none",
        mr: 5,
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit" >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
