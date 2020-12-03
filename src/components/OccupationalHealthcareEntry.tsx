import React from "react";
import { OccupationalHealthCareEntry } from "../types";
import { Container, Header, Icon } from "semantic-ui-react";

const OccupationalHealthcare: React.FC<({ entry: OccupationalHealthCareEntry })> = ({ entry }) => {
  const inline = { "display": "inline-block" };

  return (
    <Container>
      <Header as="h4" style={inline}>{entry.date}</Header>
      <Icon name="stethoscope" size="big" style={inline} />
      <Header as="h4" style={inline}>{entry.employerName}</Header>
      <p style={{ "fontStyle": "italic" }}>{entry.description}</p>
    </Container>
  );
};

export default OccupationalHealthcare;