import { Card, Header, Tab, Image } from "semantic-ui-react";
import ProfileStore  from "../../App/stores/ProfileStore"

export const ProfilePhotos = () => {
  const { profile } = ProfileStore;
  return (
    <Tab.Pane>
      <Header icon="image" content="photos">
        <Card.Group itemsPerRow={5}>
            {profile && profile.photos.map((photo) => (
              <Card key={photo.id}>
                <Image src={photo.url} />
              </Card>
            ))}
        </Card.Group>
      </Header>
    </Tab.Pane>
  );
};
