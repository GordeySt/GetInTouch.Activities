import React from "react";
import Cropper from "react-cropper";

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

export const UploadPhotoCropper: React.FC<IProps> = ({
  setImage,
  imagePreview,
}) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
    />
  );
};
