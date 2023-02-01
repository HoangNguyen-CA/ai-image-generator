import axios from "./axios";

async function postUserImage({ imageURL, accessToken, prompt }) {
  const { data } = await axios.post(
    "user/images",
    { imageURL, prompt },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
}

async function deleteUserImage({ imageId, accessToken }) {
  const { data } = await axios.delete("user/images", {
    data: { imageId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log(data);

  return data;
}

async function getUserImages(accessToken) {
  const { data } = await axios.get("user/images", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export { postUserImage, getUserImages, deleteUserImage };
