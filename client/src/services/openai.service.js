import axios from "./axios";

export const createImage = async ({ prompt, size }) => {
  const { data } = await axios.get("openai/createimage", {
    params: { prompt, size },
  });
  return data;
};
