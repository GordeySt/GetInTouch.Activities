import { useState } from "react";
import { Card, Header, Tab, Image, Button, Grid } from "semantic-ui-react";
import ModalStore from "../../App/stores/ModalStore";
import ProfileStore from "../../App/stores/ProfileStore";
import { UploadPhotoWidget } from "../photoUpload/UploadPhotoWidget";

export const ProfilePhotos = () => {
  const { profile, isCurrentUser } = ProfileStore;
  const { openModal } = ModalStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: "0" }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              icon="photo"
              basic
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <UploadPhotoWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid width={2}>
                        <Button colour="gray" content="Main" />
                        <Button color="black" icon="trash" />
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
};
