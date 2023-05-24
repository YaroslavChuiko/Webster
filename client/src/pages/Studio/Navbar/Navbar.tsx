import { Box, Button, Flex, Icon, Spacer } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Flex bgGradient="linear(to-r, pink.500, purple.500)" py="2" align="center" id="navbar">
      <Box>
        <Button
          leftIcon={<Icon as={HiChevronLeft} boxSize={6} />}
          mr="4"
          ml="1"
          as={Link}
          to="/home"
          color="white"
          bgColor="transparent"
          _hover={{
            bg: 'pink.400',
          }}
        >
          Home
        </Button>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="gray" mr="4" as={Link} to="/auth/sign-in">
          Login
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;
