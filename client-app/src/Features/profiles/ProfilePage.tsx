import { Grid } from "semantic-ui-react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileContent } from "./ProfileContent";
import ProfileStore from "../../App/stores/ProfileStore";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../App/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

export const ProfilePage: React.FC<IProps> = observer(({ match }) => {
  const { loadingProfile, profile, loadProfile } = ProfileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
});