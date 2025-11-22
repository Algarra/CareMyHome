import { FileUpload } from "../../atoms/fileUpload";
import { ImageList } from "./ImageList";
import { ImageSlider } from "../imageSlider";
import { TranslationT } from "../../../utils";
import { MutableRefObject, useState } from "react";
import Resizer from "react-image-file-resizer";
import { TextButton } from "../../atoms/buttons/textButton";
import { Text } from "../../atoms/text";
export type ExistingImage = {
  encoded: string;
  width: number;
  height: number;
  url: string;
};
export type ExistingOrNotImage = File | ExistingImage;

export const ImageUpload = ({
  t,
  filesRef,
  files,
  setFiles,
}: {
  t: TranslationT;
  filesRef?: MutableRefObject<ExistingOrNotImage[]>;
  files?: ExistingOrNotImage[];
  setFiles?: (newFiles: ExistingOrNotImage[]) => void;
}) => {
  const [localFiles, setLocalFiles] = useState<ExistingOrNotImage[]>([]);
  const [orderMode, setOrderMode] = useState(false);
  const [loadingFiles, setLoadingFilels] = useState(0);

  const resizeFile = async (file: File) =>
    await new Promise<File>((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri as File);
        },
        "file"
      );
    });

  const addMoreFiles = async (newFiles: FileList) => {
    const newFilesList = Array.from(newFiles).filter(
      (newFile) =>
        !localFiles.some((oldfile) => {
          if (oldfile instanceof File) {
            return (
              oldfile.name === newFile.name && oldfile.size === newFile.size
            );
          } else {
            return false;
          }
        })
    );

    setLoadingFilels(newFilesList.length + localFiles.length);
    await Promise.all(newFilesList.map((newFile) => resizeFile(newFile)))
      .then((resizedSelectedImages) => {
        if (setFiles && files) setFiles([...files, ...resizedSelectedImages]);
        else setLocalFiles([...localFiles, ...resizedSelectedImages]);
        if (filesRef)
          filesRef.current = [
            ...(files ?? localFiles),
            ...resizedSelectedImages,
          ];
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoadingFilels(0);
      });
  };

  return (
    <>
      {(files ?? localFiles).length ? (
        <div className=" text-center">
          <div className=" flex-col columns-2">
            <TextButton
              onClick={() => {
                if (setFiles) setFiles([]);
                setLocalFiles([]);
              }}
              borderAnimation
              buttonClasses=" px-0 md:px-5 w-full justify-center whitespace-nowrap"
            >
              {t("components.imageUpload.deleteImages")}
            </TextButton>
            <TextButton
              onClick={() => setOrderMode(!orderMode)}
              borderAnimation
              buttonClasses=" px-0 md:px-5 w-full justify-center whitespace-nowrap"
            >
              {t("components.imageUpload.reorderImages")}
            </TextButton>
          </div>
          {orderMode ? (
            <Text textClasses=" mt-5 text-black dark:text-white ">
              {t("components.imageUpload.clickInstructions")}
            </Text>
          ) : (
            <FileUpload
              label={t("components.imageUpload.addMoreIamges")}
              handleUpload={addMoreFiles}
              multiple
            />
          )}
        </div>
      ) : (
        <FileUpload
          label={t("components.imageUpload.addImages")}
          handleUpload={async (files) => {
            if (setFiles) setFiles([]);
            setLocalFiles([]);
            setLoadingFilels([...Array.from(files)].length);
            const resizedSelectedImages: File[] = await Promise.all(
              [...Array.from(files)].map((file) => resizeFile(file))
            );
            if (setFiles) setFiles(resizedSelectedImages);
            else setLocalFiles(resizedSelectedImages);

            if (filesRef) filesRef.current = resizedSelectedImages;
            setLoadingFilels(0);
          }}
          multiple
        />
      )}

      <ImageList
        files={files ?? localFiles}
        orderMode={orderMode}
        loadingFiles={loadingFiles}
        setFiles={(files) => {
          if (setFiles) setFiles(files);
          else setLocalFiles(files);
          setOrderMode(false);

          if (filesRef) filesRef.current = [...files];
        }}
      />

      {!!(files ?? localFiles).length && (
        <div className=" flex w-full h-72 mb-3">
          <ImageSlider
            imagePriority
            imageList={(files ?? localFiles).map((file) => ({
              alt: file instanceof File ? file.name : file.url,
              src:
                file instanceof File
                  ? URL.createObjectURL(file as File)
                  : (file as ExistingImage).url,
            }))}
          />
        </div>
      )}
    </>
  );
};
