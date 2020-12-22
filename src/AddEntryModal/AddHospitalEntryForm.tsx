import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik"
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { HospitalFormValues, Discharge } from "../types";
import { Button, Grid } from "semantic-ui-react";

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
/*
description
date
specialist
diagnosisCodes
type: "HealthCheck"
healthCheckRating: HealthCheckRating
*/
  return (
    <Formik
      initialValues={{
        description: "Hospital entry",
        date: "2020-12-17",
        specialist: "Dr. Dr",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | Discharge } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = "Date must be YYYY-MM-DD";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
          errors.discharge = { ...errors.discharge as Discharge, date: requiredError };
        } else if (!isDate(values.discharge.date)) {
          errors.discharge = { ...errors.discharge as Discharge, date: "Discharge date must be YYYY-MM-DD" };
        }
        if (!values.discharge.criteria) {
          errors.discharge = { ...errors.discharge as Discharge, criteria: requiredError };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;