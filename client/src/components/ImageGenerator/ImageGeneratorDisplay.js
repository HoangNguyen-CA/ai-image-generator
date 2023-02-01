import { Box, Skeleton, Alert, AlertTitle } from "@mui/material";
import ImageFrame from "components/ImageFrame";

function ImageGeneratorDisplay({
  loading,
  isError,
  error,
  data,
  success,
  prompt,
}) {
  let content = null;
  if (loading) {
    content = (
      <Skeleton
        variant="rectangular"
        width={512}
        height={512}
        sx={{
          maxWidth: "100%",
        }}
      ></Skeleton>
    );
  } else if (isError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.response?.data?.error || "Could not generate image."}
      </Alert>
    );
  } else if (success) {
    content = (
      <Box sx={{ width: "80%", maxWidth: "512px" }}>
        <ImageFrame imageURL={data.imageURL} prompt={prompt} />
      </Box>
    );
  }

  if (content === null) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {content}
    </Box>
  );
}

export default ImageGeneratorDisplay;
