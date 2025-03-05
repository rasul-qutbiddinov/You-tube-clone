import PropTypes from "prop-types";
import { Button, Stack, Box } from "@mui/material";
import { category } from "../constants/index";
import { colors } from "../constants/colors";

const Category = ({ SelectedCategoryHandler, selectedCategory }) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // Scroll bo‘lishi uchun
        scrollbarWidth: "none", // Firefox scrollbari yashiriladi
        "&::-webkit-scrollbar": { display: "none" }, // Chrome scrollbari yashiriladi
      }}
    >
      <Stack
        direction="row"
        spacing={1} // Tugmalar orasida masofa bo‘lishi uchun
        sx={{
          flexWrap: "nowrap", // Yonma-yon joylashish
        }}
      >
        {category.map((item) => {
          const isSelected = item.name === selectedCategory;

          return (
            <Button
              key={item.name}
              className="category-btn"
              sx={{
                flex: "0 0 auto", // Tugmalar bir qator bo‘lib qolishi uchun
                backgroundColor: isSelected ? colors.secondary : "transparent",
                color: isSelected ? "#fff" : "black",
                fontWeight: isSelected ? "bold" : "normal",
                whiteSpace: "nowrap", // Matn joyida qolishi uchun
                "&:hover": {
                  backgroundColor: colors.secondary,
                  color: "#fff",
                },
              }}
              onClick={(e) => {
                e.stopPropagation(); // Parent eventlarni to‘xtatish
                SelectedCategoryHandler(item.name);
              }}
            >
              {/* Icon */}
              <span
                style={{
                  marginRight: "10px",
                  color: isSelected ? "#fff" : colors.secondary,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon && <item.icon />}
              </span>
              <span>{item.name}</span>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

Category.propTypes = {
  SelectedCategoryHandler: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Category;
