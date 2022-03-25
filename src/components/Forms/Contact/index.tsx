import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactsFormSchema } from '../../../shared/validators';
import Input from '../../Input';
import { useTranslation } from 'next-i18next';
import ErrorMessage from '../../ErrorMessage';
import { useModal } from '../../../contexts/Modal/hooks/useModal';
import { useCreateContact } from '../../../services/useCreateContact';
import { useEditContact } from '../../../services/useEditContact';
import FooterButtons from '../FooterButtons';
import { useEffect } from 'react';
import { notifyMessage } from '../../../shared/lib/notification';

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(contactsFormSchema),
    reValidateMode: 'onChange',
    shouldUnregister: false,
  });

  const { t } = useTranslation('common');

  const { dataModal, toggleModal } = useModal();

  const createMutation = useCreateContact();
  const editMutation = useEditContact();

  const isEditForm = !!dataModal?.id;
  const formMutation = isEditForm ? editMutation : createMutation;

  const titleMessageNotification = isEditForm
    ? t('edited-success-message')
    : t('created-success-message');

  const titleForm = isEditForm
    ? t('contact-form-edit')
    : t('contact-form-create');

  const onSubmit = (data: any) => {
    const payload: any = isEditForm ? { ...data, id: dataModal?.id } : data;
    formMutation.mutate(payload);
  };

  useEffect(() => {
    if (isEditForm) {
      reset(dataModal);
    }
  }, [isEditForm]);

  useEffect(() => {
    if (formMutation.isSuccess) {
      notifyMessage(false, titleMessageNotification);
      toggleModal();
    }
  }, [formMutation.status, titleMessageNotification]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="contact-form">
      <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
        {titleForm}
      </h1>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
        {t('name')}
      </label>
      <Input placeholder="Name" {...register('name')} error={errors?.name} />
      <label className="mt-2 text-gray-800 text-sm font-bold leading-tight tracking-normal">
        {t('e-mail')}
      </label>
      <Input
        placeholder="E-mail"
        {...register('email')}
        error={errors?.email}
      />
      <ErrorMessage error={formMutation.error?.response?.data?.message} />
      <FooterButtons
        isDisabled={formMutation.isLoading || formMutation.isSuccess}
      />
    </form>
  );
};

export default ContactForm;
