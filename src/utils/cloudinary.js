const api_key = import.meta.env.VITE_CLOUDINARY_URL;
const upload_folder = import.meta.env.VITE_UPLOAD_PRESET;
const uploadImageCloudinary = async (files) => {
  const UPLOAD_PRESET = "memory-lane";
  try {
    const uploads = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const response = await fetch(api_key, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      const url = result.secure_url || result.data?.secure_url;
      return url
    });
     const imageUrls = await Promise.all(uploads);
     return imageUrls.filter(Boolean)
  } catch (error) {
    console.log(error);
    return null;
    //   throw new Error("Something went wrong!");
  }
};

export default uploadImageCloudinary;
