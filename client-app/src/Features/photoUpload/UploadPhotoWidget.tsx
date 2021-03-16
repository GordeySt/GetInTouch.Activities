import { Fragment, useEffect, useState } from "react";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { UploadPhotoDropzone } from "./UploadPhotoDropzone";
import { UploadPhotoCropper } from "./UploadPhotoCropper";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export const UploadPhotoWidget: React.FC<IProps> = observer(
  ({ uploadPhoto, loading }) => {
    console.log(loading);
    const [files, setFiles] = useState<any[]>([]);
    const [cropper, setCropper] = useState<Cropper | null>(null);

    const onCrop = () => {
      if (cropper) {
        cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
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
            {files && files.length > 0 && (
              <Fragment>
                <div
                  className="img-preview"
                  style={{ minHeight: 200, overflow: "hidden" }}
                ></div>
                <Button.Group widths={2}>
                  <Button
                    animated="fade"
                    secondary
                    loading={loading}
                    onClick={onCrop}
                  >
                    <Button.Content visible>
                      <Icon name="check" />
                    </Button.Content>
                    <Button.Content hidden>Upload</Button.Content>
                  </Button>
                  <Button
                    animated="fade"
                    disabled={loading}
                    onClick={() => setFiles([])}
                  >
                    <Button.Content visible>
                      <Icon name="close" />
                    </Button.Content>
                    <Button.Content hidden>Cancel</Button.Content>
                  </Button>
                </Button.Group>
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
);
