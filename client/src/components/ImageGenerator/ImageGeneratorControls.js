import { Button, Box, Alert } from "@mui/material";
import BackdropLoader from "components/BackdropLoader";
function ImageGeneratorControls({
  mutatePostUserImage,
  accessToken,
  imageURL,
  savedDisabled,
}) {
  const handleSaveImage = async () => {
    mutatePostUserImage.mutate({ accessToken, imageURL });
  };

  if (!imageURL) {
    return null;
  }

  return (
    <Box>
      <Box>
        {accessToken && (
          <Button
            disabled={savedDisabled}
            onClick={() => handleSaveImage()}
            variant="outlined"
          >
            Save image
          </Button>
        )}
      </Box>

      {mutatePostUserImage.isLoading && <BackdropLoader />}
      {mutatePostUserImage.isError && <Alert>Error Saving Image!</Alert>}
      {mutatePostUserImage.isSuccess && (
        <Alert>Saved Image Successfully!</Alert>
      )}
    </Box>
  );
}

export default ImageGeneratorControls;
