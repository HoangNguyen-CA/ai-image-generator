import { Box, Skeleton, Alert, AlertTitle, Button } from "@mui/material";

function ImageGeneratorDisplay({ loading, isError, error, data, success }) {
  let content = null;
  if (loading) {
    content = (
      <Skeleton variant="rectangular" width={512} height={512}></Skeleton>
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
      <>
        <Box
          component="img"
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            maxWidth: 512,
            maxHeight: 512,
          }}
          alt="AI generated image"
          src={data.imageURL}
        />
        <Button variant="contained">Download Image</Button>
      </>
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
        p: 3,
      }}
    >
      {content}
    </Box>
  );
}

export default ImageGeneratorDisplay;
