import axios from "./axios";

async function postUserImage({ imageURL, accessToken }) {
  const { data } = await axios.post(
    "user/images",
    { imageURL },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
}

async function getUserImages(accessToken) {
  const { data } = await axios.get("user/images", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export { postUserImage, getUserImages };
