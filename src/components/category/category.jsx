import PropTypes from "prop-types"; 
import { Button, Stack } from "@mui/material";
import { category } from "../constants/index";
import { colors } from "../constants/colors";

const Category = ({ SelectedCategoryHandler, selectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{ overflowX: "scroll" }}
      flexWrap={"wrap"}
    >
      {category.map((item) => {
        const isSelected = item.name === selectedCategory;

        return (
          <Button
            key={item.name}
            className="category-btn"
            sx={{
              borderRadius: "0px",
              backgroundColor: isSelected ? colors.secondary : "transparent",
              color: isSelected ? "#fff" : "black",
              fontWeight: isSelected ? "bold" : "normal",
              "&:hover": {
                backgroundColor: colors.secondary,
                color: "#fff",
              },
            }}
            onClick={() => SelectedCategoryHandler(item.name)}
          >
            {/* Icon */}
            <span
              style={{
                marginRight: "10px",
                color: isSelected ? "#fff" : colors.secondary,
              }}
            >
              {item.icon && <item.icon />}
            </span>
            <span>{item.name}</span>
          </Button>
        );
      })}
    </Stack>
  );
};
Category.propTypes = {
  SelectedCategoryHandler: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Category;
