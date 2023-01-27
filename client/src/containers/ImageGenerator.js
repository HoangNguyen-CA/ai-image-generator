import { useState } from "react";
import { Paper, Stack } from "@mui/material";
import { createImage } from "services/openai.service";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import ImageGeneratorDisplay from "components/ImageGenerator/ImageGeneratorDisplay";
import ImageGeneratorForm from "components/ImageGenerator/ImageGeneratorForm";
import ImageGeneratorControls from "components/ImageGenerator/ImageGeneratorControls";

import { postUserImage } from "services/user.service";

function ImageGenerator() {
  const [savedDisabled, setSaveDisabled] = useState(false);

  const mutateCreateImage = useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      setSaveDisabled(false);
    },
  });

  const mutatePostUserImage = useMutation({
    mutationFn: postUserImage,
    onMutate: () => {
      setSaveDisabled(true);
    },
    onError: () => {
      setSaveDisabled(false);
    },
  });

  const { accessToken } = useOutletContext();

  const handleSubmit = async (formData) => {
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
          savedDisabled={savedDisabled}
        ></ImageGeneratorControls>

        <ImageGeneratorDisplay
          loading={mutateCreateImage.isLoading}
          success={mutateCreateImage.isSuccess}
          data={mutateCreateImage.data}
          isError={mutateCreateImage.isError}
          error={mutateCreateImage.error}
        />
      </Stack>
    </Paper>
  );
}

export default ImageGenerator;
