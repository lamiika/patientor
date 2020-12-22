import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Patient, Gender, EntryFormValues, Entry, EntryType } from '../types';
import { Button, Header, Icon, List } from 'semantic-ui-react';
import patientService from '../services/patients';
import Entries from '../components/Entries';
import AddEntryModal from '../AddEntryModal';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<({ id: string })>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<EntryType>("Hospital");
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (type: EntryType): void => {
    setModalOpen(true);
    setModalType(type);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const entry: Entry = await patientService.submitEntry(values, id);
      if (patient) {
        const updatedPatient: Patient = ({ ...patient, entries: [ ...patient.entries, entry ] })
        dispatch(updatePatient(updatedPatient));
        setPatient(updatedPatient)
      }
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          modalType={modalType}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal("Hospital")}>Add New Hospital Entry</Button>
        <Button onClick={() => openModal("OccupationalHealthcare")}>Add New Occupational Entry</Button>
        <Button onClick={() => openModal("HealthCheck")}>Add New Health Check Entry</Button>
      </div>
    );
  };
  return (
    null
  );
};

export default PatientInfoPage;