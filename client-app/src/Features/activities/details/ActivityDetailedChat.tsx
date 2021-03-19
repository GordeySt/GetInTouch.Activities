import { Fragment, useEffect } from "react";
import { Button, Comment, Form, Icon, Segment } from "semantic-ui-react";
import ActivityStore from "../../../App/stores/ActivityStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { TextAreaInput } from "../../../App/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";

export const ActivityDetailedChat = observer(() => {
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = ActivityStore;

  useEffect(() => {
    createHubConnection();

    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection]);

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
      <Segment attached clearing>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar circular src={comment.image || "/assets/user.jpg"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.userName}`}>
                    {comment.displayedName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()?.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add your comment"
                />
                <Button
                  content="Add Comment"
                  labelPosition="left"
                  icon="telegram plane"
                  color="black"
                  loading={submitting}
                  floated="right"
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
});
