import { UploadResult } from "firebase/storage";

export type SavedImageData = {
  uploadResponse: UploadResult;
  imageUrl: string;
  blurHash: {
    encoded: string;
    width: number;
    height: number;
  };
};

export type SavedImagesData = {
  imagePath: string;
  imageUrl: string;
  blurHash: string;
};
