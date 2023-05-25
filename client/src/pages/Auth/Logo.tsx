import { Heading } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { LOGO_FONT } from '~/consts/components';

const Logo = () => {
  return (
    <Heading fontSize="50px" textAlign="center" fontWeight="400" color="primary" mb="10px" fontFamily={LOGO_FONT}>
      <ReactRouterLink to="/">Webster</ReactRouterLink>
    </Heading>
  );
};

export default Logo;
