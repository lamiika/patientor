import React from "react";
import { Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import { assertNever } from '../utils/assertNever';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
