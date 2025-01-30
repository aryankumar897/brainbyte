import Resizer from "react-image-file-resizer";
import { toast } from 'react-toastify';

export const imageUpload = async (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1280, // Width
      720,  // Height
      "JPEG", // Format
      100, // Quality
      0, // Rotation
      async (uri) => {
        try {
          // Make a POST request to your server to upload the base64 image
          const response = await fetch(`${process.env.API}/admin/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: uri }),
          });

          if (response.ok) {
            const data = await response.json();
             console.log("image uplaod failed",data)
            resolve(data?.url); // Resolve with the uploaded image URL
          } else {
            reject(new Error("Image upload failed"));
            toast.error("Image upload failed");
          }
        } catch (error) {
          reject(error);
          toast.error("An unexpected error occurred");
        }
      },
      "base64" // Output type
    );
  });
};
