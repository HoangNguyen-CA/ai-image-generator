import { Button, Box, Alert, Snackbar } from "@mui/material";
import BackdropLoader from "components/BackdropLoader";
import { useEffect, useState } from "react";
function ImageGeneratorControls({
  mutatePostUserImage,
  accessToken,
  imageURL,
  prompt,
}) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [snackMessage, setSnackMessage] = useState("Saved image successfully!");

  useEffect(() => {
    if (mutatePostUserImage.isError) {
      setSnackOpen(true);
      setSnackSeverity("error");
      setSnackMessage("Error saving image!");
    } else if (mutatePostUserImage.isSuccess) {
      setSnackOpen(true);
      setSnackSeverity("success");
      setSnackMessage("Saved image successfully!");
    } else {
      setSnackOpen(false);
    }
  }, [mutatePostUserImage.isError, mutatePostUserImage.isSuccess]);
  const handleSaveImage = async () => {
    mutatePostUserImage.mutate({ accessToken, imageURL, prompt });
  };

  if (!imageURL) {
    return null;
  }

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };
  return (
    <Box>
      <Box>
        {accessToken && (
          <Button
            disabled={
              mutatePostUserImage.isLoading || mutatePostUserImage.isSuccess
            }
            onClick={() => handleSaveImage()}
            variant="outlined"
          >
            {mutatePostUserImage.isSuccess ? "Image saved" : "Save image"}
          </Button>
        )}
      </Box>

      <Snackbar></Snackbar>

      {mutatePostUserImage.isLoading && <BackdropLoader />}
      <Snackbar
        onClose={handleCloseSnack}
        autoHideDuration={6000}
        open={snackOpen}
      >
        <Alert
          severity={snackSeverity}
          onClose={handleCloseSnack}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      {/* {mutatePostUserImage.isError && <Alert>Error Saving Image!</Alert>}
      {mutatePostUserImage.isSuccess && (
        <Alert>Saved Image Successfully!</Alert>
      )} */}
    </Box>
  );
}

export default ImageGeneratorControls;
