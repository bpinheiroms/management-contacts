import { fireEvent, waitFor } from '@testing-library/dom';
import { faker } from '@faker-js/faker';
import { renderWithClient } from '../../../__mocks__/render';
import { ModalContextProvider } from '../../../contexts/Modal';
import ContactForm from '.';
import { useCreateContact } from '../../../services/useCreateContact';
import { useEditContact } from '../../../services/useEditContact';
import { useModal } from '../../../contexts/Modal/hooks/useModal';
import { act } from 'react-dom/test-utils';
import { notifyMessage } from '../../../shared/lib/notification';

jest.mock('../../../services/useCreateContact', () => ({
  useCreateContact: jest.fn(() => {
    return {
      isSuccess: false,
      isLoading: false,
      error: null,
      status: 'idle',
      mutate: jest.fn(),
    };
  }),
}));

jest.mock('../../../services/useEditContact', () => ({
  useEditContact: jest.fn(() => {
    return {
      isSuccess: false,
      isLoading: false,
      error: null,
      status: 'idle',
      mutate: jest.fn(),
    };
  }),
}));

jest.mock('../../../contexts/Modal/hooks/useModal', () => ({
  useModal: jest.fn(() => {
    return {
      dataModal: undefined,
      toggleModal: jest.fn(),
      isOpenModal: true,
      changeDataModal: jest.fn(),
    };
  }),
}));

jest.mock('../../../shared/lib/notification');

const mockedCreateContactMutation = useCreateContact as jest.MockedFunction<
  typeof useCreateContact
>;

const mockedEditContactMutation = useEditContact as jest.MockedFunction<
  typeof useEditContact
>;

const mockedUseModalHook = useModal as jest.MockedFunction<typeof useModal>;

const mockedNotifyMessage = notifyMessage as jest.MockedFunction<
  typeof notifyMessage
>;

