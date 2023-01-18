import { Paper } from "@mui/material";
import { createImage } from "services/openai";
import { useState } from "react";
import ImageGeneratorDisplay from "components/ImageGenerator/ImageGeneratorDisplay";
import ImageGeneratorForm from "components/ImageGenerator/ImageGeneratorForm";

function ImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createImage(data.prompt, data.size);
      setData(res);
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        throw e;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ m: 2 }}>
      <ImageGeneratorForm onSubmit={handleSubmit} />

      <ImageGeneratorDisplay loading={loading} data={data} error={error} />
    </Paper>
  );
}

export default ImageGenerator;
