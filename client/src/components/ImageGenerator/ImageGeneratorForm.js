import { useForm } from "react-hook-form";
import { TextField, Button, Box, MenuItem } from "@mui/material";

function ImageGeneratorForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Text Prompt"
          variant="outlined"
          defaultValue=""
          sx={{ mb: 2 }}
          {...register("prompt")}
        />

        <TextField
          label="Size"
          select
          defaultValue="small"
          sx={{ mb: 2 }}
          {...register("size")}
        >
          <MenuItem value={"small"}>Small (256x256)</MenuItem>
          <MenuItem value={"medium"}>Medium (512x512)</MenuItem>
          <MenuItem value={"large"}>Large (1024x1024)</MenuItem>
        </TextField>
        <Button variant="contained" type="submit">
          Generate Image
        </Button>
      </Box>
    </form>
  );
}

export default ImageGeneratorForm;
