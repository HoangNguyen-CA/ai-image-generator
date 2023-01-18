import { Box } from "@mui/material";

function ImageGeneratorDisplay({ loading, error, data }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data?.imageURL) {
    return (
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="AI generated image"
        src={data.imageURL}
      />
    );
  } else {
    return null;
  }
}

export default ImageGeneratorDisplay;
