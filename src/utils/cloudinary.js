import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("Error", localFilePath);
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log(response);
    // console.log("file upload success ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    return null;
  }
};

const deleteFromCloudinary = async (publicID) => {
  try {
    if (!publicID) {
      console.log("Error", localFilePath);
      return null;
    }
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.error("Error deleting old avatar from Cloudinary", error);
    return null;
  }
};
export { uploadOnCloudinary, deleteFromCloudinary };
