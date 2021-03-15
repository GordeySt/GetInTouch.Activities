import React from "react";
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css'

interface IProps {
  setCropper: (Cropper: Cropper) => void;
  imagePreview: string;
}

export const UploadPhotoCropper: React.FC<IProps> = ({
  setCropper,
  imagePreview,
}) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={cropper => setCropper(cropper)}
    />
  );
};
