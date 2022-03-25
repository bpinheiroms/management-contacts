import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useModal } from '../../contexts/Modal/hooks/useModal';
import { useDeleteContact } from '../../services/useDeleteContact';
import { notifyMessage } from '../../shared/lib/notification';
import { IContact } from '../../shared/types';
import { motion } from 'framer-motion';

interface IProps {
  data: IContact;
  index: number;
}

const ContactItem: React.FC<IProps> = ({ data, index }) => {
  const { t } = useTranslation('common');

  const { changeDataModal, toggleModal } = useModal();

  const deleteMutation = useDeleteContact();

  const onClick = () => {
    changeDataModal(data);
    toggleModal();
  };

  const onRemove = () => {
    deleteMutation.mutate(data);
  };

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      notifyMessage(false, t('deleted-success-message'));
      return;
    }

    if (deleteMutation.isError) {
      notifyMessage(true, deleteMutation.error?.response?.data?.message);
      return;
    }
  }, [deleteMutation.status]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      initial={{
        opacity: 0,
        translateX: index % 2 === 0 ? -50 : 50,
        translateY: -50,
      }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
      <div className="flex items-center justify-center rounded-full border-gray-100 bg-gray-800 shadow-sm w-20 h-20 text-gray-300">
        <p>{data?.name.slice(0, 2)}</p>
      </div>
      <h1 className="text-gray-50 font-semibold">{data.name}</h1>

      <div className="flex space-x-2">
        <button
          onClick={onClick}
          className="px-4 py-1  border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">
          {t('edit')}
        </button>
        <button
          onClick={onRemove}
          className="px-6 py-1 border-2 border-red-600 bg-red-500 rounded-full text-gray-50 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ContactItem;
