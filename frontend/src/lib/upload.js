import axios from "axios";
const upload = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "image_upload"); // replace with your preset

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddlcqkjnr/image/upload",
      formData
    );

    return response.data.secure_url; // returns the URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
export default upload;
