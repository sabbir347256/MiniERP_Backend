import multer from 'multer';
import cloudinary from './cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [
      { quality: "auto:good" },
      { fetch_format: "auto" },
      { width: 1000, crop: "limit" }
    ],
  } as any,
});

export const upload = multer({ storage });