describe('Contact Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should show error when is invalid form and click in submit button', async () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    const nameInput = getByTestId('name-input');
    const emailInput = getByTestId('email-input');
    const submitButton = getByTestId('submit-button');

    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();

    fireEvent.submit(submitButton);

    await waitFor(() => {
      const inputErrors = getAllByTestId('input-error');

      expect(inputErrors.length).toEqual(2);

      expect(getByText('name is a required field')).not.toBeNull();
      expect(getByText('email is a required field')).not.toBeNull();
    });
  });

  it('should call create mutation function when is valid create form ', async () => {
    const mutateFake = jest.fn();
    mockedCreateContactMutation.mockReturnValue({
      isSuccess: false,
      isLoading: false,
      error: null,
      status: 'idle',
      mutate: mutateFake,
    } as any);

    const { getByTestId, queryAllByTestId } = renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    const nameFake = faker.name.firstName();
    const emailFake = faker.internet.email();

    const nameInput = getByTestId('name-input');
    const emailInput = getByTestId('email-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.input(nameInput, { target: { value: nameFake } });
    fireEvent.input(emailInput, { target: { value: emailFake } });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      const inputErrors = queryAllByTestId('input-error');

      expect(inputErrors.length).toEqual(0);

      expect(nameInput.value).toEqual(nameFake);
      expect(emailInput.value).toEqual(emailFake);

      expect(mutateFake).toHaveBeenCalledTimes(1);
      expect(mutateFake).toHaveBeenCalledWith({
        email: emailFake,
        name: nameFake,
      });
    });
  });

  it('should call edit mutation function when is valid edit form', async () => {
    const nameFake = faker.name.firstName();
    const emailFake = faker.internet.email();
    const mutateFake = jest.fn();

    mockedEditContactMutation.mockReturnValue({
      isSuccess: false,
      isLoading: false,
      error: null,
      status: 'idle',
      mutate: mutateFake,
    } as any);

    mockedUseModalHook.mockReturnValue({
      dataModal: {
        name: nameFake,
        id: 'hasdh123has',
        email: emailFake,
      },
      toggleModal: jest.fn(),
      isOpenModal: true,
      changeDataModal: jest.fn(),
    });

    const { getByTestId, queryAllByTestId } = renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    const nameInput = getByTestId('name-input');
    const emailInput = getByTestId('email-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toEqual(nameFake);
      expect(emailInput.value).toEqual(emailFake);

      const inputErrors = queryAllByTestId('input-error');

      expect(inputErrors.length).toEqual(0);

      expect(mutateFake).toHaveBeenCalledTimes(1);
      expect(mutateFake).toHaveBeenCalledWith({
        email: emailFake,
        id: 'hasdh123has',
        name: nameFake,
      });
    });
  });

  it('should show error when submit edit form with invalid form', async () => {
    const nameFake = faker.name.firstName();
    const emailFake = faker.internet.email();
    const mutateFake = jest.fn();

    mockedEditContactMutation.mockReturnValue({
      isSuccess: false,
      isLoading: false,
      error: null,
      status: 'idle',
      mutate: mutateFake,
    } as any);

    mockedUseModalHook.mockReturnValue({
      dataModal: {
        name: nameFake,
        id: 'hasdh123has',
        email: emailFake,
      },
      toggleModal: jest.fn(),
      isOpenModal: true,
      changeDataModal: jest.fn(),
    });

    const { getByTestId, queryAllByTestId, getByText } = renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    const nameInput = getByTestId('name-input');
    const emailInput = getByTestId('email-input');
    const submitButton = getByTestId('submit-button');

    expect(emailInput.value).toEqual(emailFake);

    act(() => {
      fireEvent.input(emailInput, { target: { value: '' } });
    });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toEqual(nameFake);
      expect(emailInput.value).toEqual('');

      const inputErrors = queryAllByTestId('input-error');

      expect(inputErrors.length).toEqual(1);

      expect(getByText('email is a required field')).not.toBeNull();
    });
  });

  it('should closeModal and show notify message pop-up edited successfully', async () => {
    mockedEditContactMutation.mockReturnValue({
      isSuccess: true,
      isLoading: false,
      error: null,
      status: 'success',
      mutate: jest.fn(),
    } as any);

    const toggleModalFake = jest.fn();

    mockedUseModalHook.mockReturnValue({
      dataModal: {
        name: '',
        id: 'hasdh123has',
        email: '',
      },
      toggleModal: toggleModalFake,
      isOpenModal: true,
      changeDataModal: jest.fn(),
    });

    const notifyMessageFake = jest.fn();
    mockedNotifyMessage.mockImplementation(notifyMessageFake);

    renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    await waitFor(() => {
      expect(toggleModalFake).toHaveBeenCalled();
      expect(notifyMessageFake).toHaveBeenCalled();
      expect(notifyMessageFake).toHaveBeenCalledWith(
        false,
        'edited-success-message',
      );
    });
  });

  it('should closeModal and show notify message pop-up created successfully', async () => {
    mockedCreateContactMutation.mockReturnValue({
      isSuccess: true,
      isLoading: false,
      error: null,
      status: 'success',
      mutate: jest.fn(),
    } as any);

    const toggleModalFake = jest.fn();

    mockedUseModalHook.mockReturnValue({
      dataModal: undefined,
      toggleModal: toggleModalFake,
      isOpenModal: true,
      changeDataModal: jest.fn(),
    });

    const notifyMessageFake = jest.fn();
    mockedNotifyMessage.mockImplementation(notifyMessageFake);

    renderWithClient(
      <ModalContextProvider>
        <ContactForm />
      </ModalContextProvider>,
    );

    await waitFor(() => {
      expect(toggleModalFake).toHaveBeenCalled();
      expect(notifyMessageFake).toHaveBeenCalled();
      expect(notifyMessageFake).toHaveBeenCalledWith(
        false,
        'created-success-message',
      );
    });
  });
});
