import FloatingButton from '../../components/FloatingButton';
import ContactForm from '../../components/Forms/Contact';
import ListContacts from '../../components/ListContacts';
import Modal from '../../components/Modal';
import { useModal } from '../../contexts/Modal/hooks/useModal';
const HomeTemplate = () => {
  const { isOpenModal } = useModal();

  return (
    <>
      {isOpenModal && (
        <Modal>
          <ContactForm />
        </Modal>
      )}
      <ListContacts />
      <FloatingButton />
    </>
  );
};

export default HomeTemplate;
