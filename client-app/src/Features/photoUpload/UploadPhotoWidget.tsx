import { Fragment } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { UploadPhotoDropzone } from "./UploadPhotoDropzone";

export const UploadPhotoWidget = observer(() => {
  return (
    <Fragment>
      <Segment>
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview & Upload" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
});
