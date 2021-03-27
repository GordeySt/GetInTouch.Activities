import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/Store";

export const ModalContainer = observer(() => {
  const { modalStore } = useStore();
  const {
    modal: { open, body },
    closeModal,
  } = modalStore;
  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
});
