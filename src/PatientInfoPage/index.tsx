import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Patient, Gender } from '../types';
import { Header, Icon, List } from 'semantic-ui-react';
import patientService from '../services/patients';
import Entries from '../components/Entries';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<({ id: string })>();
  const [{ patients }, dispatch] = useStateValue();
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
      case 'other':
        return <Icon name='genderless' size='small' />;
    }
  };

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
        <Entries entries={patient.entries} />
      </div>
    );
  };
  return (
    null
  );
};

export default PatientInfoPage;