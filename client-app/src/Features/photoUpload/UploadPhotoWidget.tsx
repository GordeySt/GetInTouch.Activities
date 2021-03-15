import { Fragment, useEffect, useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { UploadPhotoDropzone } from "./UploadPhotoDropzone";
import { UploadPhotoCropper } from "./UploadPhotoCropper";

export const UploadPhotoWidget = observer(() => {
  const [files, setFiles] = useState<any[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => console.log(blob));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <UploadPhotoDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files && files.length > 0 && (
            <UploadPhotoCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          <div
            className="img-preview"
            style={{ minHeight: 200, overflow: "hidden" }}
          ></div>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
});
