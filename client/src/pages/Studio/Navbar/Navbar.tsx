import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGO_FONT } from '~/consts/components';
import { useAppSelector } from '~/hooks/use-app-selector';
import { logout } from '~/store/slices/auth-slice';

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <Flex bgGradient="linear(to-r, pink.500, purple.500)" py="2" align="center" id="navbar">
      <Box>
        <Heading
          fontSize="28px"
          fontWeight="400"
          userSelect="none"
          color="white"
          ml="20px"
          mb="0"
          fontFamily={LOGO_FONT}
        >
          Webster
        </Heading>
      </Box>
      <Spacer />
      <Box>
        {isLoggedIn ? (
          <Button colorScheme="gray" mr="4" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        ) : (
          <Button colorScheme="gray" mr="4" as={Link} to="/auth/sign-in">
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default Navbar;
