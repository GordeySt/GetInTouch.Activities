import { Grid } from "semantic-ui-react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileContent } from "./ProfileContent";
import { useStore } from "../../App/stores/Store";
import { Fragment, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../App/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { GoToPreviousPageButton } from "../buttons/GoToPreviousPageButton";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

export const ProfilePage: React.FC<IProps> = observer(({ match }) => {
  const { profileStore } = useStore();
  const { loadingProfile, profile, loadProfile, setActiveTab } = profileStore;

  useEffect(() => {
    loadProfile(match.params.username);

    return () => setActiveTab(0);
  }, [loadProfile, match, setActiveTab]);

  if (loadingProfile) return <LoadingComponent />;

  return (
    <Fragment>
      <GoToPreviousPageButton />
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader profile={profile} />
          <ProfileContent />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
});
