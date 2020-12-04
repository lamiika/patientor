import React from "react";
import { HealthCheckEntry } from "../types";
import { Container, Header, Icon } from "semantic-ui-react";
import HealthRatingIcon from "./HealthRatingIcon";

const HealthCheck: React.FC<({ entry: HealthCheckEntry })> = ({ entry }) => {
  const inline = { "display": "inline-block" };

  return (
    <Container>
      <Header as="h4" style={inline}>
        {entry.date}
      </Header>
      <Icon name="doctor" size="big" style={inline} />
      <p style={{ "fontStyle": "italic" }}>{entry.description}</p>
      <HealthRatingIcon rating={entry.healthCheckRating} />
    </Container>
  );
};

export default HealthCheck;