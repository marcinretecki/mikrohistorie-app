export const getStoryImageUri = (slug: string, version?: "large" | "small") => {
  const endpoint = process.env.EXPO_PUBLIC_IMAGE_ENDPOINT;

  if (!endpoint) {
    return "";
  }

  const size = version === "large" ? "" : "@512w";
  const extension = ".jpg";

  return `${endpoint}${slug}${size}${extension}`;
};
