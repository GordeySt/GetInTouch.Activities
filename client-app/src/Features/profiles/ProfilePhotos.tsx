import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Card, Header, Tab, Image, Button, Grid } from "semantic-ui-react";
import ProfileStore from "../../App/stores/ProfileStore";
import { UploadPhotoWidget } from "../photoUpload/UploadPhotoWidget";

export const ProfilePhotos = observer(() => {
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploading,
    setMainPhoto,
    deletePhoto,
    loadingSetMain,
    loadingDelete
  } = ProfileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleUploadPhoto = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: "0" }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              icon={!addPhotoMode ? "photo" : "close"}
              basic
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <UploadPhotoWidget
              uploadPhoto={handleUploadPhoto}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid width={2}>
                        <Button
                          name={photo.id}
                          colour="gray"
                          loading={loadingSetMain && target === photo.id}
                          content="Main"
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          disabled={photo.isMain}
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          color="black"
                          icon="trash"
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={loadingDelete && deleteTarget === photo.id}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
