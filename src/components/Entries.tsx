import React from "react";
import { Entry } from "../types";
import { Header, Container } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import DiagnosisCodes from "./DiagnosisCodes";

const EntryComponent: React.FC<({ entries: Entry[] })> = ({ entries }) => {
  const containerStyle = {
    "borderStyle": "solid",
    "borderWidth": "1px",
    "padding": "10px",
    "marginTop": "10px"
  };

  return (
    <>
      <Header as='h3'>entries</Header>
      {entries.map(entry =>
        <Container style={containerStyle} key={entry.id}>
          <EntryDetails entry={entry} />
          <DiagnosisCodes entry={entry} />
        </Container>
      )}
    </>
  );
};

export default EntryComponent