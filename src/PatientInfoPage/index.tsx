import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient, Gender } from '../types';
import { Header, Icon, List } from 'semantic-ui-react';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<({ id: string })>();
  const [{ patients }] = useStateValue();
  const patient: Patient = patients[id];

  const getIconByGender = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <Icon name='mars' size='small' />;
      case 'female':
        return <Icon name='venus' size='small' />;
      default:
        return <Icon name='genderless' size='small' />;
    }
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
      </div>
    );
  };
  return (
    null
  );
};

export default PatientInfoPage;