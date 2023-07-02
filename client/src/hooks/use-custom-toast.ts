import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

type TStatus = 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;

const useCustomToast = () => {
  const createToast = useToast();

  const toast = useCallback(
    (title: string, description: string, status: TStatus) => {
      createToast({
        title,
        description,
        duration: 9000,
        isClosable: true,
        status,
      });
    },
    [createToast],
  );

  return { toast };
};

export default useCustomToast;
