import { useToast } from '@chakra-ui/react';

type HookType<T> = {
  f: (data: T) => any;
};

const useRequestHandler = <T>({ f }: HookType<T>) => {
  const toast = useToast();

  const handler = async (data: T) => {
    try {
      await f(data).unwrap();
    } catch (error: any) {
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return { handler };
};

export default useRequestHandler;
