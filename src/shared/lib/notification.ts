import { toast, ToastOptions } from 'react-toastify';

const configToast: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  pauseOnHover: true,
  theme: 'dark'
};

export function notifyMessage(isError: boolean, message: string) {
  if (isError) {
    toast.error(message, configToast);
  } else {
    toast.success(message, configToast);
  }
}
