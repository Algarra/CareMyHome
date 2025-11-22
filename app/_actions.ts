"use server";
import { ConnectToDatabase } from "../utils/mongo";
import sizeOf from "image-size";
import sharp from "sharp";
import { encode } from "blurhash";
import bcrypt from "bcrypt";
import { validatePassword } from "./utils/passwordValidator";
import {
  sendPasswordRecoveryEmail,
  sendPasswordUpdateSuccessfullEmail,
} from "./utils/email-manager";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  updateMetadata,
} from "firebase/storage";
import { storage } from "../utils/firebase";
import * as imgPath from "path";
import { SavedImageData, SavedImagesData } from "./types/images";
import { Buffer } from "buffer";
import { User } from "./types/user";

const breakpoints = [480, 768, 1024, 1600, 1920];

export const getBlurHashFromBuffer = async (
  imageBuffer: Buffer
): Promise<{
  encoded: string;
  width: number;
  height: number;
}> => {
  const size = 32;

  const { width: remoteWidth, height: remoteHeight } = sizeOf(
    new Uint8Array(imageBuffer)
  );
  const width = remoteWidth ?? 100;
  const height = remoteHeight ?? 100;

  const { info, data } = await sharp(imageBuffer)
    .resize(size, size, {
      fit: "inside",
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    });

  const encoded = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );

  const output = {
    encoded,
    width,
    height,
  };
  return output;
};

const getBlurHashFromURL = async (
  imageUrl: string
): Promise<{
  encoded: string;
  width: number;
  height: number;
}> => {
  const size = 32;

  const response = await fetch(imageUrl);

  const arrayBuffer = await response.arrayBuffer();
  const returnedBuffer = Buffer.from(arrayBuffer);

  const { width: remoteWidth, height: remoteHeight } = sizeOf(
    new Uint8Array(returnedBuffer)
  );
  const width = remoteWidth ?? 100;
  const height = remoteHeight ?? 100;

  const { info, data } = await sharp(returnedBuffer)
    .resize(size, size, {
      fit: "inside",
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    });

  const encoded = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );

  const output = {
    encoded,
    width,
    height,
  };
  return output;
};

export const getBlurhash = async (url: string) => {
  const output = await getBlurHashFromURL(url);
  return output;
};

export const validateEmail = async (email: string) => {
  return !!email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateUsername = async (username: string) => {
  const { business } = await ConnectToDatabase();

  const user = await business.collection("users").findOne({ username });
  if (user) {
    return false;
  }
  return true;
};

export const sendPasswordUpdate = async (email: string) => {
  const { business } = await ConnectToDatabase();
  const user = await business.collection("users").findOne({ email });
  if (!user) {
    return {
      actionSuccessful: false,
      message: "User not found",
    };
  }
  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.PASSWORD_RESET_KEY as string
  );
  sendPasswordRecoveryEmail({ email, token });
  return {
    actionSuccessful: true,
    message: "Email sent",
  };
};

export const setNewPassword = async (token: string, newPassword: string) => {
  const { business } = await ConnectToDatabase();

  const data = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.PASSWORD_RESET_KEY)
  );

  if (!data.payload.userId) {
    return {
      actionSuccessful: false,
      message: "Invalid token",
    };
  }
  if (!validatePassword(newPassword)) {
    return {
      actionSuccessful: false,
      message: "Invalid password",
    };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await business
      .collection("users")
      .updateOne(new ObjectId(data.payload.userId as string), {
        $set: { password: hashedPassword },
      });
    const user = await business
      .collection("users")
      .findOne(new ObjectId(data.payload.userId as string));

    if (!user)
      return {
        actionSuccessful: false,
        message: "User not updated",
      };

    sendPasswordUpdateSuccessfullEmail({ email: user.email });
    return {
      actionSuccessful: true,
      message: "User updated",
    };
  } catch {
    return {
      actionSuccessful: false,
      message: "User not updated",
    };
  }
};

