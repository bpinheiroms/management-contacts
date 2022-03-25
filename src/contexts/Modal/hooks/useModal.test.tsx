import { renderHook, act } from '@testing-library/react-hooks';
import { ModalContextProvider } from '..';
import { useModal } from './useModal';
describe('Modal Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should open modal when call toggleModal function and was closed', async () => {
    const wrapper = ({ children }: any) => (
      <ModalContextProvider>{children}</ModalContextProvider>
    );

    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    expect(result.current.isOpenModal).toBeFalsy();

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpenModal).toBeTruthy();
  });

  it('should close modal when call toggleModal function and was opened', async () => {
    const wrapper = ({ children }: any) => (
      <ModalContextProvider>{children}</ModalContextProvider>
    );

    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpenModal).toBeTruthy();

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpenModal).toBeFalsy();
  });

  it('should clear dataModal when modal is closed ', async () => {
    const wrapper = ({ children }: any) => (
      <ModalContextProvider>{children}</ModalContextProvider>
    );

    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    const dataMock = {
      name: 'Bruno',
      email: 'teste@teste.com',
      id: '12312',
    };

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpenModal).toBeTruthy();

    act(() => {
      result.current.changeDataModal(dataMock);
    });

    expect(result.current.dataModal).toEqual(dataMock);

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpenModal).toBeFalsy();
    expect(result.current.dataModal).toEqual(undefined);

  });
});
