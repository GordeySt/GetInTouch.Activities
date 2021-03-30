import { Fragment, useEffect } from "react";
import { Button, Comment, Icon, Loader, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../App/stores/Store";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface IProps {
  activityId: string;
}

export const ActivityDetailedChat: React.FC<IProps> = observer(
  ({ activityId }) => {
    const { commentStore } = useStore();
    const {
      createHubConnection,
      clearComments,
      comments,
      addComment,
    } = commentStore;

    useEffect(() => {
      if (activityId) {
        createHubConnection(activityId);
      }

      return () => {
        clearComments();
      };
    }, [createHubConnection, clearComments, activityId]);

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
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.jpg"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.userName}`}>
                    {comment.displayedName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
            <Formik
              onSubmit={(values, { resetForm }) =>
                addComment(values).then(() => resetForm())
              }
              initialValues={{ body: "" }}
              validationSchema={Yup.object({
                body: Yup.string().required(),
              })}
            >
              {({ isSubmitting, isValid, handleSubmit }) => (
                <Form className="ui form">
                  <Field name="body">
                    {(props: FieldProps) => (
                      <div style={{ position: "relative" }}>
                        <Loader active={isSubmitting} />
                        <textarea
                          style={{ marginTop: "15px" }}
                          placeholder="Add comment"
                          rows={2}
                          {...props.field}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                              return;
                            }

                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              isValid && handleSubmit();
                            }
                          }}
                        />
                      </div>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </Comment.Group>
        </Segment>
      </Fragment>
    );
  }
);
