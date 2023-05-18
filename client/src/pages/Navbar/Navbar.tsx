import { Box, Flex, Spacer, Button, Text, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { extendTheme } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
function Navbar() {
  const customTheme = extendTheme({
    components: {
      Button: {
        variants: {
          'navbar-transparent': {
            color: 'white',
            bg: 'transparent',
            _hover: {
              bg: useColorModeValue('teal.300', 'teal.400'),
            },
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        bgGradient="linear(to-r, teal.300, blue.300, blue.400, blue.500, blue.500, purple.600, purple.600, purple.600)"
        pt="2"
        pb="2"
        align="center"
        id="navbar"
      >
        <Box>
          <Button colorScheme="blue" mr="4" ml="1" as={Link as never} to="/home" variant="navbar-transparent">
            <ChevronLeftIcon w={8} h={8} />
            <Text ml="2">Home</Text>
          </Button>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="blue" mr="4" as={Link as never} to="/auth/sign-in">
            Login
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Navbar;