export const updateUserImage = async (file: File) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken"); // Replace with your cookie name
  if (!token) {
    return { error: "No session token found" };
  }
  const AuthTokenValue: any = jwt.verify(
    token.value,
    process.env.USER_ACTION_ACCESS as string
  );
  if (!AuthTokenValue.email) {
    return { error: "No session token found" };
  }
  const date = new Date();

  const uploadedImage = await compressAndUpload(
    file,
    400,
    `users/${
      AuthTokenValue.userId
    }/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  );

  const newUserImage: User["image"] = {
    blurHash: uploadedImage.blurHash.encoded,
    url: uploadedImage.imageUrl,
  };

  const { business } = await ConnectToDatabase();
  const filter = { _id: new ObjectId(AuthTokenValue.userId) };
  const update = {
    $set: {
      image: newUserImage,
    },
  };
  const mongoUpdate = await business
    .collection("users")
    .updateOne(filter, update);
  const user = await business
    .collection("users")
    .findOne({ _id: new ObjectId(AuthTokenValue.userId) });

  if (!user) return { error: "user not found" };

  if (mongoUpdate) return { message: "user updated", userImage: user.image };
};

const fileToBuffer = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer(); // Get ArrayBuffer from the File
  return Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
};

const uploadBuffer = async (
  BufferFile: Buffer,
  filename: string,
  date: Date,
  path?: string
) => {
  const imagePath =
    path ?? `images/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  const imageRef = ref(
    storage,
    `${imagePath}/${date.getTime().toString()}_${filename.replace(/\s/g, "")}`
  );

  const uploadResponse = await uploadBytes(imageRef, BufferFile);
  const newMetadata = {
    cacheControl: "public,max-age=31536000,stale-while-revalidate=86400",
  };
  await updateMetadata(imageRef, newMetadata);

  const imageUrl = await getDownloadURL(imageRef);
  const blurHash = await getBlurHashFromBuffer(BufferFile);

  return { uploadResponse, imageUrl, blurHash };
};

export const compressAndUpload = async (
  image: File,
  resize = 900,
  path?: string
): Promise<SavedImageData> => {
  const originalName = imgPath.parse(image.name).name;
  const savedImageDate = new Date();

  const filename = savedImageDate.getTime() + "-" + originalName + ".webp";

  const sendUploadBuffer = async (data: Buffer, filename: string) => {
    return uploadBuffer(
      data,
      filename.replace(/\s/g, ""),
      savedImageDate,
      path
    );
  };

  const imageBuffer = await fileToBuffer(image);

  return new Promise(function (resolve, reject) {
    sharp(imageBuffer)
      .rotate()
      .resize(resize)
      .webp({ effort: 3 })
      .toBuffer(async (err, data, _info) => {
        const reps = await sendUploadBuffer(data, filename);
        if (err) reject(err);
        resolve(reps);
      });
  });
};

export const compressAndUploadMultipleSizes = async (
  image: File,
  path?: string
): Promise<SavedImagesData> => {
  const originalName = imgPath.parse(image.name).name;
  const savedImageDate = new Date();

  // Function to upload a buffer to Firebase
  const sendUploadBuffer = async (data: Buffer, filename: string) => {
    return uploadBuffer(
      data,
      filename.replace(/\s/g, ""),
      savedImageDate,
      path
    );
  };

  // Convert the file to a buffer
  const imageBuffer = await fileToBuffer(image);

  // Helper function to process and upload for a specific size
  const processAndUpload = async (resize: number): Promise<SavedImageData> => {
    const filename = `${savedImageDate.getTime()}-${originalName}-${resize}.webp`; // Add size suffix to filename
    return new Promise((resolve, reject) => {
      sharp(imageBuffer)
        .rotate() // Correct orientation based on EXIF data
        .resize({ width: resize }) // Resize to the specified width
        .webp({ effort: 3 }) // Compress to WebP format with moderate effort
        .toBuffer(async (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          const uploadResponse = await sendUploadBuffer(data, filename);
          resolve(uploadResponse);
        });
    });
  };

  // Generate images for all specified sizes
  const uploadPromises = breakpoints.map((size) => processAndUpload(size));

  // Wait for all uploads to complete and return the results
  const response = await Promise.all(uploadPromises);
  if (!response.length) {
    console.error("error uploading image");
  }
  const imageData = {
    blurHash: response[0].blurHash.encoded,
    imageUrl: response[0].imageUrl.replace(/-\d+\.webp/, "-{{size}}.webp"),
    imagePath: response[0].uploadResponse.metadata.fullPath.replace(
      /-\d+\.webp/,
      "-{{size}}.webp"
    ),
  };
  return imageData;
};
