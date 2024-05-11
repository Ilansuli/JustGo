import { ChangeEvent, FormEvent, useState } from "react";
import { httpService } from "../services";

type ImgUploadProps = {};

const ImgUpload: React.FC<ImgUploadProps> = ({}) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        await httpService.post("/api/user/uploadImg", formData); // Use the HTTP service for the request
        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
export default ImgUpload;
