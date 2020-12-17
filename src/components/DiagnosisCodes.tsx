import React from "react";
import { Entry } from "../types";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state"

const DiagnosisCodes: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (entry.diagnosisCodes && Object.keys(diagnoses).length > 0) {
    return (
      <List bulleted style={{ "marginLeft": "40px" }}>
        {entry.diagnosisCodes.map(diagnosisCode =>
          <List.Item key={diagnosisCode}>{diagnosisCode} {diagnoses[diagnosisCode].name}</List.Item>
        )}
      </List>
    );
  }

  return null;
};

export default DiagnosisCodes;