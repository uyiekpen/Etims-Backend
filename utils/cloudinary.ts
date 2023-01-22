import cloud, { v2 } from "cloudinary";

const cloudinary: typeof v2 = cloud.v2;

cloudinary.config({
  cloud_name: "ditvzgm4e",
  api_key: "777997559621222",
  api_secret: "u7B5syP8E5mayOwWXJpCq3bWmxY",
});

export default cloudinary;
