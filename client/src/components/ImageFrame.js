import { Box } from "@mui/material";

function ImageFrame({ imageURL, prompt }) {
  return (
    <Box
      component="img"
      sx={{
        display: "block",
        width: "100%",
        height: "auto",
      }}
      alt={prompt}
      src={imageURL}
    />
  );
}

export default ImageFrame;
