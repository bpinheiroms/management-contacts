import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../../../shared/validators';
import Input from '../../Input';
import { useAuth } from '../../../contexts/Auth/hooks/useAuth';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form-sign-in">
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <Input
            className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
            type="email"
            placeholder="E-mail"
            {...register('email')}
            error={errors?.email}
          />
          <div className="flex flex-col space-y-1">
            <Input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors?.password}
            />
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <button
              type="submit"
              disabled={authenticateMutation.isLoading}
              className="w-full bg-blue-500 rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-blue-700">
              Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
