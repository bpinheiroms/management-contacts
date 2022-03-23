import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../../../shared/validators';
import Input from '../../Input';
import { useAuth } from '../../../contexts/Auth/hooks/useAuth';
import { useTranslation } from 'next-i18next';
import ErrorMessage from '../../ErrorMessage';

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(loginFormSchema),
    reValidateMode: 'onChange',
    shouldUnregister: false,
  });

  const { authenticateUser, authenticateMutation } = useAuth();

  const onSubmit = (data: any) => {
    authenticateUser(data);
  };

  const { t } = useTranslation('common');

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form-sign-in">
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">
            {t('login-in')}
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <Input
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              type="email"
              placeholder="E-mail"
              {...register('email')}
              error={errors?.email}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <Input
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              type="password"
              placeholder={t('password')}
              {...register('password')}
              error={errors?.password}
            />
          </div>

          <ErrorMessage
            error={authenticateMutation.error?.response?.data?.message}
          />
          <button
            type="submit"
            disabled={authenticateMutation.isLoading}
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
            {t('login-in')}
          </button>
        </section>
      </main>
    </form>
  );
};

export default LoginForm;
