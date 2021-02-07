import React, { Fragment } from "react";
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

export const ActivityDetailedChat = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="black"
        style={{ border: "none" }}
      >
        <Icon name="wechat" size="big" />
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="/assets/user.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea rows={2} placeholder="Message" />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="telegram plane"
              color="black"
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};
