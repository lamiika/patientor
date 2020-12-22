import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik"
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { OccupationalFormValues, SickLeave } from "../types";
import { Button, Grid } from "semantic-ui-react";

interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | SickLeave } = {};
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
          if (!isDate(values.sickLeave.startDate)) {
            errors.sickLeave = { ...errors.sickLeave as SickLeave, startDate: "Sick leave start date must be YYYY-MM-DD" };
          }
          if (!values.sickLeave.startDate) {
            errors.sickLeave = { ...errors.sickLeave as SickLeave, startDate: requiredError};
          }
          if (!isDate(values.sickLeave.endDate)) {
            errors.sickLeave = { ...errors.sickLeave as SickLeave, endDate: "Sick leave end date must be YYYY-MM-DD" };
          }
          if (!values.sickLeave.endDate) {
            errors.sickLeave = { ...errors.sickLeave as SickLeave, endDate: requiredError};
          }
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="Sick leave end date"
              name="sickLeave.endDate"
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

export default AddOccupationalEntryForm;