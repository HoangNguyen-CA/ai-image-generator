import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "services/user.service";
import { useOutletContext } from "react-router-dom";

function User() {
  const { accessToken } = useOutletContext();
  const { data } = useQuery({
    queryKey: ["user_images", accessToken],
    queryFn: async ({ queryKey }) => {
      const [, accessToken] = queryKey;
      return await getUserImages(accessToken);
    },
  });

  if (!accessToken) return null;

  return (
    <>
      {data?.images &&
        data.images.map((image) => (
          <img key={image.image_id} src={image.image_url} alt="AI"></img>
        ))}
    </>
  );
}

export default User;
