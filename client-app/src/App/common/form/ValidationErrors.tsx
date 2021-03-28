import React from "react";
import { Message } from "semantic-ui-react";

interface IProps {
  errors: any;
}

export const ValidationErrors: React.FC<IProps> = ({ errors }) => {
  return (
    <Message error>
      {errors.data && Object.keys(errors.data.errors).length > 0 && (
        <Message.List>
          {Object.values(errors.data.errors)
            .flat()
            .map((err: any, i) => (
              <Message.Item key={i}>{err}</Message.Item>
            ))}
        </Message.List>
      )}
    </Message>
  );
};
