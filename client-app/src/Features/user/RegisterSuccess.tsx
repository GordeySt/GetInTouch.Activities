import React from "react";
import useQuery from "../../App/common/utils/hooks";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { User } from "../../App/api/agent";
import { toast } from "react-toastify";

export const RegisterSuccess: React.FC = () => {
  const email = useQuery().get("email") as string;

  const handleConfirmEmailResend = () => {
    User.resendEmailVerification(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="check" />
        Successfully registered!
      </Header>
      <p>Please check your email for the verification</p>
      {email && (
        <React.Fragment>
          <p>Didn't recieve the email? Please click below button to resend</p>
          <Button
            onClick={handleConfirmEmailResend}
            secondary
            content="Resend email"
            size="big"
          />
        </React.Fragment>
      )}
    </Segment>
  );
};
