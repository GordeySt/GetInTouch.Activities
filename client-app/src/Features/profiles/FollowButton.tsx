import React, { SyntheticEvent } from "react";
import { IProfile } from "../../App/models/profile";
import { observer } from "mobx-react-lite";
import { Reveal, Button } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";

interface IProps {
  profile: IProfile;
}

export const FollowButton: React.FC<IProps> = observer(({ profile }) => {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loadingFollow } = profileStore;

  if (
    userStore.user &&
    profile &&
    userStore.user.userName! === profile.userName!
  )
    return null;

  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    profile.isFollowing
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  };

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="black"
          content={profile?.isFollowing ? "Following" : "Not Following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden>
        <Button
          fluid
          basic
          colour={profile?.isFollowing ? "gray" : "black"}
          content={profile?.isFollowing ? "Unfollow" : "Follow"}
          loading={loadingFollow}
          onClick={(e) => handleFollow(e, profile?.userName)}
        />
      </Reveal.Content>
    </Reveal>
  );
});
