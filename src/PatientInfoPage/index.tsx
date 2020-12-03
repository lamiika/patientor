import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Patient, Gender, Entry, Diagnosis } from '../types';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import patientService from '../services/patients';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<({ id: string })>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const cachePatient: Patient = patients[id];
    const getPatient = async () => {
      const result = await patientService.getOne(id);
      
      dispatch(updatePatient(result));
      setPatient(result);
    }
    if (!cachePatient || Object.keys(cachePatient).length < 7) {
      getPatient();
    } else {
      setPatient(cachePatient);
    }
  }, [dispatch, id, patients]);

  const getIconByGender = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <Icon name='mars' size='small' />;
      case 'female':
        return <Icon name='venus' size='small' />;
      default:
        return <Icon name='genderless' size='small' />;
    }
  };

  const listDiagnosisCodes = (entry: Entry) => {
    if (entry.diagnosisCodes && Object.keys(diagnoses).length > 0) {
      return (
        <List bulleted style={{ 'marginLeft': '40px' }}>
          {entry.diagnosisCodes.map(diagnosisCode =>
            <List.Item key={diagnosisCode}>{diagnosisCode} {diagnoses[diagnosisCode].name}</List.Item>
          )}
        </List>
      );
    }

    return null;
  }

  if (patient) {
    return (
      <div>
        <Header as='h2'>
          {patient.name}
          {getIconByGender(patient.gender)}
        </Header>
        <List style={{ 'fontWeight': 'bold' }}>
          <List.Item>ssn: {patient.ssn ? patient.ssn : 'unknown'}</List.Item>
          <List.Item>occupation: {patient.occupation}</List.Item>
          <List.Item>dateOfBirth: {patient.dateOfBirth ? patient.dateOfBirth : 'unknown'}</List.Item>
        </List>
        <Header as='h3'>entries</Header>
        {patient.entries.map(entry =>
          <Container key={entry.id}>
            <p>{entry.date + ' '} {entry.description}</p>
            {listDiagnosisCodes(entry)}
          </Container>
        )}
      </div>
    );
  };
  return (
    null
  );
};

export default PatientInfoPage;