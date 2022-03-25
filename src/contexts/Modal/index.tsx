import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { IContact } from '../../shared/types';

export interface ModalContextData {
  isOpenModal: boolean;
  toggleModal: () => void;
  changeDataModal: (contact?: IContact) => void;
  dataModal?: IContact;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
);

export const ModalContextProvider: React.FC = ({ children }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<IContact | undefined>(undefined);

  const toggleModal = useCallback(() => {
    setIsOpenModal((modal: boolean) => !modal);
  }, []);

  const changeDataModal = useCallback((contact?: IContact) => {
    setDataModal(contact);
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      changeDataModal();
    }
  }, [isOpenModal]);

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        isOpenModal,
        changeDataModal,
        dataModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
