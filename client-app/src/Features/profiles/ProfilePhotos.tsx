import { Card, Header, Tab, Image, Button, Grid } from "semantic-ui-react";
import ModalStore from "../../App/stores/ModalStore";
import ProfileStore from "../../App/stores/ProfileStore";
import { UploadPhotoWidget } from "../photoUpload/UploadPhotoWidget";

export const ProfilePhotos = () => {
  const { profile, isCurrentUser } = ProfileStore;
  const { openModal } = ModalStore;

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
              onClick={() => openModal(<UploadPhotoWidget />)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
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
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
