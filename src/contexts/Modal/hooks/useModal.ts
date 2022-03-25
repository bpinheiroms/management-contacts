import { useContextSelector } from 'use-context-selector';
import { ModalContext, ModalContextData } from '..';

export function useModal(): ModalContextData {
  const isOpenModal = useContextSelector(
    ModalContext,
    (ctx) => ctx.isOpenModal,
  );

  const toggleModal = useContextSelector(
    ModalContext,
    (ctx) => ctx.toggleModal,
  );

  const changeDataModal = useContextSelector(
    ModalContext,
    (ctx) => ctx.changeDataModal,
  );

  const dataModal = useContextSelector(ModalContext, (ctx) => ctx.dataModal);

  return {
    isOpenModal,
    toggleModal,
    changeDataModal,
    dataModal,
  };
}
