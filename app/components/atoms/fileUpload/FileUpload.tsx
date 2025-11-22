export const FileUpload = ({
  label,
  accept = "image/*",
  handleUpload,
  multiple = false,
}: {
  label: string;
  accept?: string;
  multiple?: boolean;
  handleUpload: (files: FileList) => void;
}) => {
  return (
    <div className="w-full mx-auto py-2 ">
      <label>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files) {
              handleUpload(e.target.files);
            }
          }}
        />
        <div className=" dark:text-white w-full aspect-video h-16 rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          <span>{label}</span>
        </div>
      </label>
    </div>
  );
};
