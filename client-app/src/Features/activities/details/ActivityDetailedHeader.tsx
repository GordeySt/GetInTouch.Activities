import { observer } from "mobx-react-lite";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Image, Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";
import UserStore from "../../../App/stores/UserStore";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface IProps {
  activity: IActivity;
}

export const ActivityDetailedHeader: React.FC<IProps> = observer(
  ({ activity }) => {
    const { loading, target, submitting, deleteActivity } = ActivityStore;
    const [isMouseOver, setIsMouseOver] = useState(false);
    const host = activity.attendees.filter((x) => x.isHost)[0];
    const { attendActivity, cancelAttendance } = ActivityStore;

    const determoneFunctionToCall = () => {
      activity.isGoing ? cancelAttendance() : attendActivity();
    };

    return (
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/categories/${activity.category}.jpg`}
            fluid
            style={activityImageStyle}
          />
          <Segment basic style={activityImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={activity.title}
                    style={{ color: "white" }}
                  />
                  <p>
                    Hosted by{" "}
                    <Link to={`/profile/${host.userName}`}>
                      <strong>{host.displayedName}</strong>
                    </Link>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached="bottom">
          {!activity.isHost && (
            <Button
              loading={loading}
              onMouseOver={() => setIsMouseOver(true)}
              onMouseOut={() => setIsMouseOver(false)}
              onClick={determoneFunctionToCall}
              icon
              circular
              color="black"
            >
              <Icon name={activity.isGoing ? "times" : "check"} />
            </Button>
          )}
          <span
            style={{
              display: `${isMouseOver ? "inline-block" : "none"}`,
              marginLeft: "10px",
            }}
          >
            {!activity.isGoing ? (
              <strong>Join Activity</strong>
            ) : (
              <strong>Cancel Attendee</strong>
            )}
          </span>
          {activity.isHost && (
            <Fragment>
              <Button
                as={Link}
                to={`/manage/${activity.id}`}
                circular
                icon
                floated="right"
              >
                <Icon name="settings" />
              </Button>
              <Button
                name={activity.id}
                loading={target === activity.id && submitting}
                onClick={(e) => deleteActivity(e, activity.id!)}
                floated="right"
                icon
                circular
              >
                <Icon name="trash" />
              </Button>
            </Fragment>
          )}
        </Segment>
      </Segment.Group>
    );
  }
);
