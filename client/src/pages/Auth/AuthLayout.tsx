import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" flexDirection="column" bgColor="gray.50">
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
