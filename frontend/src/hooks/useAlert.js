import { toast } from 'react-toastify';

const config = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const useAlert = () => {
  const alertSuccess = (message) => {
    toast.success(message, config);
  };

  const alertError = (message) => {
    toast.error(message, config);
  };

  const alertWarning = (message) => {
    toast.warn(message, config);
  };

  return { alertSuccess, alertError, alertWarning };
};

export default useAlert;
