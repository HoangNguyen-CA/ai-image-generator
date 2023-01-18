import { Container, Paper } from "@mui/material";
import { createImage } from "services/openai";
import { useMutation } from "@tanstack/react-query";
import ImageGeneratorDisplay from "components/ImageGenerator/ImageGeneratorDisplay";
import ImageGeneratorForm from "components/ImageGenerator/ImageGeneratorForm";

function ImageGenerator() {
  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation({
    mutationFn: createImage,
  });

  const handleSubmit = async (formData) => {
    mutate(formData);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ m: 2 }}>
        <ImageGeneratorForm onSubmit={handleSubmit} />

        <ImageGeneratorDisplay
          loading={isLoading}
          success={isSuccess}
          data={data}
          isError={isError}
          error={error}
        />
      </Paper>
    </Container>
  );
}

export default ImageGenerator;
