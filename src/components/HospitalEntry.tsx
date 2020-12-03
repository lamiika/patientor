import React from "react";
import { HospitalEntry } from "../types";
import { Container, Header, Icon } from "semantic-ui-react";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const inline = { "display": "inline-block" };

  return (
    <Container>
      <Header as="h4" style={inline}>
        {entry.date}
      </Header>
      <Icon name="doctor" size="big" style={inline} />
      <p style={{ "fontStyle": "italic" }}>{entry.description}</p>
    </Container>
  );
};

export default HospitalEntryComponent;