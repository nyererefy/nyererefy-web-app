import React from "react";
import { Card, Image } from "semantic-ui-react";

export function CandidateItem({ candidate }) {
  return (
    <Card>
      <Image
        src={
          candidate.avatar ||
          "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
        }
      />
      <Card.Content>
        <Card.Header>{candidate.user.name || "No name set"}</Card.Header>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
