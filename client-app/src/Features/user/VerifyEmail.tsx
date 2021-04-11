import { useEffect, useState } from "react";
import { useStore } from "../../App/stores/Store";
import { User } from "../../App/api/agent";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import useQuery from "../../App/common/utils/hooks";
import { useHistory } from "react-router";
import { ActivityList } from "../activities/dashboard/ActivityList";

export const VerifyEmail = () => {
  const { userStore } = useStore();
  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);
  const history = useHistory();
  const token = useQuery().get("token") as string;
  const email = useQuery().get("email") as string;

  useEffect(() => {
    User.verifyEmail(token as string, email as string)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch((error) => {
        console.log(error);
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  const handleConfirmEmailResend = () => {
    User.resendEmailVerification(email as string)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.log(error));
  };

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div className="center">
            <p>Verifaction failed - you can try resending the verification</p>
            <Button
              secondary
              size="big"
              content="Resend email"
              onClick={handleConfirmEmailResend}
            />
          </div>
        );
      case Status.Success:
        return (
          <div className="center">
            <p>Email has been varified - you can now login</p>
            {!userStore.user ? (
              <Button
                secondary
                onClick={() => history.push("/")}
                size="large"
                content="Go back"
              />
            ) : (
              <p style={{ textAlign: "center" }}>You are already logged in</p>
            )}
          </div>
        );
    }
  };
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="envelope" />
        Email verification
      </Header>

      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
};
