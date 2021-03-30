import { Fragment, useEffect } from "react";
import { Button, Comment, Form, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore }  from "../../../App/stores/Store"

interface IProps {
  activityId: string;
}

export const ActivityDetailedChat: React.FC<IProps> = observer(({ activityId }) => {
  const { commentStore } = useStore();
  const {
    createHubConnection,
    clearComments,
    comments,
    addComment
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
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
      </Segment>
    </Fragment>
  );
});
