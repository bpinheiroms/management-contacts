import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../../../shared/validators';
import Input from '../../Input';
import { useAuth } from '../../../contexts/Auth/hooks/useAuth';
import { useTranslation } from 'next-i18next';
import ErrorMessage from '../../ErrorMessage';
import SpinnerAnimated from '../../SpinnerAnimated';

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
      <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-gray-100 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">{t('company-title')}</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <Input
                      placeholder="E-mail"
                      {...register('email')}
                      error={errors?.email}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder={t('password')}
                      {...register('password')}
                      error={errors?.password}
                    />
                  </div>
                  {authenticateMutation.isLoading ? (
                    <SpinnerAnimated />
                  ) : (
                    <>
                      <div className="relative">
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white rounded-md px-2 py-1 mt-8  hover:bg-indigo-400 text-base">
                          {t('login-in')}
                        </button>
                      </div>
                      <ErrorMessage
                        error={
                          authenticateMutation.error?.response?.data?.message
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
