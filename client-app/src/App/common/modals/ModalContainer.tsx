import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import ModalStore from "../../stores/ModalStore";

export const ModalContainer = observer(() => {
  const {
    modal: { open, body },
    closeModal,
  } = ModalStore;
  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
});
