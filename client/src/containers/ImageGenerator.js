import { Paper, Stack } from "@mui/material";
import { createImage } from "services/openai.service";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import ImageGeneratorDisplay from "components/ImageGenerator/ImageGeneratorDisplay";
import ImageGeneratorForm from "components/ImageGenerator/ImageGeneratorForm";
import ImageGeneratorControls from "components/ImageGenerator/ImageGeneratorControls";

import { postUserImage } from "services/user.service";

function ImageGenerator() {
  const [savePrompt, setSavePrompt] = useState("");

  const mutatePostUserImage = useMutation({
    mutationFn: postUserImage,
  });

  const mutateCreateImage = useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      mutatePostUserImage.reset();
    },
  });

  const { accessToken } = useOutletContext();

  const handleSubmit = async (formData) => {
    setSavePrompt(formData?.prompt || "");
    mutateCreateImage.mutate(formData);
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Stack spacing={3}>
        <ImageGeneratorForm onSubmit={handleSubmit} />

        <ImageGeneratorControls
          imageURL={mutateCreateImage.data?.imageURL}
          accessToken={accessToken}
          mutatePostUserImage={mutatePostUserImage}
          prompt={savePrompt}
        ></ImageGeneratorControls>

        <ImageGeneratorDisplay
          loading={mutateCreateImage.isLoading}
          success={mutateCreateImage.isSuccess}
          data={mutateCreateImage.data}
          isError={mutateCreateImage.isError}
          error={mutateCreateImage.error}
          prompt={savePrompt}
        />
      </Stack>
    </Paper>
  );
}

export default ImageGenerator;
