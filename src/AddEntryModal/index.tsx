import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalEntryForm from "./AddOccupationalEntryForm";
import { EntryFormValues, EntryType } from "../types";

interface Props {
  modalOpen: boolean;
  modalType: EntryType;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, modalType, onClose, onSubmit, error }: Props) => {
  const entryFormByType = (modalType: EntryType) => {
    if (modalType === "Hospital") {
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    }
    if (modalType === "OccupationalHealthcare") {
      return <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    }
  };
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {entryFormByType(modalType)}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;