import { useToast } from '@chakra-ui/react';

const useCustomToast = ()=> {
  const toast = useToast();

  const successToast = ({ title, description, duration }) => {
    toast({
      title: title,
      description: description,
      position: 'top-right',
      status: 'success',
      duration: duration || 5000,
      isClosable: true,
    });
  };

  const errorToast = ({ title, description, duration }) => {
    toast({
      title: title,
      description: description,
      position: 'top-right',
      status: 'error',
      duration: duration || 5000,
      isClosable: true,
    });
  };

  const warningToast = ({ title, description, duration }) => {
    toast({
      title: title,
      description: description,
      position: 'top-right',
      status: 'warning',
      duration: duration || 5000,
      isClosable: true,
    });
  };

  const infoToast = ({ title, description, duration }) => {
    toast({
      title: title,
      description: description,
      position: 'top-right',
      status: 'info',
      duration: duration || 5000,
      isClosable: true,
    });
  };

  return { successToast, errorToast, warningToast, infoToast };
};

export default useCustomToast;
