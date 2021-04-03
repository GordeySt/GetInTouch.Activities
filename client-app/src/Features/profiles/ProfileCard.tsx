import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IAttendee } from "../../App/models/activity";
import { IProfile } from "../../App/models/profile";

interface IProps {
  profile: IAttendee | IProfile;
}

export const ProfileCard: React.FC<IProps> = ({ profile }) => {
  const truncate = (str: string | undefined) => {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + "..." : str;
    }
  };
  
  return (
    <Card as={Link} to={`/profiles/${profile?.userName}`}>
      <Image src={profile?.mainImage || "/assets/user.jpg"} />
      <Card.Content>
        <Card.Header>{profile?.displayedName}</Card.Header>
        <Card.Description>{truncate(profile?.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile?.followersCount} followers
      </Card.Content>
    </Card>
  );
};
